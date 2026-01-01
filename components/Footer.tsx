
import React from 'react';
import { Instagram, Twitter, Linkedin, Youtube, ArrowRight, Target } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-32">
      {/* Begin Your Journey CTA - Large Magazine Style */}
      <div className="container mx-auto px-6 mb-32">
        <div className="relative text-center">
            <h2 className="text-[6rem] md:text-[14rem] font-serif text-[#0d5c63] leading-none tracking-tighter mb-12">
                Begin Your <br /> Journey <span className="inline-block translate-y-4 md:translate-y-8"><Target size={120} className="text-[#0d5c63]/20" /></span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <button className="bg-[#0d5c63] text-white px-16 py-6 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all">
                    Check Availability
                </button>
                <button className="text-slate-800 px-16 py-6 rounded-full font-bold text-xl border border-slate-200 hover:bg-slate-50 transition-all">
                    Contact Estate Manager
                </button>
            </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="bg-slate-50 pt-24 pb-12 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1">
              <h3 className="text-3xl font-serif font-bold text-[#0d5c63] mb-8">Villays</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
                  Your portal to the most exclusive private sanctuary on the Amalfi Coast. Architectural beauty meets unparalleled service.
              </p>
              <div className="flex gap-4">
                  {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                      <a key={i} href="#" className="p-3 rounded-full border border-slate-200 text-slate-400 hover:text-[#0d5c63] hover:border-[#0d5c63] transition-all">
                          <Icon size={18} />
                      </a>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-8 uppercase tracking-widest text-[10px]">Important Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-[#0d5c63]">The Estate</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Our Mission</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Sustainability</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-8 uppercase tracking-widest text-[10px]">Support</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-[#0d5c63]">FAQs</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#0d5c63]">Cookies</a></li>
              </ul>
            </div>

            <div>
               <h4 className="font-bold text-slate-800 mb-8 uppercase tracking-widest text-[10px]">Stay Inspired</h4>
               <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Subscribe for updates on exclusive seasonal events and menu drops at Villays.
               </p>
               <div className="relative">
                  <input type="email" placeholder="Email address" className="w-full bg-white border border-slate-200 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-[#0d5c63] transition-all" />
                  <button className="absolute right-2 top-2 bg-[#0d5c63] p-2 rounded-full text-white hover:scale-110 transition-all">
                      <ArrowRight size={20} />
                  </button>
               </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 border-t border-slate-200 text-slate-400 text-[10px] uppercase tracking-widest">
              <p>Copyright 2025 © Villays Estate. All Rights Reserved</p>
              <div className="flex gap-12">
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
