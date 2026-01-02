
import React, { useState } from 'react';
import { Star, MapPin, User, Eye, EyeOff, Calendar, Clock, Info } from 'lucide-react';
import { Villa, Suite, User as UserType } from '../types';

interface CheckoutDetailsPageProps {
  villa: Villa;
  suite: Suite;
  arrivalDate: Date;
  departureDate: Date;
  onBack: () => void;
  onComplete: () => void;
  onNavigateAuth?: (type: 'signin' | 'signup') => void;
  user?: UserType | null;
}

const CheckoutDetailsPage: React.FC<CheckoutDetailsPageProps> = ({ 
  villa, 
  suite, 
  arrivalDate, 
  departureDate, 
  onBack, 
  onComplete, 
  onNavigateAuth,
  user 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const calculateNights = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(arrivalDate, departureDate);
  const total = suite.basePrice * nights;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 md:pb-40">
      {/* Progress Step Indicator */}
      <div className="bg-white border-b border-slate-100 py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex items-center justify-center gap-6 md:gap-24">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold bg-green-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] hidden sm:block text-slate-400">Suites</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold bg-[#BC8F48] text-white shadow-lg shadow-[#BC8F48]/20">2</div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] hidden sm:block text-[#BC8F48]">Details</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-400">3</div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] hidden sm:block text-slate-300">Final</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-6 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
          
          {/* LEFT COLUMN: FORM & DETAILS */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Sign In Banner - Only show if not logged in */}
            {!user && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center gap-6 shadow-sm">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#BC8F48]">
                  <User size={24} />
                </div>
                <p className="text-sm text-slate-600 flex-grow">
                  To book with your saved details, please <button onClick={() => onNavigateAuth?.('signin')} className="font-bold text-[#BC8F48] underline">SIGN IN</button> or <button onClick={() => onNavigateAuth?.('signup')} className="font-bold text-[#BC8F48] underline">CREATE AN ACCOUNT</button>
                </p>
              </div>
            )}

            {/* Welcome Back Banner - Show if logged in */}
            {user && (
              <div className="bg-[#BC8F48]/5 p-6 rounded-3xl border border-[#BC8F48]/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#BC8F48]">
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Welcome back, {user.firstName}!</p>
                  <p className="text-xs text-slate-500">Booking with your saved details</p>
                </div>
              </div>
            )}

            {/* Personal Details Form */}
            <section className="bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-serif text-slate-800 mb-8">Data Pribadi</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Title</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48] appearance-none cursor-pointer">
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                    <option>Dr.</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">First name*</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48]" placeholder="e.g. John" />
                </div>

                <div className="flex flex-col">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Last name*</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48]" placeholder="e.g. Doe" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email address*</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48]" placeholder="email@example.com" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Country*</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48] appearance-none">
                    <option>Indonesia</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Singapore</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div className="flex gap-4 items-end">
                  <div className="w-24 shrink-0">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Prefix</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-[#BC8F48]" placeholder="ID +62" />
                  </div>
                  <div className="flex-grow">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number*</label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48]" placeholder="e.g. 812 3456 789" />
                  </div>
                </div>

                <div className="md:col-span-2 relative">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password*</label>
                  <input type={showPassword ? "text" : "password"} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48]" placeholder="Minimum 8 characters" />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-[42px] text-slate-400 hover:text-[#BC8F48]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <input type="checkbox" id="bookingForSomeone" className="w-5 h-5 rounded border-slate-300 text-[#BC8F48] focus:ring-[#BC8F48]" />
                <label htmlFor="bookingForSomeone" className="text-sm text-slate-600 font-medium">Saya memesan untuk orang lain</label>
              </div>
            </section>

            {/* Special Requests Section */}
            <section className="bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-serif text-slate-800 mb-4">Permintaan Khusus</h2>
              <p className="text-slate-400 text-sm mb-8">Silakan beritahu kami permintaan tambahan untuk memastikan Anda menginap dengan nyaman</p>
              <textarea 
                className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-sm focus:outline-none focus:border-[#BC8F48] min-h-[150px]"
                placeholder="Ketik permintaan khusus Anda dan kami akan berusaha memenuhinya."
              ></textarea>
            </section>

            {/* Action Button */}
            <button 
              onClick={onComplete}
              className="w-full bg-[#BC8F48] text-white py-6 rounded-2xl font-bold text-lg hover:bg-[#A67B3D] transition-all shadow-2xl shadow-[#BC8F48]/20 uppercase tracking-widest"
            >
              Lanjut ke Langkah Terakhir
            </button>
          </div>

          {/* RIGHT COLUMN: STICKY SUMMARY */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-10">
                <h3 className="text-xl font-serif font-bold text-slate-800 mb-8 border-b border-slate-50 pb-6">Ringkasan Pemesanan</h3>
                
                <div className="flex flex-col items-center mb-10">
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-[#BC8F48] text-[#BC8F48]" />)}
                  </div>
                  <h4 className="text-2xl font-serif text-[#BC8F48] text-center">{villa.name}</h4>
                  <p className="flex items-center gap-1 text-[10px] text-slate-400 uppercase tracking-widest mt-2 font-bold">
                    <MapPin size={10} /> {villa.location}
                  </p>
                </div>

                <div className="space-y-6 mb-10 bg-slate-50 p-8 rounded-3xl">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1">
                        <Calendar size={10} /> Check in
                      </span>
                      <span className="font-bold text-slate-800">{formatDate(arrivalDate)}</span>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1 justify-end">
                        <Calendar size={10} /> Check out
                      </span>
                      <span className="font-bold text-slate-800">{formatDate(departureDate)}</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Durasi</span>
                    <span className="font-bold text-slate-800">{nights} Malam</span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="flex flex-col gap-2">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Tipe Kamar</p>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800">{suite.name}</p>
                        <p className="text-[10px] text-slate-500 italic mt-0.5">{suite.view}</p>
                      </div>
                      <span className="font-bold text-slate-800">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                      <Clock size={12} /> Pembatalan gratis tersedia
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-end">
                    <div>
                      <h5 className="text-lg font-serif text-slate-800 font-bold">Total</h5>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">(Termasuk pajak)</p>
                    </div>
                    <span className="text-3xl font-serif font-bold text-[#BC8F48]">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <Info size={14} className="text-[#BC8F48]" />
                  <span>Mata Uang: Rupiah (IDR)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsPage;
