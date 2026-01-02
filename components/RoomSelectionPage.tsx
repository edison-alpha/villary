
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
                  ? 'bg-[#BC8F48] text-white shadow-xl shadow-[#BC8F48]/30' 
                  : 'bg-slate-100 text-slate-400'
                }`}>
                  {step.id}
                </div>
                <div className="hidden md:block">
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${step.id === currentStep ? 'text-[#BC8F48]' : 'text-slate-300'}`}>Step {step.id}</p>
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
            className="group flex items-center gap-2 md:gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:text-[#BC8F48] transition-colors mb-4 md:mb-8"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Properti
          </button>
          <h2 className="text-3xl md:text-6xl font-serif text-[#BC8F48] leading-tight">Tempat Istirahat <br className="hidden md:block" /> Pribadi Anda Menanti</h2>
          <p className="text-slate-400 mt-2 md:mt-4 font-medium tracking-wide text-sm md:text-base">Pilihan terbaik untuk menginap di {villa.location}</p>
        </div>

        <div className="flex items-center gap-6 md:gap-12 bg-white px-6 md:px-10 py-4 md:py-6 rounded-2xl md:rounded-[2.5rem] shadow-xl border border-slate-50 w-full lg:w-auto">
          <div className="flex flex-col gap-1 md:gap-2 flex-1 lg:flex-none">
            <span className="text-[8px] md:text-[9px] font-black text-[#BC8F48] uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-1 md:gap-2">
                <Calendar size={10} /> Periode Menginap
            </span>
            <span className="text-xs md:text-sm font-bold text-slate-800">{formatDateRange(arrivalDate, departureDate)}</span>
          </div>
          <div className="w-px h-10 md:h-12 bg-slate-100"></div>
          <div className="flex flex-col gap-1 md:gap-2 flex-1 lg:flex-none">
            <span className="text-[8px] md:text-[9px] font-black text-[#BC8F48] uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-1 md:gap-2">
                <Users size={10} /> Jumlah Tamu
            </span>
            <span className="text-xs md:text-sm font-bold text-slate-800">2 Dewasa, 1 Anak</span>
          </div>
        </div>
      </div>

      {/* 3. Room List */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-8 md:space-y-24">
        {villa.suites?.map((suite) => (
          <div 
            key={suite.id} 
            className={`bg-white rounded-3xl md:rounded-[4.5rem] overflow-hidden shadow-xl md:shadow-2xl transition-all duration-700 border-2 ${
                selectedSuiteId === suite.id ? 'border-[#BC8F48] ring-4 md:ring-8 ring-[#BC8F48]/5' : 'border-white hover:border-slate-100'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-5 md:p-16">
                <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-[3.5rem] overflow-hidden mb-5 md:mb-12 shadow-xl md:shadow-2xl group cursor-pointer" onClick={() => onViewDetails?.(suite)}>
                  <img 
                    src={suite.image} 
                    alt={suite.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" 
                  />
                  <div className="absolute top-3 left-3 md:top-10 md:left-10 flex flex-wrap gap-2 md:gap-3">
                    <span className="bg-white/90 backdrop-blur-xl px-3 md:px-6 py-1.5 md:py-3 rounded-full text-[10px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-[0.3em] text-[#BC8F48] shadow-lg">Suite Heritage</span>
                    <span className="bg-[#BC8F48]/90 backdrop-blur-xl px-3 md:px-6 py-1.5 md:py-3 rounded-full text-[10px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-[0.3em] text-white shadow-lg">Terbaik</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-10">
                  <div className="max-w-xl">
                    <h3 className="text-xl md:text-4xl font-serif font-bold text-slate-800 mb-2 md:mb-6">{suite.name}</h3>
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-3 md:mb-8">
                       <span className="px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-slate-50 text-xs md:text-[10px] font-semibold text-slate-500 uppercase tracking-wide">{suite.size}</span>
                       <span className="px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-slate-50 text-xs md:text-[10px] font-semibold text-slate-500 uppercase tracking-wide">{suite.view}</span>
                    </div>
                    <p className="text-slate-500 text-sm md:text-lg leading-relaxed">
                        {suite.description.split('.')[0]}.
                    </p>
                  </div>
                  <button 
                    onClick={() => onViewDetails?.(suite)}
                    className="group flex items-center gap-2 md:gap-3 text-[#BC8F48] font-bold text-xs md:text-xs uppercase tracking-wider md:tracking-[0.3em] transition-all border-b-2 border-[#BC8F48]/20 pb-2"
                  >
                    Lihat Detail <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#f8fafb] p-5 md:p-16 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs md:text-[10px] font-bold text-slate-400 uppercase tracking-widest md:tracking-[0.4em] mb-4 md:mb-10">Termasuk</h4>
                  <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 border border-slate-100 shadow-sm mb-5 md:mb-10">
                    <ul className="space-y-3 md:space-y-6">
                      {suite.inclusions.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-center gap-3 md:gap-4 text-xs md:text-xs text-slate-600 font-medium">
                          <div className="w-5 h-5 md:w-5 md:h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                            <Check size={12} className="text-green-600" strokeWidth={3} />
                          </div>
                          <span className="truncate">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                    <div className="mb-5 md:mb-10">
                        <p className="text-xs md:text-[10px] text-slate-400 font-bold uppercase tracking-widest md:tracking-[0.4em] mb-2 md:mb-4">Mulai Dari</p>
                        <div className="flex items-center justify-center gap-2 md:gap-3">
                            <span className="text-xl md:text-5xl font-serif font-bold text-[#BC8F48]">Rp {suite.basePrice.toLocaleString('id-ID')}</span>
                        </div>
                        <span className="text-sm md:text-xs text-slate-400 font-medium mt-1 block">per malam</span>
                    </div>
                    <button 
                        onClick={() => setSelectedSuiteId(suite.id === selectedSuiteId ? null : suite.id)}
                        className={`w-full py-4 md:py-6 rounded-xl md:rounded-[1.5rem] font-bold uppercase tracking-wider md:tracking-[0.3em] transition-all duration-500 shadow-xl text-sm md:text-base ${
                            selectedSuiteId === suite.id 
                            ? 'bg-slate-800 text-white shadow-slate-800/20 scale-95' 
                            : 'bg-[#BC8F48] text-white hover:bg-[#A67B3D] shadow-[#BC8F48]/30 active:scale-95'
                        }`}
                    >
                        {selectedSuiteId === suite.id ? (
                            <span className="flex items-center justify-center gap-2 md:gap-3"><Check size={18} /> Terpilih</span>
                        ) : 'Pilih Suite'}
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Sticky Bottom Summary Bar - Mobile Optimized */}
      {selectedSuiteId && (
        <div className="fixed bottom-20 lg:bottom-0 left-0 right-0 z-[90] p-3 md:p-4 md:bottom-4 md:flex md:justify-center md:px-6">
            <div className="bg-slate-900/95 backdrop-blur-2xl text-white px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-3 md:gap-8 max-w-4xl w-full border border-white/10">
                <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                    <div className="w-11 h-11 md:w-10 md:h-10 rounded-xl md:rounded-lg overflow-hidden border-2 border-white/20 shrink-0">
                        <img 
                            src={villa.suites?.find(s => s.id === selectedSuiteId)?.image} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="flex-grow md:flex-grow-0 min-w-0">
                        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">Terpilih</p>
                        <p className="text-sm md:text-sm font-serif font-bold tracking-wide truncate">{villa.suites?.find(s => s.id === selectedSuiteId)?.name}</p>
                    </div>
                    <div className="md:hidden text-right shrink-0">
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">{nights} Malam</p>
                        <p className="text-lg font-serif font-bold">
                            Rp {((villa.suites?.find(s => s.id === selectedSuiteId)?.basePrice || 0) * nights).toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>

                <div className="hidden md:block w-px h-8 bg-white/10"></div>
                
                <div className="hidden md:block flex-grow text-center md:text-left">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">Total {nights} Malam</p>
                    <p className="text-xl font-serif font-bold">
                        Rp {((villa.suites?.find(s => s.id === selectedSuiteId)?.basePrice || 0) * nights).toLocaleString('id-ID')}
                    </p>
                </div>

                <button 
                    onClick={() => onProceed(villa.suites!.find(s => s.id === selectedSuiteId)!)}
                    className="w-full md:w-auto bg-[#BC8F48] text-white px-6 md:px-8 py-3 md:py-3 rounded-xl md:rounded-full font-bold uppercase tracking-[0.15em] md:tracking-[0.1em] hover:bg-[#A67B3D] transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-95 text-xs"
                >
                    Lanjutkan Pemesanan <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default RoomSelectionPage;
