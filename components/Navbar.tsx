
import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, LogIn, Bell, Calendar, Clock, CheckCircle, X } from 'lucide-react';
import { User as UserType, Booking } from '../types';
import brandLogo from '../assets/brand.png';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onBookNow?: () => void;
  onSignIn?: () => void;
  user: UserType | null;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, onBookNow, onSignIn, user }) => {
  const isDark = currentPage !== 'home';
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Get bookings for notifications
  const getBookings = (): Booking[] => {
    const saved = localStorage.getItem('villays_bookings');
    if (!saved) return [];
    return JSON.parse(saved).map((b: any) => ({
      ...b,
      arrivalDate: new Date(b.arrivalDate),
      departureDate: new Date(b.departureDate),
      createdAt: new Date(b.createdAt),
    }));
  };

  const getActiveBookings = () => {
    const bookings = getBookings();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookings.filter(b => b.status === 'confirmed' && b.departureDate >= today);
  };

  const activeBookings = getActiveBookings();
  const activeCount = activeBookings.length;

  const getDaysUntilCheckIn = (arrivalDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const arrival = new Date(arrivalDate);
    arrival.setHours(0, 0, 0, 0);
    return Math.ceil((arrival.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
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
            src={brandLogo} 
            alt="Omah Turu" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>

        {/* Desktop Links */}
        <div className={`hidden xl:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-[#8D6E63]' : 'text-white/60'}`}>
          <button onClick={() => scrollTo('experience')} className="hover:text-[#4A3426] transition-colors">Villa</button>
          <button onClick={() => scrollTo('spaces')} className="hover:text-[#4A3426] transition-colors">Kamar</button>
          <button onClick={() => onNavigate('checkout-rooms')} className="hover:text-[#4A3426] transition-colors">Reservasi</button>
          <button className="hover:text-[#4A3426] transition-colors">Kontak</button>
        </div>
      </div>

      {/* Search Bar - Desktop */}
      <div className={`hidden md:flex flex-grow max-w-md mx-12 relative group`}>
        <input 
          type="text" 
          placeholder="Cari kamar..." 
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
        {/* Desktop: Favorites & Notifications */}
        <div className={`hidden sm:flex items-center gap-4 ${isDark ? 'text-[#8D6E63]' : 'text-white/60'}`}>
          <button 
            onClick={() => onNavigate('favorite-rooms')}
            className="hover:text-[#BC8F48] transition-colors"
          >
            <Heart size={20} />
          </button>
          
          {/* Notification with Dropdown */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative hover:text-[#BC8F48] transition-colors"
            >
              <Bell size={20} />
              {activeCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#BC8F48] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showNotifDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">Notifikasi</h3>
                  <button onClick={() => setShowNotifDropdown(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {activeBookings.length === 0 ? (
                    <div className="p-6 text-center">
                      <Bell size={32} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-sm text-slate-500">Belum ada notifikasi</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-50">
                      {activeBookings.slice(0, 5).map((booking) => {
                        const daysUntil = getDaysUntilCheckIn(booking.arrivalDate);
                        const isToday = daysUntil === 0;
                        const isTomorrow = daysUntil === 1;
                        const isStaying = daysUntil < 0;
                        
                        return (
                          <div 
                            key={booking.id} 
                            className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => {
                              setShowNotifDropdown(false);
                              onNavigate('active-bookings');
                            }}
                          >
                            <div className="flex gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isStaying ? 'bg-green-100 text-green-600' :
                                isToday ? 'bg-[#BC8F48]/20 text-[#BC8F48]' :
                                isTomorrow ? 'bg-amber-100 text-amber-600' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                {isStaying ? <CheckCircle size={18} /> : <Calendar size={18} />}
                              </div>
                              <div className="flex-grow min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">
                                  {isStaying ? 'Sedang Menginap' :
                                   isToday ? 'Check-in Hari Ini!' :
                                   isTomorrow ? 'Check-in Besok' :
                                   `Check-in ${daysUntil} hari lagi`}
                                </p>
                                <p className="text-xs text-slate-500 truncate">{booking.suiteName}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                  {formatDate(booking.arrivalDate)} - {formatDate(booking.departureDate)}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-[10px] font-mono text-[#BC8F48] font-bold">{booking.bookingCode}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {activeBookings.length > 0 && (
                  <div className="p-3 border-t border-slate-100">
                    <button 
                      onClick={() => {
                        setShowNotifDropdown(false);
                        onNavigate('active-bookings');
                      }}
                      className="w-full text-center text-sm font-medium text-[#BC8F48] hover:text-[#A67B3D] transition-colors"
                    >
                      Lihat Semua Reservasi
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="w-px h-6 bg-current opacity-20"></div>
        </div>

        {user ? (
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => onNavigate('profile')}
          >
            <div className="text-right hidden sm:block">
              <p className={`text-[11px] font-bold ${isDark ? 'text-[#4A3426]' : 'text-white'}`}>{user.firstName} {user.lastName}</p>
              <p className="text-[9px] font-medium text-[#BC8F48] uppercase tracking-widest">Member</p>
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
            <LogIn size={16} /> Masuk
          </button>
        )}
        
        {/* Notifikasi Icon - Mobile */}
        <div className="relative lg:hidden">
          <button 
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className={`relative p-2 rounded-full transition-all ${
              isDark ? 'text-[#4A3426] hover:bg-[#8D6E63]/10' : 'text-white hover:bg-white/10'
            }`}
          >
            <Bell size={22} />
            {activeCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#BC8F48] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Notification Dropdown - Full Screen Modal */}
      {showNotifDropdown && (
        <div className="lg:hidden fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowNotifDropdown(false)} />
          <div className="absolute top-0 left-0 right-0 bg-white rounded-b-3xl shadow-2xl max-h-[70vh] overflow-hidden animate-in slide-in-from-top duration-300">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-semibold text-slate-800 text-lg">Notifikasi</h3>
              <button onClick={() => setShowNotifDropdown(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(70vh-60px)]">
              {activeBookings.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={40} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">Belum ada notifikasi</p>
                  <p className="text-xs text-slate-400 mt-1">Notifikasi reservasi akan muncul di sini</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {activeBookings.map((booking) => {
                    const daysUntil = getDaysUntilCheckIn(booking.arrivalDate);
                    const isToday = daysUntil === 0;
                    const isTomorrow = daysUntil === 1;
                    const isStaying = daysUntil < 0;
                    
                    return (
                      <div 
                        key={booking.id} 
                        className="p-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
                        onClick={() => {
                          setShowNotifDropdown(false);
                          onNavigate('active-bookings');
                        }}
                      >
                        <div className="flex gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            isStaying ? 'bg-green-100 text-green-600' :
                            isToday ? 'bg-[#BC8F48]/20 text-[#BC8F48]' :
                            isTomorrow ? 'bg-amber-100 text-amber-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {isStaying ? <CheckCircle size={22} /> : <Calendar size={22} />}
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-sm font-semibold text-slate-800">
                              {isStaying ? 'Sedang Menginap' :
                               isToday ? 'Check-in Hari Ini!' :
                               isTomorrow ? 'Check-in Besok' :
                               `Check-in ${daysUntil} hari lagi`}
                            </p>
                            <p className="text-sm text-slate-600 truncate">{booking.suiteName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-mono bg-[#BC8F48]/10 text-[#BC8F48] px-2 py-0.5 rounded font-bold">{booking.bookingCode}</span>
                              <span className="text-xs text-slate-400">
                                {formatDate(booking.arrivalDate)} - {formatDate(booking.departureDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {activeBookings.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0">
                <button 
                  onClick={() => {
                    setShowNotifDropdown(false);
                    onNavigate('active-bookings');
                  }}
                  className="w-full py-3 bg-[#BC8F48] text-white rounded-xl font-semibold text-sm active:scale-[0.98] transition-all"
                >
                  Lihat Semua Reservasi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
