import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, Users, Maximize, Eye } from 'lucide-react';
import { Suite } from '../types';
import { ALL_VILLAS } from '../constants/villas';

interface FavoriteRoomsPageProps {
  onBack: () => void;
  onViewRoom?: (suite: Suite) => void;
  onBookRoom?: (suite: Suite) => void;
}

const FavoriteRoomsPage: React.FC<FavoriteRoomsPageProps> = ({ onBack, onViewRoom, onBookRoom }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('villays_favorite_rooms');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (suiteId: string) => {
    const newFavorites = favorites.includes(suiteId)
      ? favorites.filter(id => id !== suiteId)
      : [...favorites, suiteId];
    
    setFavorites(newFavorites);
    localStorage.setItem('villays_favorite_rooms', JSON.stringify(newFavorites));
  };

  // Get all suites from all villas
  const allSuites: (Suite & { villaName: string })[] = ALL_VILLAS.flatMap(villa => 
    (villa.suites || []).map(suite => ({
      ...suite,
      villaName: villa.name
    }))
  );

  const favoriteSuites = allSuites.filter(suite => favorites.includes(suite.id));

  return (
    <div className="min-h-screen bg-slate-50 pt-2 md:pt-32 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">Kamar Favorit</h1>
          <div className="w-10"></div>
        </div>

        {favoriteSuites.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={28} className="text-red-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Belum Ada Favorit</h3>
            <p className="text-sm text-slate-500">Simpan kamar favorit Anda dengan menekan ikon hati saat melihat detail kamar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteSuites.map((suite) => (
              <div key={suite.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                {/* Image */}
                <div className="relative h-40">
                  <img 
                    src={suite.image} 
                    alt={suite.name}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => toggleFavorite(suite.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                  >
                    <Heart size={18} className="fill-red-500 text-red-500" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-600">{suite.villaName}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-800">{suite.name}</h3>
                      <p className="text-xs text-slate-500">{suite.view}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} className="fill-amber-500" />
                      <span className="text-xs font-bold">4.9</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Maximize size={14} />
                      <span>{suite.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>2 Tamu</span>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <p className="text-lg font-bold text-[#BC8F48]">
                        Rp {suite.basePrice.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[10px] text-slate-400">per malam</p>
                    </div>
                    <div className="flex gap-2">
                      {onViewRoom && (
                        <button 
                          onClick={() => onViewRoom(suite)}
                          className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium text-slate-600 transition-colors"
                        >
                          <Eye size={14} />
                          Lihat
                        </button>
                      )}
                      {onBookRoom && (
                        <button 
                          onClick={() => onBookRoom(suite)}
                          className="px-4 py-2 bg-[#BC8F48] hover:bg-[#A67B3D] text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          Pesan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info */}
        {favoriteSuites.length > 0 && (
          <p className="text-center text-xs text-slate-400 mt-6">
            {favoriteSuites.length} kamar tersimpan
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoriteRoomsPage;
