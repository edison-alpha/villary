
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const SignatureCollection: React.FC = () => {
  const spaces = [
    { name: "The Shore Suite", image: "https://images.unsplash.com/photo-1590392847226-d98ec8dd7ca2?auto=format&fit=crop&q=80&w=800" },
    { name: "Infinity Horizon", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" },
    { name: "Grand Atrium", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-serif text-[#0d5c63] mb-6">Discover Our <br /> Signature Spaces</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Every corner of Villays has been meticulously curated to offer an unparalleled sense of luxury and privacy.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
             <button className="p-4 rounded-full border border-slate-200 text-slate-400 hover:bg-[#0d5c63] hover:text-white transition-all">
                <ArrowUpRight size={24} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaces.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] mb-6">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-800">{item.name}</h3>
              <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-semibold">Flagship Space</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;
