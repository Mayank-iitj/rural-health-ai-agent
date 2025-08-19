'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Mic, MicOff, X, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'hi-IN'; // Hindi by default

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversation_history: messages.slice(-10) // Last 10 messages for context
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.trim() && line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.choices?.[0]?.delta?.content) {
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'assistant') {
                      lastMessage.content += data.choices[0].delta.content;
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'माफ करें, मुझे आपकी मदद करने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें। (Sorry, I am having trouble helping you. Please try again later.)',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#00FF00] text-black p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center gap-2 max-w-[calc(100vw-32px)]"
        aria-label="Open AI Health Assistant"
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
        <span className="hidden sm:block font-semibold text-sm lg:text-base">AI स्वास्थ्य सहायक</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-4 sm:bottom-6 sm:right-6 sm:top-auto sm:left-auto z-50 w-auto sm:w-full sm:max-w-sm md:max-w-md h-[calc(100vh-32px)] sm:h-[500px] bg-black border border-gray-800 rounded-lg shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-800 bg-gray-900 rounded-t-lg">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#00FF00] rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle size={14} className="sm:w-4 sm:h-4 text-black" />
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-xs sm:text-sm truncate">AI स्वास्थ्य सहायक</h3>
            <p className="text-gray-400 text-xs hidden sm:block">Rural Health Assistant</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
        >
          <X size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-xs sm:text-sm">
            <p className="mb-2">नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं।</p>
            <p className="text-xs">Hello! I'm your AI health assistant.</p>
            <p className="text-xs mt-2">आप हिंदी या अंग्रेजी में सवाल पूछ सकते हैं।</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                message.role === 'user'
                  ? 'bg-[#00FF00] text-black'
                  : 'bg-gray-800 text-white border border-gray-700'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
              <p className={`text-xs mt-1 opacity-70 ${
                message.role === 'user' ? 'text-black' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-white p-2 sm:p-3 rounded-lg border border-gray-700">
              <Loader2 size={14} className="sm:w-4 sm:h-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-gray-800 bg-gray-900 rounded-b-lg">
        <div className="flex gap-2">
          <div className="flex-1 flex gap-1 sm:gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="अपना सवाल टाइप करें..."
              className="flex-1 bg-black border border-gray-700 rounded-lg px-2 sm:px-3 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00FF00] placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                isListening 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              disabled={isLoading}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff size={14} className="sm:w-4 sm:h-4" /> : <Mic size={14} className="sm:w-4 sm:h-4" />}
            </button>
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-[#00FF00] text-black p-2 rounded-lg hover:bg-[#00CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 sm:mt-2 text-center leading-tight">
          This AI provides health guidance but is not a replacement for professional medical care.
        </p>
      </div>
    </div>
  );
}