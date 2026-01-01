
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
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
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    // Simulate response delay
    setTimeout(() => {
      const responses = [
        "Thank you for your interest. Our luxury concierge service will be available soon. Please browse our stunning villa collection in the meantime.",
        "I appreciate your inquiry. Our team is preparing personalized recommendations for you. Feel free to explore our exclusive properties.",
        "Your request has been noted. While our AI concierge is being enhanced, please explore our curated selection of premium villas.",
        "Thank you for reaching out. Our concierge service is coming soon. In the meantime, discover our handpicked luxury destinations."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'model', text: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 right-6 z-[60] w-[92vw] md:w-[360px] h-[520px] bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-slate-100/50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header - More Compact */}
      <div className="bg-[#0d5c63] px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
                <Sparkles size={18} />
            </div>
            <div>
                <h3 className="font-serif text-lg font-bold">Concierge</h3>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <p className="text-white/60 text-[10px] uppercase tracking-wider font-bold">Online</p>
                </div>
            </div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition-all">
          <X size={20} />
        </button>
      </div>

      {/* Messages - Tightened Padding */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] p-3.5 rounded-2xl ${
              msg.role === 'user' 
              ? 'bg-[#0d5c63] text-white rounded-tr-none shadow-sm' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
            }`}>
              <p className="text-[13px] leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none animate-pulse">
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Input - Streamlined */}
      <div className="p-4 border-t border-slate-100 bg-white shrink-0">
        <div className="relative flex items-center gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your request..."
            className="flex-grow bg-slate-50 border border-slate-100 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#0d5c63] transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-1 top-1 bottom-1 px-3 bg-[#0d5c63] text-white rounded-lg hover:bg-[#0a4a50] disabled:opacity-50 transition-all flex items-center justify-center"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-300 mt-3 uppercase tracking-[0.2em] font-medium">
            Personal Intelligence by Villays
        </p>
      </div>
    </div>
  );
};

export default AIConcierge;
