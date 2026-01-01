
import React, { useState } from 'react';
import { ALL_VILLAS } from '../constants/villas';
import VillaCard from './VillaCard';

interface StunningLocationsProps {
  onSelectVilla: (id: string) => void;
}

const StunningLocations: React.FC<StunningLocationsProps> = ({ onSelectVilla }) => {
  const filters = ['Coastal', 'Mountain', 'Countryside', 'Desert', 'Tropical', 'Urban'];
  const [activeFilter, setActiveFilter] = useState('Coastal');

  // Take first 3 for the home page section
  const locations = ALL_VILLAS.slice(0, 3);

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20">
        <div>
          <h2 className="text-4xl font-serif text-[#0d5c63] mb-6">Sail to the World's Most <br /> Stunning Locations</h2>
          <p className="text-slate-500 max-w-lg leading-relaxed">
            From Mediterranean paradises to the peaks of the Swiss Alps, our hand-selected villas are checked for 200+ quality points.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 bg-slate-50 p-2 rounded-full border border-slate-100">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                activeFilter === filter 
                ? 'bg-white text-[#0d5c63] shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((loc) => (
          <VillaCard key={loc.id} villa={loc} onClick={onSelectVilla} />
        ))}
      </div>
    </section>
  );
};

export default StunningLocations;
