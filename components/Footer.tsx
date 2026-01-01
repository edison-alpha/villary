
import React from 'react';
import { Instagram, Twitter, Linkedin, Youtube, ArrowRight, Target } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-16 md:pt-32">
      {/* Begin Your Journey CTA - Mobile Optimized */}
      <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-32">
        <div className="relative text-center">
            <h2 className="text-[3rem] sm:text-[4rem] md:text-[8rem] lg:text-[14rem] font-serif text-[#0d5c63] leading-none tracking-tighter mb-6 md:mb-12">
                Begin Your <br /> Journey <span className="hidden md:inline-block translate-y-4 md:translate-y-8"><Target size={80} className="text-[#0d5c63]/20 md:w-[120px] md:h-[120px]" /></span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
                <button className="w-full sm:w-auto bg-[#0d5c63] text-white px-8 md:px-16 py-4 md:py-6 rounded-full font-bold text-base md:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    Check Availability
                </button>
                <button className="w-full sm:w-auto text-slate-800 px-8 md:px-16 py-4 md:py-6 rounded-full font-bold text-base md:text-xl border border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-all">
                    Contact Estate Manager
                </button>
            </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="bg-slate-50 pt-12 md:pt-24 pb-8 md:pb-12 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-12 md:mb-24">
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0d5c63] mb-4 md:mb-8">Villays</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6 md:mb-8">
                  Your portal to the most exclusive private sanctuary on the Amalfi Coast. Architectural beauty meets unparalleled service.
              </p>
              <div className="flex gap-3 md:gap-4">
                  {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                      <a key={i} href="#" className="p-2.5 md:p-3 rounded-full border border-slate-200 text-slate-400 hover:text-[#0d5c63] hover:border-[#0d5c63] transition-all">
                          <Icon size={16} />
                      </a>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4 md:mb-8 uppercase tracking-widest text-[10px]">Important Links</h4>
              <ul className="space-y-3 md:space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-[#0d5c63]">The Estate</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Our Mission</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Sustainability</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4 md:mb-8 uppercase tracking-widest text-[10px]">Support</h4>
              <ul className="space-y-3 md:space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-[#0d5c63]">FAQs</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Cookies</a></li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
               <h4 className="font-bold text-slate-800 mb-4 md:mb-8 uppercase tracking-widest text-[10px]">Stay Inspired</h4>
               <p className="text-slate-400 text-xs leading-relaxed mb-4 md:mb-6">
                  Subscribe for updates on exclusive seasonal events and menu drops at Villays.
               </p>
               <div className="relative">
                  <input type="email" placeholder="Email address" className="w-full bg-white border border-slate-200 rounded-full px-4 md:px-6 py-3 md:py-4 text-sm focus:outline-none focus:border-[#0d5c63] transition-all" />
                  <button className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bg-[#0d5c63] p-2 rounded-full text-white hover:scale-110 active:scale-95 transition-all">
                      <ArrowRight size={18} />
                  </button>
               </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 md:pt-12 border-t border-slate-200 text-slate-400 text-[9px] md:text-[10px] uppercase tracking-widest">
              <p className="text-center md:text-left">Copyright 2025 © Villays Estate. All Rights Reserved</p>
              <div className="flex gap-6 md:gap-12">
                  <a href="#" className="hover:text-[#0d5c63]">Privacy Policy</a>
                  <a href="#" className="hover:text-[#0d5c63]">Terms of Service</a>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
