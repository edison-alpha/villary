import React, { useState, useEffect } from 'react';
import { X, Sparkles, Gift, Clock, Percent, Bell, ChevronDown, Star } from 'lucide-react';

// Top Banner for Rate Card (below navbar) - Swipeable, slides from right
interface RatePopupProps {
  isVisible: boolean;
  price: number;
  onClose: () => void;
  onBook: () => void;
}

export const MobileRatePopup: React.FC<RatePopupProps> = ({ isVisible, price, onClose, onBook }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Small delay to trigger slide-in animation
      setTimeout(() => setIsAnimatingIn(true), 50);
    } else {
      setIsAnimatingIn(false);
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    // Only allow swipe to right
    if (diff > 0) {
      setDragX(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // If swiped more than 80px, close it
    if (dragX > 80) {
      onClose();
    } else {
      setDragX(0);
    }
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[85] lg:hidden" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 56px)' }}>
      {/* Collapsed Bar - Swipeable, slides from right */}
      {!isExpanded && (
        <div 
          className={`mx-3 mt-2 bg-white/95 backdrop-blur-xl text-slate-800 rounded-2xl shadow-lg border border-amber-200 overflow-hidden transition-all duration-300 ease-out ${
            isDragging ? '' : 'transition-transform'
          }`}
          style={{ 
            transform: isAnimatingIn ? `translateX(${dragX}px)` : 'translateX(100%)',
            opacity: Math.max(0.3, 1 - dragX / 150)
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between px-3 py-2">
            <div 
              className="flex items-center gap-2 flex-grow cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-base font-bold text-[#0d5c63]">${price.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400">/night</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={(e) => { e.stopPropagation(); onBook(); }}
                className="bg-[#0d5c63] text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1"
              >
                Book <ChevronDown size={12} className="rotate-[-90deg]" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-6 h-6 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-400 transition-all"
              >
                <X size={12} />
              </button>
            </div>
          </div>
          {/* Swipe hint indicator */}
          <div className="h-0.5 bg-gradient-to-r from-amber-400 to-orange-400"></div>
        </div>
      )}

      {/* Expanded Card */}
      {isExpanded && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-[-1]" 
            onClick={() => setIsExpanded(false)}
          />
          <div className="mx-3 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top duration-200">
            {/* Header */}
            <div className="bg-[#0d5c63] text-white px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-70">Exclusive Daily Rate</p>
                <p className="text-xl font-serif font-bold">${price.toLocaleString()} <span className="text-xs opacity-50 font-sans">/night</span></p>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* Details */}
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
                <span className="text-slate-500">Estate Manager</span>
                <span className="font-semibold text-slate-800">24/7 Priority</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
                <span className="text-slate-500">Breakfast</span>
                <span className="font-semibold text-slate-800">Included</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2">
                <span className="text-slate-500">Cancellation</span>
                <span className="font-semibold text-slate-800">Flexible</span>
              </div>
            </div>
            
            {/* CTA */}
            <div className="px-4 pb-4 flex gap-2">
              <button 
                onClick={onClose}
                className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm active:scale-[0.98] transition-all"
              >
                Dismiss
              </button>
              <button 
                onClick={onBook}
                className="flex-[2] bg-[#0d5c63] text-white py-3 rounded-xl font-bold text-sm active:scale-[0.98] transition-all"
              >
                Check Availability
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Welcome Discount Popup
interface WelcomePopupProps {
  isVisible: boolean;
  onClose: () => void;
  onClaim: () => void;
}

export const WelcomeDiscountPopup: React.FC<WelcomePopupProps> = ({ isVisible, onClose, onClaim }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl overflow-hidden max-w-[320px] w-full shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-500 transition-all shadow-sm"
        >
          <X size={16} strokeWidth={2} />
        </button>
        
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0d5c63] to-[#0a4a50] px-6 py-8 text-center text-white">
          <Gift size={32} className="mx-auto mb-2 opacity-90" />
          <p className="text-5xl font-serif font-bold">15%</p>
          <p className="text-xs uppercase tracking-[0.2em] opacity-80 mt-1">OFF YOUR FIRST STAY</p>
        </div>
        
        {/* Content */}
        <div className="p-5 text-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-1.5">Welcome to Villays!</h3>
          <p className="text-slate-500 text-sm mb-4">
            Use code <span className="font-bold text-[#0d5c63] bg-[#0d5c63]/10 px-2 py-0.5 rounded">WELCOME15</span>
          </p>
          
          <button 
            onClick={onClaim}
            className="w-full bg-[#0d5c63] text-white py-3 rounded-xl font-bold text-sm active:scale-[0.98] transition-all"
          >
            Claim Discount
          </button>
          <button 
            onClick={onClose}
            className="text-slate-400 text-xs font-medium mt-3 block mx-auto"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

// Limited Time Offer Popup
interface LimitedOfferPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onBook: () => void;
}

export const LimitedOfferPopup: React.FC<LimitedOfferPopupProps> = ({ isVisible, onClose, onBook }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 0; minutes = 0; seconds = 0; }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl overflow-hidden w-full max-w-[320px] shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-500 transition-all shadow-sm"
        >
          <X size={16} strokeWidth={2} />
        </button>
        
        {/* Timer Header */}
        <div className="bg-slate-900 text-white px-4 py-4">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Clock size={12} className="text-red-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Limited Time</span>
          </div>
          <div className="flex justify-center gap-2">
            <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
              <p className="text-xl font-mono font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
              <p className="text-[8px] uppercase opacity-50">hrs</p>
            </div>
            <span className="text-xl font-bold opacity-30 self-center">:</span>
            <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
              <p className="text-xl font-mono font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
              <p className="text-[8px] uppercase opacity-50">min</p>
            </div>
            <span className="text-xl font-bold opacity-30 self-center">:</span>
            <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
              <p className="text-xl font-mono font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
              <p className="text-[8px] uppercase opacity-50">sec</p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 text-center">
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full mb-3">
            <Percent size={14} />
            <span className="text-xs font-bold">Save $500</span>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-800 mb-1.5">Flash Sale!</h3>
          <p className="text-slate-500 text-sm mb-4">
            Book 3+ nights and save $500 on any Villays property.
          </p>
          
          <button 
            onClick={onBook}
            className="w-full bg-[#0d5c63] text-white py-3 rounded-xl font-bold text-sm active:scale-[0.98] transition-all"
          >
            Book Now & Save
          </button>
          <button 
            onClick={onClose}
            className="text-slate-400 text-xs font-medium mt-3 block mx-auto"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
};

// Newsletter Popup
interface NewsletterPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSubscribe: (email: string) => void;
}

export const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ isVisible, onClose, onSubscribe }) => {
  const [email, setEmail] = useState('');

  if (!isVisible) return null;

  const handleSubmit = () => {
    if (email.trim()) {
      onSubscribe(email);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl overflow-hidden w-full max-w-[320px] shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-500 transition-all shadow-sm"
        >
          <X size={16} strokeWidth={2} />
        </button>
        
        {/* Image */}
        <div className="h-24 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600" 
            alt="Luxury Villa"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="p-5 text-center">
          <div className="w-10 h-10 bg-[#0d5c63] rounded-full flex items-center justify-center mx-auto -mt-10 border-4 border-white shadow-lg">
            <Bell size={16} className="text-white" />
          </div>
          
          <h3 className="text-lg font-semibold text-slate-800 mt-3 mb-1.5">Stay Inspired</h3>
          <p className="text-slate-500 text-sm mb-4">
            Get exclusive offers and travel tips.
          </p>
          
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-[#0d5c63] focus:ring-1 focus:ring-[#0d5c63]"
          />
          
          <button 
            onClick={handleSubmit}
            className="w-full bg-[#0d5c63] text-white py-2.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all"
          >
            Subscribe
          </button>
          <p className="text-[9px] text-slate-400 mt-3">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

// Floating Promo Banner (appears at top below navbar, slides from right)
interface PromoBannerProps {
  isVisible: boolean;
  onClose: () => void;
  onClick: () => void;
}

export const FloatingPromoBanner: React.FC<PromoBannerProps> = ({ isVisible, onClose, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed top-16 right-0 z-[85] lg:hidden transition-transform duration-300 ease-out ${
      isAnimating ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div 
        className="mr-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white pl-4 pr-2 py-2.5 rounded-l-2xl shadow-lg flex items-center gap-3 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex-grow min-w-0">
          <p className="font-bold text-xs">Special Offer!</p>
          <p className="text-[10px] opacity-90">20% off weekend stays</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shrink-0 transition-all"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default {
  MobileRatePopup,
  WelcomeDiscountPopup,
  LimitedOfferPopup,
  NewsletterPopup,
  FloatingPromoBanner
};
