import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  message: string;
  messages?: ChatMessage[];
}

const SYSTEM_PROMPT = `You are RuralHealth AI, an offline healthcare assistant specifically designed to serve rural and remote communities where access to immediate medical care may be limited.

Your role and capabilities:
• Provide preliminary symptom assessment and general health guidance
• Offer practical first aid advice for common situations
• Help users understand when self-care is appropriate vs. when professional medical attention is urgently needed
• Share health education and preventive care information
• Be culturally sensitive to rural lifestyles, occupations, and concerns
• Consider limited healthcare resources and transportation challenges in rural areas

Key principles:
• Always emphasize that you are NOT a replacement for professional medical diagnosis or treatment
• Clearly distinguish between emergency situations requiring immediate medical attention and non-urgent concerns
• Be respectful of traditional remedies while promoting evidence-based care
• Consider the practical realities of rural life (farming injuries, limited pharmacy access, etc.)
• Provide clear, actionable advice that can be implemented with commonly available resources

When to recommend immediate professional care:
• Chest pain, difficulty breathing, severe bleeding
• Signs of stroke, heart attack, or severe allergic reactions
• High fever with concerning symptoms
• Severe injuries or trauma
• Any symptoms that are worsening rapidly or causing severe distress

IMPORTANT DISCLAIMER: Always remind users that this guidance is for educational purposes only and does not constitute professional medical advice. Encourage establishing relationships with local healthcare providers when possible, and always seek professional medical care for serious concerns or emergencies.

Be warm, empathetic, and practical in your responses while maintaining appropriate medical boundaries.`;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ChatRequest = await request.json();
    
    if (!body.message || typeof body.message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a string' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          } 
        }
      );
    }

    // Prepare messages array
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(body.messages || []),
      { role: 'user', content: body.message }
    ];

    // Create streaming response
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: true,
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              const data = JSON.stringify({ content });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error: any) {
    console.error('API Error:', error);
    
    // Handle rate limiting
    if (error?.status === 429) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait a moment before sending another message.' 
        }),
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Handle authentication errors
    if (error?.status === 401) {
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Handle other OpenAI API errors
    if (error?.status) {
      return new Response(
        JSON.stringify({ 
          error: `OpenAI API error: ${error.message || 'Unknown error'}` 
        }),
        { 
          status: error.status, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Generic server error
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}