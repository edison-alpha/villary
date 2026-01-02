
import React from 'react';
import { Star } from 'lucide-react';
import { Villa } from '../types';

interface VillaCardProps {
  villa: Villa;
  onClick: (id: string) => void;
}

const VillaCard: React.FC<VillaCardProps> = ({ villa, onClick }) => {
  return (
    <div 
      onClick={() => onClick(villa.id)}
      className="relative group w-full aspect-[4/5] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[#BC8F48]/20"
    >
      {/* Full Bleed Image */}
      <img 
        src={villa.image} 
        alt={villa.name} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      {/* Dark Overlay Wrapper */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>

      {/* Prime Pick Badge */}
      <div className="absolute top-8 left-8 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
        <Star size={16} className="fill-yellow-400 text-yellow-400" />
        <span className="text-slate-800 text-xs font-bold font-sans">Pilihan Utama</span>
      </div>

      {/* Content Container */}
      <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col gap-6">
        {/* Price & Location Section */}
        <div className="flex justify-between items-end gap-4">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Rp {villa.price.toLocaleString('id-ID')}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-[200px]">
              {villa.name}...<br />
              {villa.location}
            </p>
          </div>
          
          {/* Stats Section */}
          <div className="flex gap-6 items-center border-l border-white/20 pl-6 h-12 shrink-0">
            <div className="text-center">
              <p className="text-white font-bold text-lg">{villa.livingArea} m²</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Luas</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{villa.bedrooms}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Kamar</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10"></div>

        {/* Footer */}
        <div className="flex items-center justify-between text-white/50 text-xs font-medium">
          <div className="flex items-center gap-1">
            <span>By</span>
            <span className="text-white underline decoration-white/30 underline-offset-4">{villa.curator}</span>
          </div>
          <span>{villa.postedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default VillaCard;
