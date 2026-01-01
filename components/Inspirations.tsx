
import React from 'react';
import { INSPIRATIONS } from '../constants/villas';
import { ArrowRight } from 'lucide-react';

const Inspirations: React.FC = () => {
  // Curated, high-reliability luxury hospitality images from Unsplash
  const socialImages = [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600"
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className="text-5xl font-serif text-[#0d5c63] mb-6">Inspirations</h2>
            <div className="w-24 h-1 bg-[#0d5c63]/20 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {INSPIRATIONS.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] mb-8 shadow-2xl">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-8 left-8">
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">{item.location}</span>
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-800 mb-4 group-hover:text-[#0d5c63] transition-colors">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 italic">
                {item.excerpt}
              </p>
              <button className="flex items-center gap-2 text-[#0d5c63] font-bold text-xs uppercase tracking-widest">
                Read Article <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Social / Instagram Style Grid - Clean Layout */}
        <div className="mt-40 border-t border-slate-100 pt-32 text-center">
            <h3 className="text-3xl font-serif text-slate-800 mb-12">#villaysluxury</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {socialImages.map((src, i) => (
                    <div key={i} className="aspect-square bg-slate-50 rounded-3xl overflow-hidden hover:opacity-90 transition-all cursor-pointer shadow-sm group relative">
                        <img 
                            src={src} 
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                            alt={`Social Feed ${i + 1}`}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                 <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                              </div>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-12 text-slate-400 font-bold text-xs uppercase tracking-[0.3em] hover:text-[#0d5c63] transition-colors">
                Follow our journey
            </button>
        </div>
      </div>
    </section>
  );
};

export default Inspirations;
