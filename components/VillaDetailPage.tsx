import React, { useState } from 'react';
import { 
  Star, MapPin, Check, ChevronDown, ChevronUp, 
  Wifi, Info, Car, Dog, Wind, Clock, Plane, Globe, Sparkles
} from 'lucide-react';
import { Villa } from '../types';
import { PRACTICAL_INFO, ESTATE_CONTENT } from '../constants/villas';

interface VillaDetailPageProps {
  villa: Villa;
}

const VillaDetailPage: React.FC<VillaDetailPageProps> = ({ villa }) => {
  const [openSection, setOpenSection] = useState<string | null>('practical');

  const toggleSection = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <div className="bg-white">
      {/* 1. The Editorial Intro */}
      <section className="container mx-auto px-6 pt-32 pb-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-serif text-[#0d5c63] mb-8">{villa.name}</h2>
            <div className="flex items-center justify-center gap-2 mb-10">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-[#0d5c63] text-[#0d5c63]" />)}
                <span className="ml-4 text-xs font-bold uppercase tracking-widest text-slate-400">Villays Heritage Collection</span>
            </div>
            <p className="text-2xl text-slate-600 font-light leading-relaxed italic">
                "{villa.description}"
            </p>
        </div>
      </section>

      {/* 2. Main Details Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Column: Deep Content */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Practical Information Section */}
            <div className="scroll-mt-32">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Practical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                <InfoItem icon={<MapPin size={18}/>} label="Address" value={PRACTICAL_INFO.address} />
                <InfoItem icon={<Globe size={18}/>} label="Internet" value={`Public: ${PRACTICAL_INFO.internet.public}, Room: ${PRACTICAL_INFO.internet.room}`} />
                <InfoItem icon={<Sparkles size={18}/>} label="Children Policy" value={PRACTICAL_INFO.children} />
                <InfoItem icon={<Clock size={18}/>} label="Check-in / Check-out" value={`In: ${PRACTICAL_INFO.checkInOut.checkIn} / Out: ${PRACTICAL_INFO.checkInOut.checkOut}`} />
                <InfoItem icon={<Plane size={18}/>} label="Transfers" value={PRACTICAL_INFO.transport} />
                <InfoItem icon={<Wind size={18}/>} label="Smoking Policy" value={PRACTICAL_INFO.smoking} />
                <InfoItem icon={<Dog size={18}/>} label="Pets" value={PRACTICAL_INFO.pets} />
                <InfoItem icon={<Car size={18}/>} label="Parking" value={PRACTICAL_INFO.parking} />
              </div>
            </div>

            {/* Inclusions Section */}
            <div className="bg-slate-50 rounded-[4rem] p-16">
              <h3 className="text-2xl font-serif text-[#0d5c63] mb-10">Always included in this estate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ESTATE_CONTENT.alwaysIncluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 text-sm text-slate-600">
                    <Check size={16} className="text-[#0d5c63] mt-1 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion Sections: Dining & Leisure */}
            <div className="space-y-4">
               {/* Fix: AccordionItem now supports standard JSX children by making the children prop optional in its type definition */}
               <AccordionItem 
                 title="Restaurants & Bars" 
                 isOpen={openSection === 'dining'} 
                 onClick={() => toggleSection('dining')}
               >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                   {ESTATE_CONTENT.dining.map((item, i) => (
                     <div key={i}>
                       <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                       <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                 </div>
               </AccordionItem>

               {/* Fix: AccordionItem now supports standard JSX children by making the children prop optional in its type definition */}
               <AccordionItem 
                 title="Spa & Leisure" 
                 isOpen={openSection === 'leisure'} 
                 onClick={() => toggleSection('leisure')}
               >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                   {ESTATE_CONTENT.leisure.map((item, i) => (
                     <div key={i}>
                       <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                       <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                 </div>
               </AccordionItem>
            </div>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#0d5c63] text-white rounded-[3rem] p-12 shadow-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-2 text-center">Exclusive Daily Rate</p>
              <h4 className="text-4xl font-serif font-bold text-center mb-10">${villa.price.toLocaleString()} <span className="text-lg opacity-40 font-sans">/night</span></h4>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                  <span className="opacity-60">Estate Manager</span>
                  <span className="font-bold">24/7 Priority</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                  <span className="opacity-60">Breakfast</span>
                  <span className="font-bold">Included</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                  <span className="opacity-60">Cancellation</span>
                  <span className="font-bold">Flexible</span>
                </div>
              </div>

              <button className="w-full bg-white text-[#0d5c63] py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#0d5c63] shrink-0">
      {icon}
    </div>
    <div>
      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</h5>
      <p className="text-sm text-slate-800 font-medium leading-relaxed">{value}</p>
    </div>
  </div>
);

// Fix: Making children optional ensures TypeScript correctly recognizes nested JSX content without requiring an explicit children attribute.
const AccordionItem = ({ title, isOpen, onClick, children }: { title: string, isOpen: boolean, onClick: () => void, children?: React.ReactNode }) => (
  <div className="border-b border-slate-100">
    <button onClick={onClick} className="w-full py-8 flex items-center justify-between text-left group">
      <span className={`text-2xl font-serif ${isOpen ? 'text-[#0d5c63]' : 'text-slate-800'} group-hover:text-[#0d5c63] transition-colors`}>{title}</span>
      {isOpen ? <ChevronUp size={24} className="text-[#0d5c63]" /> : <ChevronDown size={24} className="text-slate-300" />}
    </button>
    <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
      {children}
    </div>
  </div>
);

export default VillaDetailPage;