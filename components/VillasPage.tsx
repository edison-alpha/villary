
import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { ALL_VILLAS } from '../constants/villas';
import VillaCard from './VillaCard';

interface VillasPageProps {
  onSelectVilla: (id: string) => void;
}

const VillasPage: React.FC<VillasPageProps> = ({ onSelectVilla }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Coastal', 'Mountain', 'Countryside', 'Desert', 'Tropical', 'Urban'];

  const filteredVillas = useMemo(() => {
    return ALL_VILLAS.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           v.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || v.tags.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-20 px-6">
        <div className="container mx-auto text-center md:text-left">
          <h1 className="text-6xl font-serif text-[#0d5c63] mb-6">Our Collection</h1>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed mx-auto md:mx-0">
            Browse our hand-picked selection of the world's most exclusive properties. 
            Each villa is vetted for exceptional design and superior service.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-6 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or destination..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#0d5c63] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
            <div className="flex items-center gap-2 pr-4 border-r border-slate-200 mr-2 shrink-0">
                <Filter size={18} className="text-[#0d5c63]" />
                <span className="text-sm font-bold text-slate-700">Filters:</span>
            </div>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeFilter === f 
                  ? 'bg-[#0d5c63] text-white shadow-lg shadow-[#0d5c63]/20' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-6 py-12">
        {filteredVillas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredVillas.map((loc) => (
                <VillaCard key={loc.id} villa={loc} onClick={onSelectVilla} />
            ))}
            </div>
        ) : (
            <div className="text-center py-40 bg-slate-50 rounded-[4rem]">
                <h3 className="text-2xl font-serif text-slate-700 mb-2">No properties match your search</h3>
                <button 
                    onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
                    className="mt-8 text-[#0d5c63] font-bold border-b-2 border-[#0d5c63]"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default VillasPage;
