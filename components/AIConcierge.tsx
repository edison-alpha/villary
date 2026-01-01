
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ArrowLeft, MoreVertical } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIConciergeProps {
  onClose: () => void;
}

const AIConcierge: React.FC<AIConciergeProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Villays. I am your personal Luxury Concierge. How can I assist with your villa selection today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages((prev: ChatMessage[]) => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "Thank you for your interest. Our luxury concierge service will be available soon. Please browse our stunning villa collection in the meantime.",
        "I appreciate your inquiry. Our team is preparing personalized recommendations for you. Feel free to explore our exclusive properties.",
        "Your request has been noted. While our AI concierge is being enhanced, please explore our curated selection of premium villas.",
        "Thank you for reaching out. Our concierge service is coming soon. In the meantime, discover our handpicked luxury destinations."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev: ChatMessage[]) => [...prev, { role: 'model', text: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const quickReplies = [
    "View villas",
    "Best deals",
    "Contact support",
    "Book now"
  ];

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[200] w-full md:w-[380px] h-full md:h-[560px] bg-white md:rounded-3xl shadow-none md:shadow-2xl flex flex-col overflow-hidden">
      {/* Mobile Header - Like WhatsApp/Messenger */}
      <div className="bg-[#0d5c63] text-white shrink-0">
        {/* Safe area padding for notch */}
        <div className="safe-top"></div>
        
        <div className="px-2 py-2 flex items-center gap-2">
          {/* Back button - Mobile only feel */}
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-full transition-all md:hidden"
          >
            <ArrowLeft size={22} />
          </button>
          
          {/* Avatar & Info */}
          <div className="flex items-center gap-3 flex-grow">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-[15px]">Villays Concierge</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <p className="text-white/70 text-[11px]">Online now</p>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <button className="p-2 hover:bg-white/10 rounded-full transition-all md:hidden">
            <MoreVertical size={20} />
          </button>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-full transition-all hidden md:block"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef} 
        className="flex-grow overflow-y-auto bg-[#f0f2f5] md:bg-slate-50"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      >
        <div className="p-4 space-y-3">
          {/* Date indicator */}
          <div className="flex justify-center mb-4">
            <span className="bg-white/80 text-slate-500 text-[10px] px-3 py-1 rounded-full shadow-sm">
              Today
            </span>
          </div>
          
          {messages.map((msg: ChatMessage, idx: number) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-3 py-2 ${
                msg.role === 'user' 
                  ? 'bg-[#0d5c63] text-white rounded-2xl rounded-br-md' 
                  : 'bg-white text-slate-700 rounded-2xl rounded-bl-md shadow-sm'
              }`}>
                <p className="text-[13px] leading-relaxed">{msg.text}</p>
                <p className={`text-[9px] mt-1 text-right ${
                  msg.role === 'user' ? 'text-white/50' : 'text-slate-400'
                }`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto scrollbar-hide">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(reply);
                setTimeout(() => handleSend(), 100);
              }}
              className="shrink-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-medium text-slate-600 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input Area - Like modern chat apps */}
      <div className="bg-white border-t border-slate-100 shrink-0">
        <div className="px-3 py-2 flex items-end gap-2" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))' }}>
          <div className="flex-grow bg-slate-100 rounded-3xl px-4 py-2 min-h-[44px] flex items-center">
            <input 
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
              placeholder="Message..."
              className="flex-grow bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${
              input.trim() 
                ? 'bg-[#0d5c63] text-white' 
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Send size={18} className={input.trim() ? '' : 'opacity-50'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConcierge;
