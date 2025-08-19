"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Mic, MicOff, Send, Loader2, Volume2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: 'en' | 'hi';
}

interface AIAssistantProps {
  className?: string;
}

const translations = {
  en: {
    title: 'AI Health Assistant',
    placeholder: 'Type your health question...',
    disclaimer: 'This AI assistant provides general health information only. Always consult a qualified healthcare professional for medical advice.',
    errorMessage: 'Sorry, I encountered an error. Please try again.',
    microphoneError: 'Microphone access denied or unavailable.',
    networkError: 'Network error. Please check your connection and try again.',
    listening: 'Listening...',
    send: 'Send',
    close: 'Close',
  },
  hi: {
    title: 'AI स्वास्थ्य सहायक',
    placeholder: 'अपना स्वास्थ्य प्रश्न टाइप करें...',
    disclaimer: 'यह AI सहायक केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है। चिकित्सा सलाह के लिए हमेशा योग्य स्वास्थ्य पेशेवर से सलाह लें।',
    errorMessage: 'माफ करें, मुझे एक त्रुटि आई है। कृपया पुनः प्रयास करें।',
    microphoneError: 'माइक्रोफ़ोन पहुँच अस्वीकृत या अनुपलब्ध है।',
    networkError: 'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें और पुनः प्रयास करें।',
    listening: 'सुन रहा हूँ...',
    send: 'भेजें',
    close: 'बंद करें',
  }
};

export const AIAssistant: React.FC<AIAssistantProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];

  useEffect(() => {
    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setError(t.microphoneError);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, t.microphoneError]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && speechSupported) {
      setError(null);
      setIsListening(true);
      recognitionRef.current.start();
    }
  }, [speechSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  }, [language]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          language
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      if (reader) {
        // Handle streaming response
        let assistantContent = '';
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          language
        };

        setMessages(prev => [...prev, assistantMessage]);

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantContent += parsed.content;
                  setMessages(prev => prev.map(m => 
                    m.id === assistantMessage.id 
                      ? { ...m, content: assistantContent }
                      : m
                  ));
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      } else {
        // Fallback to regular response
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.content || data.message || t.errorMessage,
          timestamp: new Date(),
          language
        };

        setMessages(prev => [...prev, assistantMessage]);
        speakText(assistantMessage.content);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError(t.networkError);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t.errorMessage,
        timestamp: new Date(),
        language
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, language, t, speakText]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-black border border-gray-600 text-white hover:bg-gray-900 hover:border-[#00FF00] transition-all duration-200 md:h-14 md:w-14"
        size="icon"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-[#00FF00]" />
      </Button>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 md:inset-auto md:bottom-4 md:right-4 md:w-96 md:h-[600px] ${className}`}>
      <Card className="h-full bg-black border-gray-600 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#00FF00]" />
            <h2 className="text-sm md:text-base font-semibold text-white">{t.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-xs text-gray-400 hover:text-white hover:bg-gray-800 px-2 py-1"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8"
              aria-label={t.close}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-4 py-2 bg-gray-900 border-b border-gray-600">
          <p className="text-xs text-gray-300 leading-relaxed">
            {t.disclaimer}
          </p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-[#00FF00] text-black'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p
                      className={`text-xs ${
                        message.role === 'user' ? 'text-black/70' : 'text-gray-400'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                    {message.role === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => speakText(message.content)}
                        className="h-6 w-6 ml-2 text-gray-400 hover:text-white"
                        aria-label="Speak message"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin text-[#00FF00]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Error Display */}
        {error && (
          <div className="px-4 py-2 bg-red-900/20 border-t border-red-600/30">
            <p className="text-xs text-red-300">{error}</p>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-600">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? t.listening : t.placeholder}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#00FF00] text-xs md:text-sm pr-12"
                disabled={isLoading || isListening}
                maxLength={500}
              />
              {speechSupported && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-[#00FF00]"
                  aria-label={isListening ? "Stop listening" : "Start listening"}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4 text-[#00FF00] animate-pulse" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-[#00FF00] hover:bg-[#00DD00] text-black disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10"
              size="icon"
              aria-label={t.send}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};