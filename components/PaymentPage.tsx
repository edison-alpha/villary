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
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [activeTab, setActiveTab] = useState<'atm' | 'mobile'>('mobile');
  
  // Generate VA number (dummy)
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
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Progress Step Indicator - Compact */}
      <div className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-green-500 text-white">
                <Check size={14} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider hidden md:block text-slate-400">Suites</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-green-500 text-white">
                <Check size={14} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider hidden md:block text-slate-400">Details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#0d5c63] text-white shadow-lg shadow-[#0d5c63]/20">3</div>
              <span className="text-[9px] font-bold uppercase tracking-wider hidden md:block text-[#0d5c63]">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-[#0d5c63] mb-6 text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <ChevronLeft size={14} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Payment Method - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer Warning - Compact */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
              <Clock size={20} className="text-amber-600 shrink-0" />
              <div className="flex-grow">
                <p className="text-xs font-bold text-amber-900">Complete within</p>
                <p className="text-xl font-mono font-bold text-amber-600">{formatTime(timeLeft)}</p>
              </div>
            </div>

            {/* Mandiri VA Card - Compact */}
            <div className="bg-gradient-to-br from-[#003d7a] to-[#0052a3] rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[9px] uppercase tracking-widest opacity-70 mb-1">Bank Transfer</p>
                  <h3 className="text-xl font-bold">Virtual Account</h3>
                </div>
                <div className="bg-white rounded-lg px-4 py-2">
                  <img 
                    src="/assets/01-Mandiri Master Brand Logo.png" 
                    alt="Bank Mandiri" 
                    className="h-6 object-contain"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-logo')) {
                        parent.innerHTML = '<div class="fallback-logo font-bold text-lg text-[#003d7a]">MANDIRI</div>';
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] uppercase tracking-widest opacity-60 mb-2">Virtual Account Number</p>
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                    <p className="text-2xl font-mono font-bold tracking-wider flex-grow">{vaNumber}</p>
                    <button 
                      onClick={copyToClipboard}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all shrink-0"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-white/20">
                  <p className="text-[9px] uppercase tracking-widest opacity-60 mb-1">Total Payment</p>
                  <p className="text-2xl font-bold">USD ${total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Payment Instructions - Compact Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-serif text-slate-800 font-bold mb-4">How to Pay</h3>
                
                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={() => setActiveTab('mobile')}
                    className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === 'mobile' 
                        ? 'bg-[#0d5c63] text-white' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    Mobile Banking
                  </button>
                  <button 
                    onClick={() => setActiveTab('atm')}
                    className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === 'atm' 
                        ? 'bg-[#0d5c63] text-white' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    ATM
                  </button>
                </div>

                {/* Tab Content */}
                <div className="bg-slate-50 rounded-xl p-4">
                  {activeTab === 'mobile' ? (
                    <ol className="space-y-2 text-xs text-slate-600">
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">1.</span>
                        <span>Login to Mandiri Mobile app</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">2.</span>
                        <span>Select "Bayar" → "Multipayment"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">3.</span>
                        <span>Select "Villays" as service provider</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">4.</span>
                        <span>Enter VA: <strong className="font-mono">{vaNumber}</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">5.</span>
                        <span>Confirm and complete payment</span>
                      </li>
                    </ol>
                  ) : (
                    <ol className="space-y-2 text-xs text-slate-600">
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">1.</span>
                        <span>Insert ATM card and enter PIN</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">2.</span>
                        <span>Select "Bayar/Beli" → "Multipayment"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">3.</span>
                        <span>Enter company code: <strong>70012</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">4.</span>
                        <span>Enter VA: <strong className="font-mono">{vaNumber}</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[#0d5c63] shrink-0">5.</span>
                        <span>Confirm payment and complete</span>
                      </li>
                    </ol>
                  )}
                </div>
              </div>
            </div>

            {/* Info Box - Compact */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
              <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900">
                <p className="font-bold mb-1">Important</p>
                <ul className="space-y-0.5 text-blue-800">
                  <li>• Auto-verified within 5-10 minutes</li>
                  <li>• Confirmation sent via email</li>
                  <li>• VA expires in 24 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Summary - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-8">
              <h3 className="text-sm font-serif font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">Booking Summary</h3>
              <div className="space-y-3 text-xs mb-6">
                <div>
                  <p className="text-slate-400 text-[9px] uppercase tracking-wider mb-1">Property</p>
                  <p className="font-bold text-slate-800">{villa.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[9px] uppercase tracking-wider mb-1">Suite</p>
                  <p className="font-bold text-slate-800">{suite.name}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-slate-400 text-[9px] uppercase tracking-wider mb-1">Total</p>
                  <p className="text-2xl font-bold text-[#0d5c63]">${total.toLocaleString()}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Tax included</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-2">Payment Method</p>
                <div className="flex gap-2 opacity-40">
                  <CreditCard size={20} className="text-slate-400" />
                  <CreditCard size={20} className="text-slate-400" />
                  <CreditCard size={20} className="text-slate-400" />
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={onComplete}
                className="w-full bg-[#0d5c63] text-white py-4 rounded-xl font-bold text-xs hover:bg-[#0a4a50] transition-all shadow-lg shadow-[#0d5c63]/20 uppercase tracking-widest"
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
