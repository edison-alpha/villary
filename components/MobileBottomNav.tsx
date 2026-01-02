import React from 'react';
import { Home, CalendarCheck, Clock, MessageCircle, User } from 'lucide-react';

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
  const isActive = (pages: string[]) => pages.includes(currentPage);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden">
      <div className="mx-3 mb-2" style={{ marginBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))' }}>
        {/* Theme-matched container with warm brown gradient */}
        <div className="backdrop-blur-2xl rounded-[2rem] px-3 py-2.5 flex items-center justify-between border border-[#4A3426]/30"
          style={{
            background: 'linear-gradient(135deg, rgba(74,52,38,0.92) 0%, rgba(61,42,30,0.98) 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)'
          }}
        >
          {/* Home */}
          <button 
            onClick={() => onNavigate('home')}
            className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
              isActive(['home']) 
                ? 'bg-white/20 backdrop-blur-xl rounded-2xl px-4 py-2' 
                : 'p-3 hover:bg-white/10 rounded-xl'
            }`}
            style={isActive(['home']) ? {
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.2)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)'
            } : {}}
          >
            <Home 
              size={20} 
              className={isActive(['home']) ? 'text-white' : 'text-white/70'} 
              fill={isActive(['home']) ? 'white' : 'none'}
              strokeWidth={isActive(['home']) ? 2.5 : 1.8}
            />
            <span className={`text-[9px] mt-1 font-medium ${isActive(['home']) ? 'text-white' : 'text-white/60'}`}>Beranda</span>
          </button>

          {/* Pesan Kamar */}
          <button 
            onClick={() => onNavigate('checkout-rooms')}
            className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
              isActive(['checkout-rooms', 'suite-detail', 'checkout-details', 'payment']) 
                ? 'bg-white/20 backdrop-blur-xl rounded-2xl px-4 py-2' 
                : 'p-3 hover:bg-white/10 rounded-xl'
            }`}
            style={isActive(['checkout-rooms', 'suite-detail', 'checkout-details', 'payment']) ? {
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.2)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)'
            } : {}}
          >
            <CalendarCheck 
              size={20} 
              className={isActive(['checkout-rooms', 'suite-detail', 'checkout-details', 'payment']) ? 'text-white' : 'text-white/70'} 
              strokeWidth={isActive(['checkout-rooms', 'suite-detail', 'checkout-details', 'payment']) ? 2.5 : 1.8}
            />
            <span className={`text-[9px] mt-1 font-medium ${isActive(['checkout-rooms', 'suite-detail', 'checkout-details', 'payment']) ? 'text-white' : 'text-white/60'}`}>Pesan</span>
          </button>

          {/* Reservasi Aktif */}
          <button 
            onClick={() => onNavigate('active-bookings')}
            className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
              isActive(['active-bookings', 'booking-history']) 
                ? 'bg-white/20 backdrop-blur-xl rounded-2xl px-4 py-2' 
                : 'p-3 hover:bg-white/10 rounded-xl'
            }`}
            style={isActive(['active-bookings', 'booking-history']) ? {
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.2)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)'
            } : {}}
          >
            <Clock 
              size={20} 
              className={isActive(['active-bookings', 'booking-history']) ? 'text-white' : 'text-white/70'} 
              strokeWidth={isActive(['active-bookings', 'booking-history']) ? 2.5 : 1.8}
            />
            <span className={`text-[9px] mt-1 font-medium ${isActive(['active-bookings', 'booking-history']) ? 'text-white' : 'text-white/60'}`}>Reservasi</span>
          </button>

          {/* Chat / Concierge */}
          <button 
            onClick={onChat}
            className="relative flex flex-col items-center justify-center transition-all duration-300 p-3 hover:bg-white/10 rounded-xl"
          >
            <MessageCircle 
              size={20} 
              className="text-white/70" 
              strokeWidth={1.8}
            />
            <span className="text-[9px] mt-1 font-medium text-white/60">Bantuan</span>
          </button>

          {/* Profile */}
          <button 
            onClick={() => onNavigate('profile')}
            className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
              isActive(['profile', 'signin', 'signup', 'favorite-rooms'])
                ? 'bg-white/15 rounded-xl px-2 py-1' 
                : 'hover:bg-white/10 rounded-xl p-1'
            }`}
          >
            {userAvatar ? (
              <>
                <div className={`w-7 h-7 rounded-full overflow-hidden transition-all ${
                  isActive(['profile', 'favorite-rooms']) ? 'ring-2 ring-white/60' : 'ring-1 ring-white/30'
                }`}>
                  <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className={`text-[9px] mt-1 font-medium ${isActive(['profile', 'favorite-rooms']) ? 'text-white' : 'text-white/60'}`}>Akun</span>
              </>
            ) : (
              <>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isActive(['profile', 'signin', 'signup']) 
                    ? 'bg-white' 
                    : 'bg-white/20'
                }`}>
                  <User size={14} className={isActive(['profile', 'signin', 'signup']) ? 'text-[#4A3426]' : 'text-white/80'} />
                </div>
                <span className={`text-[9px] mt-1 font-medium ${isActive(['profile', 'signin', 'signup']) ? 'text-white' : 'text-white/60'}`}>Akun</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
