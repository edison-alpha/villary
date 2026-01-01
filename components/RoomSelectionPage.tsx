
import React, { useState } from 'react';
import { ChevronRight, Check, Info, ArrowLeft, Calendar, Users, Star } from 'lucide-react';
import { Villa, Suite } from '../types';

interface RoomSelectionPageProps {
  villa: Villa;
  arrivalDate: Date;
  departureDate: Date;
  onBack: () => void;
  onProceed: (selectedSuite: Suite) => void;
  onViewDetails?: (suite: Suite) => void;
}

const RoomSelectionPage: React.FC<RoomSelectionPageProps> = ({ 
  villa, 
  arrivalDate, 
  departureDate, 
  onBack, 
  onProceed,
  onViewDetails
}) => {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string | null>(null);

  const steps = [
    { id: 1, name: "Suites & Rates", active: true },
    { id: 2, name: "Personal Details", active: false },
    { id: 3, name: "Confirmation", active: false }
  ];

  const currentStep = 1;

  const formatDateRange = (start: Date, end: Date) => {
    const s = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const e = end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${s} - ${e}`;
  };

  const calculateNights = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(arrivalDate, departureDate);

  return (
    <div className="bg-[#fcfdfd] min-h-screen pb-40 md:pb-60">
      {/* 1. Interactive Step Indicator */}
      <div className="bg-white border-b border-slate-100 py-4 md:py-10 sticky top-0 z-[80] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex items-center justify-center gap-4 md:gap-24">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-2 md:gap-4 group transition-all ${step.active ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-xs md:text-sm font-black transition-all ${
                  step.id === currentStep 
                  ? 'bg-[#0d5c63] text-white shadow-xl shadow-[#0d5c63]/30' 
                  : 'bg-slate-100 text-slate-400'
                }`}>
                  {step.id}
                </div>
                <div className="hidden md:block">
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${step.id === currentStep ? 'text-[#0d5c63]' : 'text-slate-300'}`}>Step {step.id}</p>
                    <p className={`text-xs font-bold ${step.id === currentStep ? 'text-slate-800' : 'text-slate-400'}`}>{step.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Selection Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-8 md:pt-20 mb-8 md:mb-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 md:gap-10">
        <div>
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 md:gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:text-[#0d5c63] transition-colors mb-4 md:mb-8"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Return to Estate
          </button>
          <h2 className="text-3xl md:text-6xl font-serif text-[#0d5c63] leading-tight">Your Private <br className="hidden md:block" /> Sanctuary Awaits</h2>
          <p className="text-slate-400 mt-2 md:mt-4 font-medium tracking-wide text-sm md:text-base">Handpicked selection for your stay in {villa.location}</p>
        </div>

        <div className="flex items-center gap-6 md:gap-12 bg-white px-6 md:px-10 py-4 md:py-6 rounded-2xl md:rounded-[2.5rem] shadow-xl border border-slate-50 w-full lg:w-auto">
          <div className="flex flex-col gap-1 md:gap-2 flex-1 lg:flex-none">
            <span className="text-[8px] md:text-[9px] font-black text-[#0d5c63] uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-1 md:gap-2">
                <Calendar size={10} /> Stay Interval
            </span>
            <span className="text-xs md:text-sm font-bold text-slate-800">{formatDateRange(arrivalDate, departureDate)}</span>
          </div>
          <div className="w-px h-10 md:h-12 bg-slate-100"></div>
          <div className="flex flex-col gap-1 md:gap-2 flex-1 lg:flex-none">
            <span className="text-[8px] md:text-[9px] font-black text-[#0d5c63] uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-1 md:gap-2">
                <Users size={10} /> Party Size
            </span>
            <span className="text-xs md:text-sm font-bold text-slate-800">2 Adults, 1 Minor</span>
          </div>
        </div>
      </div>

      {/* 3. Room List */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-8 md:space-y-24">
        {villa.suites?.map((suite) => (
          <div 
            key={suite.id} 
            className={`bg-white rounded-3xl md:rounded-[4.5rem] overflow-hidden shadow-xl md:shadow-2xl transition-all duration-700 border-2 ${
                selectedSuiteId === suite.id ? 'border-[#0d5c63] ring-4 md:ring-8 ring-[#0d5c63]/5' : 'border-white hover:border-slate-100'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-4 md:p-16">
                <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-[3.5rem] overflow-hidden mb-6 md:mb-12 shadow-xl md:shadow-2xl group cursor-pointer" onClick={() => onViewDetails?.(suite)}>
                  <img 
                    src={suite.image} 
                    alt={suite.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" 
                  />
                  <div className="absolute top-4 left-4 md:top-10 md:left-10 flex flex-wrap gap-2 md:gap-3">
                    <span className="bg-white/90 backdrop-blur-xl px-3 md:px-6 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#0d5c63] shadow-lg">Heritage Suite</span>
                    <span className="bg-[#0d5c63]/90 backdrop-blur-xl px-3 md:px-6 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white shadow-lg">Best Value</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-10">
                  <div className="max-w-xl">
                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-slate-800 mb-3 md:mb-6">{suite.name}</h3>
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-8">
                       <span className="px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-slate-50 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{suite.size}</span>
                       <span className="px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-slate-50 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{suite.view}</span>
                    </div>
                    <p className="text-slate-500 text-sm md:text-lg leading-relaxed italic">
                        {suite.description.split('.')[0]}.
                    </p>
                  </div>
                  <button 
                    onClick={() => onViewDetails?.(suite)}
                    className="group flex items-center gap-2 md:gap-3 text-[#0d5c63] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all border-b-2 border-[#0d5c63]/20 pb-2"
                  >
                    View Experience <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#f8fafb] p-6 md:p-16 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-10">Rate Inclusion</h4>
                  <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm mb-6 md:mb-10">
                    <ul className="space-y-4 md:space-y-6">
                      {suite.inclusions.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-slate-600 font-bold uppercase tracking-widest">
                          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-green-600" strokeWidth={4} />
                          </div>
                          <span className="truncate">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                    <div className="mb-6 md:mb-10">
                        <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 md:mb-4">Starting At</p>
                        <div className="flex items-center justify-center gap-2 md:gap-3">
                            <span className="text-3xl md:text-5xl font-serif font-bold text-[#0d5c63]">${suite.basePrice.toLocaleString()}</span>
                            <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">/ Night</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedSuiteId(suite.id === selectedSuiteId ? null : suite.id)}
                        className={`w-full py-4 md:py-6 rounded-xl md:rounded-[1.5rem] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 shadow-xl text-sm md:text-base ${
                            selectedSuiteId === suite.id 
                            ? 'bg-slate-800 text-white shadow-slate-800/20 scale-95' 
                            : 'bg-[#0d5c63] text-white hover:bg-[#0a4a50] shadow-[#0d5c63]/30 active:scale-95'
                        }`}
                    >
                        {selectedSuiteId === suite.id ? (
                            <span className="flex items-center justify-center gap-2 md:gap-3"><Check size={18} /> Selected</span>
                        ) : 'Reserve Suite'}
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Sticky Bottom Summary Bar - Mobile Optimized */}
      {selectedSuiteId && (
        <div className="fixed bottom-20 lg:bottom-0 left-0 right-0 z-[90] p-3 md:p-0 md:bottom-12 md:flex md:justify-center md:px-6">
            <div className="bg-slate-900/95 backdrop-blur-2xl text-white px-4 md:px-12 py-3 md:py-8 rounded-2xl md:rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-3 md:gap-24 max-w-7xl w-full border border-white/10">
                <div className="flex items-center gap-3 md:gap-8 w-full md:w-auto">
                    <div className="w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-[1.5rem] overflow-hidden border-2 border-white/20 shrink-0">
                        <img 
                            src={villa.suites?.find(s => s.id === selectedSuiteId)?.image} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="flex-grow md:flex-grow-0 min-w-0">
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/40 mb-0.5 md:mb-1">Selected</p>
                        <p className="text-sm md:text-lg font-serif font-bold tracking-wide truncate">{villa.suites?.find(s => s.id === selectedSuiteId)?.name}</p>
                    </div>
                    <div className="md:hidden text-right shrink-0">
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">{nights} Nights</p>
                        <p className="text-lg font-serif font-bold">
                            ${((villa.suites?.find(s => s.id === selectedSuiteId)?.basePrice || 0) * nights).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-white/10"></div>
                
                <div className="hidden md:block flex-grow text-center md:text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Investment for {nights} Nights</p>
                    <p className="text-4xl font-serif font-bold">
                        ${((villa.suites?.find(s => s.id === selectedSuiteId)?.basePrice || 0) * nights).toLocaleString()}
                    </p>
                </div>

                <button 
                    onClick={() => onProceed(villa.suites!.find(s => s.id === selectedSuiteId)!)}
                    className="w-full md:w-auto bg-[#0d5c63] text-white px-6 md:px-16 py-3 md:py-6 rounded-xl md:rounded-2xl font-bold md:font-black uppercase tracking-[0.15em] md:tracking-[0.3em] hover:bg-[#0a4a50] transition-all flex items-center justify-center gap-2 md:gap-4 group shadow-2xl active:scale-95 text-xs md:text-base"
                >
                    Complete Booking <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default RoomSelectionPage;
