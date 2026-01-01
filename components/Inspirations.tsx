
import React from 'react';
import { INSPIRATIONS } from '../constants/villas';
import { ArrowRight } from 'lucide-react';

const Inspirations: React.FC = () => {
  const socialImages = [
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600"
  ];

  return (
    <section className="py-16 md:py-32 bg-[#FDFBF7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-serif text-[#4A3426] mb-4 md:mb-6">Inspirasi</h2>
            <div className="w-16 md:w-24 h-1 bg-[#4A3426]/20 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {INSPIRATIONS.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-[3rem] mb-4 md:mb-8 shadow-xl md:shadow-2xl">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 left-4 md:top-8 md:left-8">
                  <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-[0.2em] md:tracking-[0.3em]">{item.location}</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4A3426] mb-2 md:mb-4 group-hover:text-[#BC8F48] transition-colors">{item.title}</h3>
              <p className="text-[#8D6E63] text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3 italic">
                {item.excerpt}
              </p>
              <button className="flex items-center gap-2 text-[#BC8F48] font-bold text-[10px] md:text-xs uppercase tracking-widest">
                Baca Selengkapnya <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Social / Instagram Style Grid */}
        <div className="mt-16 md:mt-40 border-t border-[#8D6E63]/20 pt-12 md:pt-32 text-center">
            <h3 className="text-2xl md:text-3xl font-serif text-[#4A3426] mb-6 md:mb-12">#omahturujoglo</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
                {socialImages.map((src, i) => (
                    <div key={i} className="aspect-square bg-slate-50 rounded-xl md:rounded-3xl overflow-hidden hover:opacity-90 transition-all cursor-pointer shadow-sm group relative">
                        <img 
                            src={src} 
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                            alt={`Social Feed ${i + 1}`}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                 <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white"></div>
                              </div>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-8 md:mt-12 text-[#8D6E63] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] hover:text-[#4A3426] transition-colors">
                Ikuti perjalanan kami
            </button>
        </div>
      </div>
    </section>
  );
};

export default Inspirations;
