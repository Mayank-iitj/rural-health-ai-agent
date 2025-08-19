import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_AI_API_KEY = 'AIzaSyDvtW8nPxUgcugyTzgK043UkOv2tSR8L30';
const GOOGLE_AI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent';

export async function POST(request: NextRequest) {
  try {
    const { message, conversation_history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Create system prompt for rural healthcare AI
    const systemPrompt = `You are a Rural Health AI Assistant designed for offline deployment in remote areas. Your role is to provide healthcare guidance to underserved communities.

CORE PRINCIPLES:
- Provide triage guidance: self-care, clinic visit, or urgent hospital referral
- Support Hindi, English, and simple language for low-literacy users
- Respect cultural practices while promoting evidence-based medicine
- ALWAYS emphasize that you're not a replacement for professional medical care
- Be sensitive to limited healthcare access in rural areas

CAPABILITIES:
- Symptom assessment with yes/no questions
- First aid guidance
- Medication safety (OTC dosages, antibiotic warnings)
- Maternal and child health guidance
- Emergency recognition and escalation
- Health education in culturally appropriate ways

LIMITATIONS:
- Cannot diagnose specific conditions
- Cannot prescribe medications
- Cannot replace emergency medical services
- Recommend professional care for serious symptoms

RESPONSE FORMAT:
- Use simple, clear language
- Provide both Hindi and English when helpful
- Ask clarifying questions for better assessment
- Always include appropriate medical disclaimers
- Suggest when to seek immediate professional help

Current user message: "${message}"`;

    // Prepare conversation context
    const conversationContext = conversation_history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const requestBody = {
      contents: [
        ...conversationContext,
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    const response = await fetch(`${GOOGLE_AI_URL}?key=${GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google AI API Error:', errorData);
      throw new Error(`Google AI API error: ${response.status}`);
    }

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('No response body');
          }

          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.trim() && line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  
                  if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                    const content = data.candidates[0].content.parts[0].text;
                    
                    // Convert to OpenAI-compatible format for frontend
                    const chunk = {
                      choices: [{
                        delta: {
                          content: content
                        }
                      }]
                    };
                    
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                  }
                } catch (e) {
                  console.error('Error parsing chunk:', e);
                }
              }
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}