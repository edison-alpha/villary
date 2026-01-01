
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const SignatureCollection: React.FC = () => {
  const spaces = [
    { name: "Kamar Taman", image: "https://images.unsplash.com/photo-1590392847226-d98ec8dd7ca2?auto=format&fit=crop&q=80&w=800", desc: "Kamar Nyaman" },
    { name: "Kamar Sawah", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800", desc: "View Sawah" },
    { name: "Joglo Agung", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", desc: "Suite Utama" },
  ];

  return (
    <section className="py-16 md:py-32 bg-[#FDFBF7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-6xl font-serif text-[#4A3426] mb-4 md:mb-6">Pilihan <br /> Kamar Kami</h2>
            <p className="text-[#8D6E63] text-sm md:text-lg leading-relaxed">
              Setiap kamar di Omah Turu dirancang untuk memberikan pengalaman menginap yang autentik dengan kenyamanan modern.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
             <button className="p-3 md:p-4 rounded-full border border-[#8D6E63]/30 text-[#8D6E63] hover:bg-[#BC8F48] hover:border-[#BC8F48] hover:text-white active:scale-95 transition-all">
                <ArrowUpRight size={20} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {spaces.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:rounded-[3rem] mb-4 md:mb-6">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4A3426]">{item.name}</h3>
              <p className="text-[#8D6E63] text-xs md:text-sm mt-1 uppercase tracking-widest font-semibold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;
