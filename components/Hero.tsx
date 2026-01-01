
import React from 'react';
import BookingWidget from './BookingWidget';
import { Instagram, MessageCircle, Youtube } from 'lucide-react';

interface HeroProps {
  onBookNow?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between items-center bg-slate-100">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2400" 
          alt="Villays Estate" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
      </div>

      {/* Top Margin for Navbar */}
      <div className="h-16 md:h-32"></div>

      {/* Main Branding - Centered vertically on mobile */}
      <div className="relative z-10 text-center text-white px-4 md:px-6 flex-grow flex flex-col justify-center md:flex-grow-0 md:block -mt-8 md:mt-0">
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-8">
            <div className="h-px w-6 md:w-12 bg-white/40"></div>
            <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.25em] md:tracking-[0.4em] opacity-80">The Signature Series</span>
            <div className="h-px w-6 md:w-12 bg-white/40"></div>
        </div>
        <h1 className="text-[4.5rem] sm:text-[6rem] md:text-[12rem] lg:text-[18rem] font-serif leading-[0.85] tracking-tighter select-none drop-shadow-2xl">
          Villays
        </h1>
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide max-w-md md:max-w-2xl mx-auto mt-3 md:mt-6 opacity-90 leading-relaxed font-serif italic px-2">
          Amalfi's most exclusive cliffside sanctuary, redefined for the modern legacy.
        </p>
      </div>

      {/* Social Icons Overlay (Right Side) - Hidden on Mobile */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 z-30">
        <a href="#" className="text-white/60 hover:text-white transition-all transform hover:-translate-x-1"><Instagram size={20} /></a>
        <a href="#" className="text-white/60 hover:text-white transition-all transform hover:-translate-x-1"><MessageCircle size={20} /></a>
        <a href="#" className="text-white/60 hover:text-white transition-all transform hover:-translate-x-1"><Youtube size={20} /></a>
      </div>

      {/* Compact Booking Widget at Bottom - Higher on mobile to avoid bottom nav */}
      <div className="relative z-40 w-full max-w-6xl px-3 md:px-6 mb-32 md:mb-16">
        <BookingWidget onBook={onBookNow} />
      </div>
    </section>
  );
};

export default Hero;
