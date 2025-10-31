'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const suggestedPrompts = [
  'Generate summary',
  'Ada berapa stock kertas A4 didalam gudang?',
  'Apakah masyarakat dapat meminjam barang dari gudang?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSuggestionClick = (prompt) => {
    setInputValue(prompt);
  };

  return (
    <div className="z-50">
      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-4 sm:right-8 w-80 md:w-2/5 h-[600px] transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <Card className="h-full flex flex-col shadow-2xl rounded-2xl">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Content */}
          <CardContent className="grow p-4 overflow-y-auto bg-white flex flex-col justify-between">
            {/* Initial State */}
            <div className="text-center py-8">
              <div className="inline-block bg-white p-4 rounded-2xl border border-gray-200 mb-4">
                <Image
                  src="/images/sibarkumenlogo.png"
                  alt="Sibarkumen Logo"
                  width={64}
                  height={64}
                />
              </div>
              <p className="text-gray-500">Apa yang ingin anda ketahui?</p>
            </div>

            {/* Suggested Prompts */}
            <div className="space-y-2 flex flex-col items-end">
              {suggestedPrompts.map((prompt, index) => (
                <div
                  className="bg-white px-4 py-2 border border-gray-200 text-end w-fit rounded-[12px] cursor-pointer hover:bg-accent transition text-base"
                  key={index}
                  onClick={() => handleSuggestionClick(prompt)}
                >
                  <p>{prompt}</p>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Footer Input */}
          <div className="p-4 border-t bg-white">
            <div className="relative">
              <Input
                placeholder="Ask me anything..."
                className="pr-12"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 -translate-y-1/2"
                aria-label="Send message"
              >
                <Send className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Chat Button */}
      <div
        className="text-white flex items-center justify-center bg-primary w-16 h-16 rounded-full fixed bottom-4 right-4 sm:right-8 shadow-lg hover:bg-primary/75 transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </div>
    </div>
  );
}
