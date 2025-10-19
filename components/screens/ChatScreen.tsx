
import React, { useState, useRef, useEffect } from 'react';
import type { Course } from '../../types';
import Header from '../layout/Header';
import { generateTutorResponse } from '../../services/geminiService';
import { Send } from '../icons';
import Spinner from '../ui/Spinner';

interface ChatScreenProps {
  course: Course;
  onBack: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ course, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
      { sender: 'ai', text: `Hello! I'm your AI tutor for ${course.name}. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateTutorResponse(input.trim(), course.systemPrompt);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I couldn't get a response. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-brand-primary">
      <Header title={course.name} showBackButton onBackClick={onBack} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-brand-teal text-white rounded-br-none' : 'bg-brand-secondary text-brand-text rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-brand-secondary rounded-xl p-4">
              <Spinner />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <footer className="bg-brand-secondary p-4 sticky bottom-0">
        <div className="container mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-grow bg-brand-primary text-brand-text p-3 rounded-full border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-teal disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-brand-teal text-white p-3 rounded-full hover:bg-opacity-80 transition-colors disabled:bg-brand-accent disabled:cursor-not-allowed"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;
