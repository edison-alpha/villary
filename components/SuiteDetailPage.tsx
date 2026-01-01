
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, Users, Wifi, Clock, Info, 
  MapPin, Star, Share, Heart, Check, Smartphone, 
  Waves, Coffee, ShieldCheck, Zap, Maximize2,
  Utensils, UserCheck, CreditCard, ChevronRight,
  Mail, Instagram, Twitter, Linkedin, Car, Dog
} from 'lucide-react';
import { Suite, Villa } from '../types';

interface SuiteDetailPageProps {
  villa: Villa;
  suite: Suite;
  onBack: () => void;
  onBook: () => void;
}

const SuiteDetailPage: React.FC<SuiteDetailPageProps> = ({ villa, suite, onBack, onBook }) => {
  const [activeImage, setActiveImage] = useState(suite.image);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const priceBreakdown = [
    { label: "Per Night", value: `AED ${suite.basePrice.toLocaleString()}` },
    { label: "Nights", value: "3 Nights" },
    { label: "Taxes & Fees", value: "AED 480" },
  ];

  const total = (suite.basePrice * 3) + 480;

  return (
    <div className="bg-white min-h-screen relative font-sans pb-20">
      {/* 
          Internal Navbar removed to fix duplication. 
          The global Navbar in App.tsx now handles navigation.
      */}

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT SIDEBAR: RESERVE THIS RESORT */}
          <aside className="lg:w-[320px] shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-slate-800">Reserve This Resort</h2>
                <button onClick={onBack} className="text-[#0d5c63] hover:underline text-[10px] font-bold uppercase tracking-widest">Back</button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Check In</label>
                    <div className="relative">
                      <input type="text" readOnly value="Jun 7, 2025" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-medium text-slate-700 outline-none" />
                      <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Check Out</label>
                    <div className="relative">
                      <input type="text" readOnly value="Jun 7, 2025" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-medium text-slate-700 outline-none" />
                      <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Number of Guests</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-medium text-slate-700 outline-none appearance-none cursor-pointer">
                    <option>2 Adults, 1 Children</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Room Summary</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  {["120 sqm", "Private Pool", "Oceanfront View", "Breakfast Included", "Free Wi-Fi", "Spa Access"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                      <Check size={12} className="text-[#0d5c63]" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-3">
                <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Price Breakdown</h3>
                {priceBreakdown.map((item, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-bold text-slate-800">{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <span className="font-bold text-slate-800 text-sm">Total</span>
                  <span className="font-bold text-slate-800 text-sm">AED {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                 <p className="text-[10px] font-bold text-slate-800">Have a code?</p>
                 <div className="flex gap-2">
                    <input type="text" placeholder="Input Code Voucher" className="flex-grow bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs outline-none focus:border-slate-400" />
                    <button className="bg-white border border-slate-200 text-slate-900 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50">Apply</button>
                 </div>
              </div>

              <button onClick={onBook} className="w-full bg-white border border-slate-200 text-slate-900 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-sm">
                Checkout
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-grow">
            
            {/* HERO GALLERY */}
            <section className="space-y-8 mb-16">
              <div className="relative aspect-[16/8] rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                <img src={activeImage} className="w-full h-full object-cover" alt={suite.name} />
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {["Resorts", "Top Highlights", "Best Value Resorts"].map(tag => (
                    <button key={tag} className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {[suite.image, "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1540518614846-7eba43376461?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600"].map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 w-32 aspect-[16/10] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === img ? 'border-[#0d5c63]' : 'border-transparent opacity-60'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>

            {/* SUITE TITLE & DESCRIPTION */}
            <section className="mb-16 space-y-4">
              <h1 className="text-3xl font-serif text-slate-800">{villa.name}</h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Coastal Road East, Selene Bay District, Al Jubail Island, Abu Dhabi 14587 United Arab Emirates</p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                A haven of refined elegance, this 120 sqm suite offers floor-to-ceiling views of the ocean, a private plunge pool, and a terrace made for golden hour moments. Inside, discover handcrafted furnishings, premium amenities, and a spa-inspired bathroom to renew your senses.
              </p>
            </section>

            {/* HOTEL FEATURE GRID */}
            <section className="mb-16">
              <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-8 border-b border-slate-100 pb-4">Hotel Feature</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6">
                <FeatureRow icon={<Wifi size={14}/>} title="High-Speed Wi-Fi" />
                <FeatureRow icon={<Coffee size={14}/>} title="Daily Housekeeping" />
                <FeatureRow icon={<Car size={14}/>} title="Complimentary Valet Parking" />
                <FeatureRow icon={<Utensils size={14}/>} title="24-Hour In-Room Dining" />
                <FeatureRow icon={<Waves size={14}/>} title="Spa-Style Bathroom" />
                <FeatureRow icon={<Check size={14}/>} title="Unpacking & Packing Services" />
                <FeatureRow icon={<Waves size={14}/>} title="Luxury In-Room Refreshments" />
                <FeatureRow icon={<UserCheck size={14}/>} title="Wellness Pavilion Access" />
                <FeatureRow icon={<Smartphone size={14}/>} title="Suite Work Desk & Charging Hub" />
              </div>
            </section>

            {/* BOOKING RULES */}
            <section className="mb-16">
              <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-8 border-b border-slate-100 pb-4">Booking Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                <div className="flex items-start gap-3">
                   <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-slate-500">Check-in from 3:00 PM TO 11:59 PM</p>
                </div>
                <div className="flex items-start gap-3">
                   <Dog size={16} className="text-slate-400 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-slate-500">Pet are not allowed</p>
                </div>
                <div className="flex items-start gap-3">
                   <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-slate-500">Check-out from 06:00 AM TO 12:00 PM</p>
                </div>
                <div className="flex items-start gap-3">
                   <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-slate-500">The minimum age for check-in is 18</p>
                </div>
                <div className="flex items-start gap-3">
                   <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-slate-500">Cancellation and prepayment terms depend on the room type. Please review the conditions before booking.</p>
                </div>
                <div className="space-y-3">
                   <p className="text-[11px] text-slate-500">Payment method</p>
                   <div className="flex gap-2 opacity-50">
                      <CreditCard size={18} />
                      <CreditCard size={18} />
                      <CreditCard size={18} />
                      <CreditCard size={18} />
                   </div>
                </div>
              </div>
            </section>

            {/* REVIEWS SECTION */}
            <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-16">
               <div className="space-y-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Reviews</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Overall Rating</p>
                  <p className="text-3xl font-bold text-slate-800">4,2K</p>
                  <p className="text-[10px] text-slate-400 font-medium">Growth in Reviews of This Year</p>
               </div>
               <div className="space-y-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Average Rating</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-slate-800">4,5/5</p>
                    <div className="flex gap-0.5 text-yellow-400">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} className="text-slate-200" />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Growth in Reviews of This Year</p>
               </div>
               <div className="space-y-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Average Rating</p>
                  {[5,4,3,2,1].map(stars => (
                    <div key={stars} className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-slate-400 w-2">{stars}</span>
                       <Star size={8} className="text-yellow-400 fill-current" />
                       <div className="flex-grow h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full" style={{ width: stars === 5 ? '80%' : stars === 4 ? '60%' : '10%' }}></div>
                       </div>
                       <span className="text-[8px] font-bold text-slate-400 w-8">{stars === 5 ? '5K' : stars === 4 ? '3.0K' : stars === 3 ? '1.0K' : '20'}</span>
                    </div>
                  ))}
               </div>
            </section>

            {/* EXPLORE AREA */}
            <section className="mb-24 space-y-8">
               <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Explore Area</h3>
               <div className="rounded-xl overflow-hidden aspect-video bg-slate-50 relative border border-slate-100">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover grayscale opacity-50" alt="Map" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#0d5c63] flex items-center justify-center text-white"><MapPin size={20} /></div>
                        <div>
                           <p className="text-[11px] font-bold text-slate-800">Anantara Selene Bay</p>
                           <p className="text-[9px] text-slate-400 uppercase">Coastal Road East, Abu Dhabi</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <DestinationItem name="Al-Jubail Mosque" dist="1.5km" />
                  <DestinationItem name="Jubail Mangrove Park" dist="1.5km" />
                  <DestinationItem name="Canal Walk" dist="50M" />
                  <DestinationItem name="Najmat Abu Dhabi / Corniche Park" dist="50M" />
                  <DestinationItem name="Al Bateen Marina" dist="50M" />
                  <DestinationItem name="Saadiyat Island" dist="50M" />
               </div>
            </section>

          </main>
        </div>
      </div>

      {/* DISCOVER MORE PLACES */}
      <section className="bg-[#fcfdfd] py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="text-5xl font-serif text-center mb-16 text-slate-800">Discover More Places</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <DiscoveryCard title="Private Wellness & Spa" img="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" />
             <DiscoveryCard title="Infinity Pool by the Ocean" img="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800" />
             <div className="space-y-8">
                <DiscoveryCard title="Glass Kayaking" img="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800" isSmall />
                <DiscoveryCard title="Lava Shell Massage" img="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800" isSmall />
             </div>
          </div>
        </div>
      </section>

      {/* FINAL ESCAPE BANNER */}
      <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">
         <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover brightness-50" />
         <div className="relative z-10 max-w-2xl px-6">
            <h2 className="text-4xl font-serif text-white mb-6">Your Abu Dhabi Escape Awaits <br /> Book Your Experience Right Now</h2>
            <p className="text-white/70 text-sm font-light mb-10 leading-relaxed">Whether you wish to relax by the pool, embark on a desert adventure, or explore the rich cultural heritage of Abu Dhabi, our resort offers a range of activities to suit your every mood.</p>
            <button className="border border-white/40 text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center gap-3 mx-auto">
               BOOK NOW <ChevronRight size={14} />
            </button>
         </div>
      </section>

      {/* 
          Internal Footer removed to fix duplication. 
          The global Footer in App.tsx now handles the site footer.
      */}
    </div>
  );
};

const FeatureRow = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center gap-3">
    <div className="text-slate-400">{icon}</div>
    <span className="text-[11px] text-slate-500">{title}</span>
  </div>
);

const DestinationItem = ({ name, dist }: { name: string, dist: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-50 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
     <div className="flex items-center gap-2">
        <MapPin size={12} className="text-slate-300" />
        <span className="text-slate-600">{name}</span>
     </div>
     <span>{dist}</span>
  </div>
);

const DiscoveryCard = ({ title, img, isSmall }: { title: string, img: string, isSmall?: boolean }) => (
  <div className={`relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg ${isSmall ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
     <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
     <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <h4 className="text-white text-xl font-serif max-w-[150px]">{title}</h4>
        <button className="text-white/70 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
           BOOK NOW <ChevronRight size={14} />
        </button>
     </div>
  </div>
);

export default SuiteDetailPage;
