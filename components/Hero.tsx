
import React from 'react';
import BookingWidget from './BookingWidget';
import { Instagram, MessageCircle, Youtube } from 'lucide-react';

interface HeroProps {
  onBookNow?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between items-center bg-slate-100">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2400" 
          alt="Villays Estate" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Top Margin for Navbar */}
      <div className="h-32"></div>

      {/* Main Branding */}
      <div className="relative z-10 text-center text-white px-6">
        <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-white/40"></div>
            <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-80">The Signature Series</span>
            <div className="h-px w-12 bg-white/40"></div>
        </div>
        <h1 className="text-[10rem] md:text-[18rem] font-serif leading-none tracking-tighter select-none drop-shadow-2xl">
          Villays
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto mt-6 opacity-90 leading-relaxed font-serif italic">
          Amalfi's most exclusive cliffside sanctuary, redefined for the modern legacy.
        </p>
      </div>

      {/* Social Icons Overlay (Right Side) - Keep it absolute so it doesn't affect flow */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 z-30">
        <a href="#" className="text-white/60 hover:text-white transition-all transform hover:-translate-x-1"><Instagram size={20} /></a>
        <a href="#" className="text-white/60 hover:text-white transition-all transform hover:-translate-x-1"><MessageCircle size={20} /></a>
        <a href="#" className="text-white/60 hover:text-white transition-all transform hover:-translate-x-1"><Youtube size={20} /></a>
      </div>

      {/* Compact Booking Widget at Bottom - Increased Z-Index */}
      <div className="relative z-40 w-full max-w-6xl px-6 mb-16">
        <BookingWidget onBook={onBookNow} />
      </div>
    </section>
  );
};

export default Hero;
