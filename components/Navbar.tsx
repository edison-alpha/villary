
import React from 'react';
import { Search, Heart, LogIn, ShoppingBag } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onBookNow?: () => void;
  onSignIn?: () => void;
  user: UserType | null;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, onBookNow, onSignIn, user }) => {
  const isDark = currentPage !== 'home';

  const scrollTo = (id: string) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className={`${isDark ? 'relative bg-[#FDFBF7]/90 backdrop-blur-xl border-b border-[#8D6E63]/10 shadow-sm sticky top-0' : 'absolute top-0 left-0 right-0'} z-[100] px-4 md:px-12 py-3 md:py-4 flex items-center justify-between transition-all duration-500`}
      style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + ${isDark ? '12px' : '12px'})` }}
    >
      {/* Logo & Brand */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <img 
            src="/assets/brand.png" 
            alt="Omah Turu" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>

        {/* Desktop Links */}
        <div className={`hidden xl:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-[#8D6E63]' : 'text-white/60'}`}>
          <button onClick={() => scrollTo('experience')} className="hover:text-[#4A3426] transition-colors">The Estate</button>
          <button onClick={() => scrollTo('spaces')} className="hover:text-[#4A3426] transition-colors">Spaces</button>
          <button className="hover:text-[#4A3426] transition-colors">FAQ</button>
          <button className="hover:text-[#4A3426] transition-colors">Contact</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`hidden md:flex flex-grow max-w-md mx-12 relative group`}>
        <input 
          type="text" 
          placeholder="Search sanctuaries..." 
          className={`w-full py-2.5 pl-12 pr-4 rounded-full border text-sm transition-all outline-none ${
            isDark 
            ? 'bg-white border-[#8D6E63]/20 focus:bg-white focus:border-[#BC8F48]' 
            : 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20'
          }`}
        />
        <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#8D6E63]' : 'text-white/40'}`} />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className={`hidden sm:flex items-center gap-4 ${isDark ? 'text-[#8D6E63]' : 'text-white/30'}`}>
          <button className="hover:text-[#BC8F48] transition-colors"><Heart size={20} /></button>
          <div className="w-px h-6 bg-current opacity-20"></div>
        </div>

        {user ? (
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => onNavigate('profile')}
          >
            <div className="text-right hidden sm:block">
              <p className={`text-[11px] font-bold ${isDark ? 'text-[#4A3426]' : 'text-white'}`}>{user.firstName} {user.lastName}</p>
              <p className="text-[9px] font-medium text-[#BC8F48] uppercase tracking-widest">{user.points} Points</p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#BC8F48] overflow-hidden p-0.5 group-hover:scale-105 transition-transform">
              <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        ) : (
          <button 
            onClick={onSignIn}
            className={`hidden sm:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full border transition-all ${isDark ? 'border-[#BC8F48] text-[#BC8F48] hover:bg-[#BC8F48] hover:text-white' : 'border-white text-white hover:bg-white hover:text-[#4A3426]'}`}
          >
            <LogIn size={16} /> Sign In
          </button>
        )}
        
        {/* Cart Icon - Mobile */}
        <button 
          onClick={() => onNavigate('checkout-rooms')}
          className={`lg:hidden relative p-2 rounded-full transition-all ${
            isDark ? 'text-[#4A3426] hover:bg-[#8D6E63]/10' : 'text-white hover:bg-white/10'
          }`}
        >
          <ShoppingBag size={22} />
          {/* Cart badge */}
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#BC8F48] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
