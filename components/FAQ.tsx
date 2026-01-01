
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    { q: "Can I customize my itinerary?", a: "Every booking at Villays comes with a dedicated estate concierge who works with you to tailor every meal, local excursion, and private transfer." },
    { q: "What's included in the pricing?", a: "Our base rates include 24/7 security, daily housekeeping, premium toiletries, and full access to all estate amenities including the wine cellar." },
    { q: "How far in advance should I book?", a: "For the peak Mediterranean season (June-August), we recommend booking at least 6 to 9 months in advance to ensure availability." },
    { q: "Is the estate family-friendly?", a: "Absolutely. We provide specialized children's suites, child-safe pool measures, and can arrange professional nanny services upon request." },
  ];

  return (
    <section className="py-16 md:py-32 container mx-auto px-4 md:px-6">
      <div className="mb-10 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-serif text-[#0d5c63] text-center mb-4">Frequently Asked Questions</h2>
          <div className="w-16 md:w-24 h-1 bg-[#0d5c63]/20 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
        <div className="relative group order-2 lg:order-1">
            <div className="rounded-2xl md:rounded-[4rem] overflow-hidden shadow-xl md:shadow-2xl aspect-square">
                <img 
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200" 
                    alt="Lifestyle at Villays" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-[#0d5c63] p-6 md:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl hidden sm:block max-w-[280px] md:max-w-[320px]">
                <p className="text-white/80 text-xs md:text-sm italic mb-3 md:mb-4 leading-relaxed">"The level of detail at Villays is unlike any other property we've stayed at. Simply divine."</p>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20"></div>
                    <div>
                        <p className="font-bold text-white text-xs md:text-sm">Alexandra Ross</p>
                        <p className="text-[10px] md:text-xs text-white/40">Loyal Guest</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="group">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className={`w-full py-4 md:py-6 flex items-center justify-between text-left border-b border-slate-100 group-hover:border-[#0d5c63]/30 transition-all ${openIdx === idx ? 'border-[#0d5c63]' : ''}`}
              >
                <span className={`text-base md:text-xl font-serif font-bold pr-4 ${openIdx === idx ? 'text-[#0d5c63]' : 'text-slate-800'}`}>
                  <span className="text-slate-300 mr-3 md:mr-6 font-sans text-xs md:text-sm font-light">0{idx + 1}</span>
                  {faq.q}
                </span>
                <div className={`transition-all shrink-0 ${openIdx === idx ? 'rotate-180 text-[#0d5c63]' : 'text-slate-300'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIdx === idx ? 'max-h-40 opacity-100 py-4 md:py-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-500 leading-relaxed max-w-lg pl-8 md:pl-12 text-sm md:text-base">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
