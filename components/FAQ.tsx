
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    { q: "Apa saja yang termasuk dalam harga?", a: "Harga sudah termasuk sarapan tradisional Jawa, welcome drink jamu, akses kolam renang, WiFi, dan parkir gratis. Layanan tambahan seperti spa dan tur wisata tersedia dengan biaya terpisah." },
    { q: "Bagaimana cara menuju Omah Turu?", a: "Omah Turu terletak di Area Hutan, Gondosuli, Tawangmangu. Sekitar 1,5 jam dari Bandara Adi Soemarmo Solo dan 1 jam dari Kota Solo. Kami menyediakan layanan penjemputan dengan biaya tambahan." },
    { q: "Kapan waktu terbaik untuk berkunjung?", a: "Tawangmangu sejuk sepanjang tahun! Musim kemarau (April-Oktober) ideal untuk trekking dan melihat sunrise di Gunung Lawu. Suhu rata-rata 18-25°C, sangat nyaman untuk beristirahat." },
    { q: "Apakah cocok untuk keluarga dengan anak?", a: "Sangat cocok! Kami menyediakan area bermain anak, kolam renang yang aman, dan aktivitas seperti berkebun dan mengenal tanaman hutan. Udara sejuk pegunungan sangat baik untuk kesehatan." },
  ];

  return (
    <section className="py-16 md:py-32 container mx-auto px-4 md:px-6">
      <div className="mb-10 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-serif text-[#4A3426] text-center mb-4">Pertanyaan Umum</h2>
          <div className="w-16 md:w-24 h-1 bg-[#4A3426]/20 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
        <div className="relative group order-2 lg:order-1">
            <div className="rounded-2xl md:rounded-[4rem] overflow-hidden shadow-xl md:shadow-2xl aspect-square">
                <img 
                    src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1200" 
                    alt="Suasana di Omah Turu" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-[#4A3426] p-6 md:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl hidden sm:block max-w-[280px] md:max-w-[320px]">
                <p className="text-white/80 text-xs md:text-sm italic mb-3 md:mb-4 leading-relaxed">"Pengalaman menginap di joglo autentik yang luar biasa. Udara sejuk Tawangmangu dan pemandangan Gunung Lawu di pagi hari sungguh memukau!"</p>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20"></div>
                    <div>
                        <p className="font-bold text-white text-xs md:text-sm">Budi Santoso</p>
                        <p className="text-[10px] md:text-xs text-white/40">Tamu Setia</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="group">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className={`w-full py-4 md:py-6 flex items-center justify-between text-left border-b border-slate-100 group-hover:border-[#4A3426]/30 transition-all ${openIdx === idx ? 'border-[#4A3426]' : ''}`}
              >
                <span className={`text-base md:text-xl font-serif font-bold pr-4 ${openIdx === idx ? 'text-[#4A3426]' : 'text-slate-800'}`}>
                  <span className="text-slate-300 mr-3 md:mr-6 font-sans text-xs md:text-sm font-light">0{idx + 1}</span>
                  {faq.q}
                </span>
                <div className={`transition-all shrink-0 ${openIdx === idx ? 'rotate-180 text-[#4A3426]' : 'text-slate-300'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIdx === idx ? 'max-h-40 opacity-100 py-4 md:py-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-500 leading-relaxed max-w-lg pl-8 md:pl-12 text-sm md:text-base">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
