import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Info, ChevronLeft, CreditCard } from 'lucide-react';
import { Villa, Suite } from '../types';

interface PaymentPageProps {
  villa: Villa;
  suite: Suite;
  total: number;
  onBack: () => void;
  onComplete: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ villa, suite, total, onBack, onComplete }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [activeTab, setActiveTab] = useState<'atm' | 'mobile'>('mobile');
  
  const vaNumber = "8001234567890123";
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(vaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-8 md:pb-20">
      {/* Progress Step Indicator - Mobile Optimized */}
      <div className="bg-white border-b border-slate-100 py-4 md:py-8">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-4 md:gap-16">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold bg-green-500 text-white">
                <Check size={12} />
              </div>
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider hidden sm:block text-slate-400">Suites</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold bg-green-500 text-white">
                <Check size={12} />
              </div>
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider hidden sm:block text-slate-400">Details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#BC8F48] text-white shadow-lg shadow-[#BC8F48]/20">3</div>
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider hidden sm:block text-[#BC8F48]">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-6 md:mt-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-[#BC8F48] mb-4 md:mb-6 text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <ChevronLeft size={14} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* LEFT: Payment Method */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Timer Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center gap-3">
              <Clock size={18} className="text-amber-600 shrink-0" />
              <div className="flex-grow">
                <p className="text-[10px] md:text-xs font-bold text-amber-900">Complete within</p>
                <p className="text-lg md:text-xl font-mono font-bold text-amber-600">{formatTime(timeLeft)}</p>
              </div>
            </div>

            {/* Mandiri VA Card */}
            <div className="bg-gradient-to-br from-[#003d7a] to-[#0052a3] rounded-xl md:rounded-2xl p-4 md:p-6 text-white">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-70 mb-1">Bank Transfer</p>
                  <h3 className="text-lg md:text-xl font-bold">Virtual Account</h3>
                </div>
                <div className="bg-white rounded-lg px-3 md:px-4 py-1.5 md:py-2">
                  <img 
                    src="/assets/01-Mandiri Master Brand Logo.png" 
                    alt="Bank Mandiri" 
                    className="h-5 md:h-6 object-contain"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-logo')) {
                        parent.innerHTML = '<div class="fallback-logo font-bold text-base md:text-lg text-[#003d7a]">MANDIRI</div>';
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div>
                  <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60 mb-2">Virtual Account Number</p>
                  <div className="flex items-center gap-2 md:gap-3 bg-white/10 rounded-lg md:rounded-xl p-2.5 md:p-3">
                    <p className="text-lg md:text-2xl font-mono font-bold tracking-wider flex-grow overflow-x-auto">{vaNumber}</p>
                    <button 
                      onClick={copyToClipboard}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all shrink-0 active:scale-95"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-white/20">
                  <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60 mb-1">Total Payment</p>
                  <p className="text-xl md:text-2xl font-bold">USD ${total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-serif text-slate-800 font-bold mb-3 md:mb-4">How to Pay</h3>
                
                {/* Tabs */}
                <div className="flex gap-2 mb-3 md:mb-4">
                  <button 
                    onClick={() => setActiveTab('mobile')}
                    className={`flex-1 py-2 px-3 md:px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === 'mobile' 
                        ? 'bg-[#BC8F48] text-white' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    Mobile Banking
                  </button>
                  <button 
                    onClick={() => setActiveTab('atm')}
                    className={`flex-1 py-2 px-3 md:px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === 'atm' 
                        ? 'bg-[#BC8F48] text-white' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    ATM
                  </button>
                </div>

                {/* Tab Content */}
                <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4">
                  {activeTab === 'mobile' ? (
                    <ol className="space-y-2 text-[11px] md:text-xs text-slate-600">
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">1.</span>
                        <span>Login to Mandiri Mobile app</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">2.</span>
                        <span>Select "Bayar" → "Multipayment"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">3.</span>
                        <span>Pilih "Omah Turu" sebagai penyedia layanan</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">4.</span>
                        <span>Enter VA: <strong className="font-mono text-[10px] md:text-xs">{vaNumber}</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">5.</span>
                        <span>Confirm and complete payment</span>
                      </li>
                    </ol>
                  ) : (
                    <ol className="space-y-2 text-[11px] md:text-xs text-slate-600">
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">1.</span>
                        <span>Insert ATM card and enter PIN</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">2.</span>
                        <span>Select "Bayar/Beli" → "Multipayment"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">3.</span>
                        <span>Enter company code: <strong>70012</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">4.</span>
                        <span>Enter VA: <strong className="font-mono text-[10px] md:text-xs">{vaNumber}</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#BC8F48] shrink-0">5.</span>
                        <span>Confirm payment and complete</span>
                      </li>
                    </ol>
                  )}
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-3 md:p-4 flex gap-3">
              <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="text-[10px] md:text-xs text-blue-900">
                <p className="font-bold mb-1">Important</p>
                <ul className="space-y-0.5 text-blue-800">
                  <li>• Auto-verified within 5-10 minutes</li>
                  <li>• Confirmation sent via email</li>
                  <li>• VA expires in 24 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6 sticky top-4 md:top-8">
              <h3 className="text-sm font-serif font-bold text-slate-800 mb-3 md:mb-4 pb-3 border-b border-slate-100">Booking Summary</h3>
              <div className="space-y-3 text-xs mb-4 md:mb-6">
                <div>
                  <p className="text-slate-400 text-[8px] md:text-[9px] uppercase tracking-wider mb-1">Property</p>
                  <p className="font-bold text-slate-800 text-sm">{villa.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[8px] md:text-[9px] uppercase tracking-wider mb-1">Suite</p>
                  <p className="font-bold text-slate-800 text-sm">{suite.name}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-slate-400 text-[8px] md:text-[9px] uppercase tracking-wider mb-1">Total</p>
                  <p className="text-xl md:text-2xl font-bold text-[#BC8F48]">${total.toLocaleString()}</p>
                  <p className="text-[8px] md:text-[9px] text-slate-400 mt-0.5">Tax included</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b border-slate-100">
                <p className="text-[8px] md:text-[9px] text-slate-400 uppercase tracking-wider mb-2">Payment Method</p>
                <div className="flex gap-2 opacity-40">
                  <CreditCard size={18} className="text-slate-400" />
                  <CreditCard size={18} className="text-slate-400" />
                  <CreditCard size={18} className="text-slate-400" />
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={onComplete}
                className="w-full bg-[#BC8F48] text-white py-3.5 md:py-4 rounded-xl font-bold text-xs hover:bg-[#A67B3D] transition-all shadow-lg shadow-[#BC8F48]/20 uppercase tracking-widest active:scale-95"
              >
                I Have Paid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
