import React from 'react';
import { Home, Search, Calendar, MessageCircle, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearch?: () => void;
  onChat?: () => void;
  userAvatar?: string;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  currentPage, 
  onNavigate, 
  onSearch,
  onChat,
  userAvatar 
}) => {
  const isActive = (page: string) => currentPage === page;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden safe-bottom">
      <div className="mx-3 mb-3">
        {/* Theme-matched container with teal/dark gradient */}
        <div className="backdrop-blur-2xl rounded-[2rem] px-3 py-2.5 flex items-center justify-between border border-[#0d5c63]/30"
          style={{
            background: 'linear-gradient(135deg, rgba(13,92,99,0.85) 0%, rgba(10,74,80,0.95) 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)'
          }}
        >
          {/* Home */}
          <button 
            onClick={() => onNavigate('home')}
            className={`relative flex items-center justify-center transition-all duration-300 ${
              isActive('home') 
                ? 'bg-white/20 backdrop-blur-xl rounded-2xl px-5 py-3' 
                : 'p-3 hover:bg-white/10 rounded-xl'
            }`}
            style={isActive('home') ? {
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.2)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)'
            } : {}}
          >
            <Home 
              size={22} 
              className={isActive('home') ? 'text-white' : 'text-white/70'} 
              fill={isActive('home') ? 'white' : 'none'}
              strokeWidth={isActive('home') ? 2.5 : 1.8}
            />
          </button>

          {/* Search */}
          <button 
            onClick={onSearch}
            className={`relative flex items-center justify-center transition-all duration-300 ${
              isActive('search') 
                ? 'bg-white/20 backdrop-blur-xl rounded-2xl px-5 py-3' 
                : 'p-3 hover:bg-white/10 rounded-xl'
            }`}
            style={isActive('search') ? {
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.2)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)'
            } : {}}
          >
            <Search 
              size={22} 
              className={isActive('search') ? 'text-white' : 'text-white/70'} 
              strokeWidth={isActive('search') ? 2.5 : 1.8}
            />
          </button>

          {/* Booking / Calendar - Center Icon */}
          <button 
            onClick={() => onNavigate('checkout-rooms')}
            className={`relative flex items-center justify-center transition-all duration-300 ${
              isActive('checkout-rooms') || isActive('checkout-details') || isActive('payment')
                ? 'bg-white/20 backdrop-blur-xl rounded-2xl px-5 py-3' 
                : 'p-3 hover:bg-white/10 rounded-xl'
            }`}
            style={(isActive('checkout-rooms') || isActive('checkout-details') || isActive('payment')) ? {
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.2)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)'
            } : {}}
          >
            <Calendar 
              size={22} 
              className={(isActive('checkout-rooms') || isActive('checkout-details') || isActive('payment')) ? 'text-white' : 'text-white/70'} 
              strokeWidth={(isActive('checkout-rooms') || isActive('checkout-details') || isActive('payment')) ? 2.5 : 1.8}
            />
          </button>

          {/* Chat / Concierge */}
          <button 
            onClick={onChat}
            className="relative flex items-center justify-center transition-all duration-300 p-3 hover:bg-white/10 rounded-xl"
          >
            <MessageCircle 
              size={22} 
              className="text-white/70" 
              strokeWidth={1.8}
            />
          </button>

          {/* Profile */}
          <button 
            onClick={() => onNavigate('profile')}
            className={`relative flex items-center justify-center transition-all duration-300 ${
              isActive('profile') || isActive('signin') || isActive('signup')
                ? 'bg-white/20 backdrop-blur-xl rounded-2xl px-3 py-2' 
                : 'p-1 hover:bg-white/10 rounded-xl'
            }`}
            style={(isActive('profile') || isActive('signin') || isActive('signup')) ? {
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.2)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)'
            } : {}}
          >
            {userAvatar ? (
              <div className={`w-9 h-9 rounded-full overflow-hidden ring-2 transition-all ${
                isActive('profile') ? 'ring-white/60 ring-offset-2 ring-offset-transparent' : 'ring-white/30'
              }`}>
                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isActive('profile') || isActive('signin') 
                  ? 'bg-white ring-2 ring-white/50' 
                  : 'bg-white/20 ring-2 ring-white/20'
              }`}>
                <User size={18} className={isActive('profile') || isActive('signin') ? 'text-[#0d5c63]' : 'text-white/80'} />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
