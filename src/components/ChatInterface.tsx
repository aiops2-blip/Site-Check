import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chatWithTechMaster } from '@/src/services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  mode: string;
}

export default function ChatInterface({ mode }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Chào bạn, tôi là Tech Master. Tôi đang ở chế độ **${mode}**. Với 20 năm kinh nghiệm vận hành event, tôi có thể giúp gì cho dự án của bạn hôm nay?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update welcome message when mode changes and there's only one message
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{ 
        role: 'assistant', 
        content: `Chào bạn, tôi là Tech Master. Tôi đang ở chế độ **${mode}**. Với 20 năm kinh nghiệm vận hành event, tôi có thể giúp gì cho dự án của bạn hôm nay?` 
      }]);
    }
  }, [mode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await chatWithTechMaster(userMessage, history, mode);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response || 'Tôi không nhận được phản hồi. Hãy thử lại.' }]);
    setIsLoading(false);
  };

  const resetChat = () => {
    setMessages([{ 
      role: 'assistant', 
      content: `Chào bạn, tôi là Tech Master. Tôi đang ở chế độ **${mode}**. Với 20 năm kinh nghiệm vận hành event, tôi có thể giúp gì cho dự án của bạn hôm nay?` 
    }]);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-orange-500">
              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=TechMaster" />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Tech Master AI</h3>
              <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Online & Ready
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={resetChat} title="Reset Chat">
            <RotateCcw className="w-4 h-4 text-slate-400" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className={`w-8 h-8 ${msg.role === 'assistant' ? 'bg-orange-100' : 'bg-slate-100'}`}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5 text-orange-600" /> : <User className="w-5 h-5 text-slate-600" />}
                </Avatar>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'assistant' 
                    ? 'bg-slate-50 text-slate-800 border border-slate-100' 
                    : 'bg-orange-500 text-white shadow-md shadow-orange-500/10'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <Avatar className="w-8 h-8 bg-orange-100">
                  <Bot className="w-5 h-5 text-orange-600" />
                </Avatar>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="relative flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi Tech Master về vận hành, kỹ thuật, rủi ro..."
              className="flex-1 h-12 px-4 rounded-xl border-slate-200 focus-visible:ring-orange-500 pr-12"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="absolute right-1 w-10 h-10 rounded-lg bg-orange-500 hover:bg-orange-600 text-white p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            Tech Master AI có thể đưa ra các giải pháp thực chiến dựa trên 20 năm kinh nghiệm.
          </p>
        </div>
      </div>
    </div>
  );
}
