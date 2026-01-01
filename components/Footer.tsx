
import React from 'react';
import { Instagram, Twitter, Linkedin, Youtube, ArrowRight, Target } from 'lucide-react';
import brandLogo from '../assets/brand.png';

const Footer: React.FC = () => {
  return (
    <footer className="pt-16 md:pt-32">
      {/* Begin Your Journey CTA - Mobile Optimized */}
      <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-32">
        <div className="relative text-center">
            <h2 className="text-[3rem] sm:text-[4rem] md:text-[8rem] lg:text-[12rem] font-serif text-[#4A3426] leading-none tracking-tighter mb-6 md:mb-12">
                Mulai <br /> Perjalananmu <span className="hidden md:inline-block translate-y-4 md:translate-y-8"><Target size={80} className="text-[#4A3426]/20 md:w-[120px] md:h-[120px]" /></span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
                <button className="w-full sm:w-auto bg-[#BC8F48] text-white px-8 md:px-16 py-4 md:py-6 rounded-full font-bold text-base md:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    Cek Ketersediaan
                </button>
                <button className="w-full sm:w-auto text-[#4A3426] px-8 md:px-16 py-4 md:py-6 rounded-full font-bold text-base md:text-xl border border-[#4A3426]/30 hover:bg-[#4A3426]/5 active:bg-[#4A3426]/10 transition-all">
                    Hubungi Kami
                </button>
            </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="bg-[#F5EDE4] pt-12 md:pt-24 pb-8 md:pb-12 border-t border-[#8D6E63]/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-12 md:mb-24">
            <div className="col-span-2 lg:col-span-1">
              <img src={brandLogo} alt="Omah Turu" className="h-10 md:h-12 w-auto object-contain mb-4 md:mb-8" />
              <p className="text-[#8D6E63] text-sm leading-relaxed max-w-xs mb-6 md:mb-8">
                  Penginapan joglo tradisional di lereng Gunung Lawu, Tawangmangu. Rasakan ketenangan alam pegunungan dengan kenyamanan modern.
              </p>
              <div className="flex gap-3 md:gap-4">
                  {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                      <a key={i} href="#" className="p-2.5 md:p-3 rounded-full border border-[#8D6E63]/30 text-[#8D6E63] hover:text-[#4A3426] hover:border-[#4A3426] transition-all">
                          <Icon size={16} />
                      </a>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#4A3426] mb-4 md:mb-8 uppercase tracking-widest text-[10px]">Tautan</h4>
              <ul className="space-y-3 md:space-y-4 text-[#8D6E63] text-sm">
                  <li><a href="#" className="hover:text-[#4A3426]">Tentang Kami</a></li>
                  <li><a href="#" className="hover:text-[#4A3426]">Kamar</a></li>
                  <li><a href="#" className="hover:text-[#4A3426]">Fasilitas</a></li>
                  <li><a href="#" className="hover:text-[#4A3426]">Galeri</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#4A3426] mb-4 md:mb-8 uppercase tracking-widest text-[10px]">Bantuan</h4>
              <ul className="space-y-3 md:space-y-4 text-[#8D6E63] text-sm">
                  <li><a href="#" className="hover:text-[#4A3426]">FAQ</a></li>
                  <li><a href="#" className="hover:text-[#4A3426]">Cara Pemesanan</a></li>
                  <li><a href="#" className="hover:text-[#4A3426]">Kebijakan Privasi</a></li>
                  <li><a href="#" className="hover:text-[#4A3426]">Syarat & Ketentuan</a></li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
               <h4 className="font-bold text-[#4A3426] mb-4 md:mb-8 uppercase tracking-widest text-[10px]">Tetap Terhubung</h4>
               <p className="text-[#8D6E63] text-xs leading-relaxed mb-4 md:mb-6">
                  Dapatkan info promo dan acara spesial di Omah Turu langsung ke email Anda.
               </p>
               <div className="relative">
                  <input type="email" placeholder="Alamat email" className="w-full bg-white border border-[#8D6E63]/30 rounded-full px-4 md:px-6 py-3 md:py-4 text-sm focus:outline-none focus:border-[#4A3426] transition-all" />
                  <button className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bg-[#BC8F48] p-2 rounded-full text-white hover:scale-110 active:scale-95 transition-all">
                      <ArrowRight size={18} />
                  </button>
               </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 md:pt-12 border-t border-[#8D6E63]/20 text-[#8D6E63] text-[9px] md:text-[10px] uppercase tracking-widest">
              <p className="text-center md:text-left">Hak Cipta 2025 © Omah Turu Joglo. Semua Hak Dilindungi</p>
              <div className="flex gap-6 md:gap-12">
                  <a href="#" className="hover:text-[#4A3426]">Kebijakan Privasi</a>
                  <a href="#" className="hover:text-[#4A3426]">Syarat Layanan</a>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
