
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
    <div className="bg-[#fcfdfd] min-h-screen pb-60">
      {/* 1. Interactive Step Indicator */}
      <div className="bg-white border-b border-slate-100 py-10 sticky top-0 z-[80] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-center gap-8 md:gap-24">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-4 group transition-all ${step.active ? 'opacity-100' : 'opacity-40 hover:opacity-100 cursor-pointer'}`}
                onClick={() => !step.active && step.id < currentStep && onBack()}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all transform group-hover:scale-110 ${
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 mb-16 flex flex-col md:flex-row items-end justify-between gap-10">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] hover:text-[#0d5c63] transition-colors mb-8"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Estate
          </button>
          <h2 className="text-6xl font-serif text-[#0d5c63] leading-tight">Your Private <br /> Sanctuary Awaits</h2>
          <p className="text-slate-400 mt-4 font-medium tracking-wide">Handpicked selection for your stay in {villa.location}</p>
        </div>

        <div className="flex items-center gap-12 bg-white px-10 py-6 rounded-[2.5rem] shadow-xl border border-slate-50 animate-in fade-in slide-in-from-right duration-700">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black text-[#0d5c63] uppercase tracking-[0.3em] flex items-center gap-2">
                <Calendar size={12} /> Stay Interval
            </span>
            <span className="text-sm font-bold text-slate-800">{formatDateRange(arrivalDate, departureDate)}</span>
          </div>
          <div className="w-px h-12 bg-slate-100"></div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black text-[#0d5c63] uppercase tracking-[0.3em] flex items-center gap-2">
                <Users size={12} /> Party Size
            </span>
            <span className="text-sm font-bold text-slate-800">2 Adults, 1 Minor</span>
          </div>
        </div>
      </div>

      {/* 3. Room List */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        {villa.suites?.map((suite, idx) => (
          <div 
            key={suite.id} 
            className={`bg-white rounded-[4.5rem] overflow-hidden shadow-2xl transition-all duration-700 border-2 ${
                selectedSuiteId === suite.id ? 'border-[#0d5c63] ring-8 ring-[#0d5c63]/5 scale-[1.02]' : 'border-white hover:border-slate-100'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-12 md:p-16">
                <div className="relative aspect-[16/9] rounded-[3.5rem] overflow-hidden mb-12 shadow-2xl group cursor-pointer" onClick={() => onViewDetails?.(suite)}>
                  <img 
                    src={suite.image} 
                    alt={suite.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" 
                  />
                  <div className="absolute top-10 left-10 flex gap-3">
                    <span className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#0d5c63] shadow-lg">Heritage Suite</span>
                    <span className="bg-[#0d5c63]/90 backdrop-blur-xl px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-lg">Best Value</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                  <div className="max-w-xl">
                    <h3 className="text-4xl font-serif font-bold text-slate-800 mb-6">{suite.name}</h3>
                    <div className="flex gap-4 mb-8">
                       <span className="px-5 py-2 rounded-xl bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{suite.size}</span>
                       <span className="px-5 py-2 rounded-xl bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{suite.view}</span>
                    </div>
                    <p className="text-slate-500 text-lg leading-relaxed italic">
                        {suite.description.split('.')[0]}.
                    </p>
                  </div>
                  <button 
                    onClick={() => onViewDetails?.(suite)}
                    className="group flex items-center gap-3 text-[#0d5c63] font-bold text-xs uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all border-b-2 border-[#0d5c63]/20 pb-2"
                  >
                    View Experience <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#f8fafb] p-12 md:p-16 border-l border-slate-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Rate Inclusion</h4>
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm mb-10">
                    <ul className="space-y-6">
                      {suite.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-center gap-4 text-xs text-slate-600 font-bold uppercase tracking-widest">
                          <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                            <Check size={12} className="text-green-600" strokeWidth={4} />
                          </div>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                    <div className="mb-10">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mb-4">Starting At</p>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-5xl font-serif font-bold text-[#0d5c63]">${suite.basePrice.toLocaleString()}</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">/ Night</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedSuiteId(suite.id === selectedSuiteId ? null : suite.id)}
                        className={`w-full py-6 rounded-[1.5rem] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl ${
                            selectedSuiteId === suite.id 
                            ? 'bg-slate-800 text-white shadow-slate-800/20 scale-95' 
                            : 'bg-[#0d5c63] text-white hover:bg-[#0a4a50] shadow-[#0d5c63]/30 hover:-translate-y-1'
                        }`}
                    >
                        {selectedSuiteId === suite.id ? (
                            <span className="flex items-center justify-center gap-3"><Check size={20} /> Selected</span>
                        ) : 'Reserve Suite'}
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Sticky Bottom Summary Bar - Enhanced Glassmorphism */}
      {selectedSuiteId && (
        <div className="fixed bottom-12 left-0 right-0 z-[90] flex justify-center px-6 animate-in slide-in-from-bottom-full duration-700">
            <div className="bg-slate-900/90 backdrop-blur-2xl text-white px-12 py-8 rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-10 md:gap-24 max-w-7xl w-full border border-white/10">
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden border-2 border-white/20">
                        <img 
                            src={villa.suites?.find(s => s.id === selectedSuiteId)?.image} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Selected Sanctuary</p>
                        <p className="text-lg font-serif font-bold tracking-wide">{villa.suites?.find(s => s.id === selectedSuiteId)?.name}</p>
                    </div>
                </div>

                <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                
                <div className="flex-grow text-center md:text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Investment for {nights} Nights</p>
                    <p className="text-4xl font-serif font-bold">
                        ${((villa.suites?.find(s => s.id === selectedSuiteId)?.basePrice || 0) * nights).toLocaleString()}
                    </p>
                </div>

                <button 
                    onClick={() => onProceed(villa.suites!.find(s => s.id === selectedSuiteId)!)}
                    className="w-full md:w-auto bg-[#0d5c63] text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-[#0a4a50] transition-all flex items-center justify-center gap-4 group shadow-2xl"
                >
                    Complete Booking <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default RoomSelectionPage;
