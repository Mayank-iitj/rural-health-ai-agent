"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Mic, X, Bot, User, MicOff } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const welcomeMessage: Message = {
    id: 'welcome',
    content: `Hello! I'm your Rural Health AI Assistant. I'm here to help with:

• Medical information and health guidance
• Finding rural healthcare providers and facilities
• Understanding symptoms and when to seek care
• Telehealth and remote healthcare options
• Medication information and interactions
• Emergency care guidance
• Health insurance and coverage questions
• Preventive care recommendations

How can I assist you with your healthcare needs today?`,
    role: 'assistant',
    timestamp: new Date()
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          messages: messages.filter(m => m.id !== 'welcome').map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiMessageContent = '';
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  aiMessageContent += parsed.content;
                  setMessages(prev => prev.map(m => 
                    m.id === aiMessage.id 
                      ? { ...m, content: aiMessageContent }
                      : m
                  ));
                }
              } catch (e) {
                // Ignore JSON parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Sorry, I encountered an error while processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full bg-[#00FF00] text-black shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl hover:bg-[#00FF00]/90"
            >
              <MessageCircle size={24} />
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[500px] h-[700px] p-0 bg-black border-gray-800 flex flex-col">
            <DialogHeader className="p-4 border-b border-gray-800 bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#00FF00] flex items-center justify-center">
                    <Bot size={18} className="text-black" />
                  </div>
                  <DialogTitle className="text-white text-lg">
                    Rural Health AI Assistant
                  </DialogTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </Button>
              </div>
            </DialogHeader>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-[#00FF00] text-black' 
                      : 'bg-gray-800 text-white'
                  }`}>
                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-[#00FF00] text-black ml-auto'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-[#00FF00] rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-[#00FF00] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="h-2 w-2 bg-[#00FF00] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-red-600/20 border border-red-600 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-800 bg-gray-900">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about rural healthcare..."
                    className="pr-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    disabled={!recognitionRef.current}
                    className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                      isListening ? 'text-[#00FF00]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-[#00FF00] text-black hover:bg-[#00FF00]/90"
                >
                  <Send size={16} />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                AI responses are for informational purposes only. Consult healthcare professionals for medical advice.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};