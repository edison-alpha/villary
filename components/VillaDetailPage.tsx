import React, { useState } from 'react';
import { 
  Star, MapPin, Check, ChevronDown, ChevronUp, 
  Wifi, Info, Car, Dog, Wind, Clock, Plane, Globe, Sparkles
} from 'lucide-react';
import { Villa } from '../types';
import { PRACTICAL_INFO, ESTATE_CONTENT } from '../constants/villas';
import { MobileRatePopup } from './PromoPopups';

interface VillaDetailPageProps {
  villa: Villa;
  onBookNow?: () => void;
}

const VillaDetailPage: React.FC<VillaDetailPageProps> = ({ villa, onBookNow }) => {
  const [openSection, setOpenSection] = useState<string | null>('practical');
  const [showMobileRate, setShowMobileRate] = useState(true);

  const toggleSection = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <div className="bg-white pb-20 lg:pb-0">
      {/* 1. The Editorial Intro */}
      <section className="container mx-auto px-4 md:px-6 pt-16 md:pt-32 pb-12 md:pb-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif text-[#4A3426] mb-4 md:mb-8">{villa.name}</h2>
            <div className="flex items-center justify-center gap-1 md:gap-2 mb-6 md:mb-10">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-[#4A3426] text-[#4A3426]" />)}
                <span className="ml-2 md:ml-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Omah Turu Heritage Collection</span>
            </div>
            <p className="text-lg md:text-2xl text-slate-600 font-light leading-relaxed italic px-2">
                "{villa.description}"
            </p>
        </div>
      </section>

      {/* 2. Main Details Grid */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
          
          {/* Left Column: Deep Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-24">
            
            {/* Practical Information Section */}
            <div className="scroll-mt-32">
              <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-12">Practical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-16 md:gap-y-10">
                <InfoItem icon={<MapPin size={16}/>} label="Address" value={PRACTICAL_INFO.address} />
                <InfoItem icon={<Globe size={16}/>} label="Internet" value={`Public: ${PRACTICAL_INFO.internet.public}, Room: ${PRACTICAL_INFO.internet.room}`} />
                <InfoItem icon={<Sparkles size={16}/>} label="Children Policy" value={PRACTICAL_INFO.children} />
                <InfoItem icon={<Clock size={16}/>} label="Check-in / Check-out" value={`In: ${PRACTICAL_INFO.checkInOut.checkIn} / Out: ${PRACTICAL_INFO.checkInOut.checkOut}`} />
                <InfoItem icon={<Plane size={16}/>} label="Transfers" value={PRACTICAL_INFO.transport} />
                <InfoItem icon={<Wind size={16}/>} label="Smoking Policy" value={PRACTICAL_INFO.smoking} />
                <InfoItem icon={<Dog size={16}/>} label="Pets" value={PRACTICAL_INFO.pets} />
                <InfoItem icon={<Car size={16}/>} label="Parking" value={PRACTICAL_INFO.parking} />
              </div>
            </div>

            {/* Inclusions Section */}
            <div className="bg-slate-50 rounded-2xl md:rounded-[4rem] p-6 md:p-16">
              <h3 className="text-xl md:text-2xl font-serif text-[#4A3426] mb-6 md:mb-10">Always included in this estate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {ESTATE_CONTENT.alwaysIncluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4 text-sm text-slate-600">
                    <Check size={14} className="text-[#4A3426] mt-1 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion Sections: Dining & Leisure */}
            <div className="space-y-2 md:space-y-4">
               <AccordionItem 
                 title="Restaurants & Bars" 
                 isOpen={openSection === 'dining'} 
                 onClick={() => toggleSection('dining')}
               >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-4 md:py-8">
                   {ESTATE_CONTENT.dining.map((item, i) => (
                     <div key={i}>
                       <h4 className="font-bold text-slate-800 mb-2 text-sm md:text-base">{item.title}</h4>
                       <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                 </div>
               </AccordionItem>

               <AccordionItem 
                 title="Spa & Leisure" 
                 isOpen={openSection === 'leisure'} 
                 onClick={() => toggleSection('leisure')}
               >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-4 md:py-8">
                   {ESTATE_CONTENT.leisure.map((item, i) => (
                     <div key={i}>
                       <h4 className="font-bold text-slate-800 mb-2 text-sm md:text-base">{item.title}</h4>
                       <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                 </div>
               </AccordionItem>
            </div>
          </div>

          {/* Right Column: Booking Sidebar - Hidden on Mobile */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 bg-[#4A3426] text-white rounded-[3rem] p-12 shadow-2xl">
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

              <button 
                onClick={onBookNow}
                className="w-full bg-white text-[#4A3426] py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Rate Popup - positioned above bottom nav */}
      <MobileRatePopup 
        isVisible={showMobileRate}
        price={villa.price}
        onClose={() => setShowMobileRate(false)}
        onBook={() => onBookNow?.()}
      />
    </div>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex gap-3 md:gap-4">
    <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-50 rounded-lg md:rounded-xl flex items-center justify-center text-[#4A3426] shrink-0">
      {icon}
    </div>
    <div>
      <h5 className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</h5>
      <p className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">{value}</p>
    </div>
  </div>
);

const AccordionItem = ({ title, isOpen, onClick, children }: { title: string, isOpen: boolean, onClick: () => void, children?: React.ReactNode }) => (
  <div className="border-b border-slate-100">
    <button onClick={onClick} className="w-full py-4 md:py-8 flex items-center justify-between text-left group">
      <span className={`text-lg md:text-2xl font-serif ${isOpen ? 'text-[#4A3426]' : 'text-slate-800'} group-hover:text-[#4A3426] transition-colors`}>{title}</span>
      {isOpen ? <ChevronUp size={20} className="text-[#4A3426]" /> : <ChevronDown size={20} className="text-slate-300" />}
    </button>
    <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
      {children}
    </div>
  </div>
);

export default VillaDetailPage;
