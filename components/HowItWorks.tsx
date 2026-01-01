
import React from 'react';
import { Target, UserPlus, Send, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    { 
        id: "01",
        icon: <Target className="text-white" size={32} />, 
        title: "Plan Your Escape", 
        desc: "Define your ideal dates and guest list. Our system automatically checks for the ultimate availability.",
        bg: "bg-[#0d5c63]"
    },
    { 
        id: "02",
        icon: <UserPlus className="text-[#0d5c63]" size={32} />, 
        title: "Tailor Your Services", 
        desc: "Choose from our suite of on-site services including private chefs, yacht charters, and wellness gurus.",
        bg: "bg-white border border-slate-100"
    },
    { 
        id: "03",
        icon: <Send className="text-[#0d5c63]" size={32} />, 
        title: "Book & Indulge", 
        desc: "Secure your reservation with one click. Your personal estate manager will be waiting at the gates.",
        bg: "bg-white border border-slate-100"
    }
  ];

  return (
    <section className="bg-slate-50 py-32">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-5xl font-serif text-[#0d5c63] mb-4 text-center">Easy Steps To Your <br /> Dream Trip</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className={`p-16 rounded-[4rem] transition-all duration-500 hover:shadow-2xl flex flex-col items-start ${step.bg}`}>
              <div className="w-full flex justify-between items-start mb-12">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.id === "01" ? 'bg-white/10' : 'bg-[#0d5c63]/5'}`}>
                   {step.icon}
                </div>
                <span className={`text-4xl font-serif font-bold ${step.id === "01" ? 'text-white/20' : 'text-slate-100'}`}>
                    {step.id}
                </span>
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${step.id === "01" ? 'text-white' : 'text-slate-800'}`}>{step.title}</h3>
              <p className={`leading-relaxed mb-10 ${step.id === "01" ? 'text-white/60' : 'text-slate-400'}`}>
                {step.desc}
              </p>
              
              <button className={`mt-auto flex items-center gap-2 font-bold group ${step.id === "01" ? 'text-white' : 'text-[#0d5c63]'}`}>
                Learn More 
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
