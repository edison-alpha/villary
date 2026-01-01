
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureCollection from './components/SignatureCollection';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AIConcierge from './components/AIConcierge';
import VillaDetailPage from './components/VillaDetailPage';
import RoomSelectionPage from './components/RoomSelectionPage';
import SuiteDetailPage from './components/SuiteDetailPage';
import CheckoutDetailsPage from './components/CheckoutDetailsPage';
import PaymentPage from './components/PaymentPage';
import AuthPage from './components/AuthPage';
import MyProfilePage from './components/MyProfilePage';
import Inspirations from './components/Inspirations';
import MobileBottomNav from './components/MobileBottomNav';
import { WelcomeDiscountPopup, LimitedOfferPopup, NewsletterPopup, FloatingPromoBanner, MobileRatePopup } from './components/PromoPopups';
import { ALL_VILLAS } from './constants/villas';
import { Suite, User } from './types';

type Page = 'home' | 'checkout-rooms' | 'suite-detail' | 'checkout-details' | 'payment' | 'confirmation' | 'signin' | 'signup' | 'profile';

const App: React.FC = () => {
  const [showConcierge, setShowConcierge] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  // Popup states
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showLimitedOffer, setShowLimitedOffer] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showRatePopup, setShowRatePopup] = useState(false);
  
  // Persistence logic
  useEffect(() => {
    const savedUser = localStorage.getItem('villays_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Show welcome popup after 3 seconds for new visitors
    const hasSeenWelcome = localStorage.getItem('villays_welcome_seen');
    if (!hasSeenWelcome) {
      setTimeout(() => setShowWelcomePopup(true), 3000);
    }
    
    // Show promo banner after 5 seconds (only if not closed in this session)
    const hasClosedBanner = sessionStorage.getItem('villays_banner_closed');
    if (!hasClosedBanner) {
      setTimeout(() => setShowPromoBanner(true), 8000); // 8 seconds delay
    }
    
    // Show rate popup after 10 seconds (give user time to explore first)
    const rateClosedTime = sessionStorage.getItem('villays_rate_closed_time');
    const now = Date.now();
    
    // If never closed or closed more than 5 minutes ago, show after 10 seconds
    if (!rateClosedTime || (now - parseInt(rateClosedTime)) > 5 * 60 * 1000) {
      setTimeout(() => setShowRatePopup(true), 10000); // 10 seconds delay
    }
    
    // Show limited offer after 20 seconds
    setTimeout(() => {
      const hasSeenOffer = sessionStorage.getItem('villays_offer_seen');
      if (!hasSeenOffer) {
        setShowLimitedOffer(true);
      }
    }, 20000);
    
    // Show newsletter popup after 45 seconds
    setTimeout(() => {
      const hasSeenNewsletter = localStorage.getItem('villays_newsletter_seen');
      if (!hasSeenNewsletter) {
        setShowNewsletter(true);
      }
    }, 45000);
  }, []);
  
  // Handle rate popup reappear after 5 minutes
  const handleCloseRatePopup = () => {
    setShowRatePopup(false);
    sessionStorage.setItem('villays_rate_closed_time', Date.now().toString());
    
    // Set timer to show again after 5 minutes
    setTimeout(() => {
      if (currentPage === 'home') {
        setShowRatePopup(true);
      }
    }, 5 * 60 * 1000); // 5 minutes
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('villays_user', JSON.stringify(userData));
    setCurrentPage('home');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('villays_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('villays_user');
    setCurrentPage('home');
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekLater = new Date(today);
  weekLater.setDate(today.getDate() + 7);

  const [bookingDates, setBookingDates] = useState({
    arrival: today,
    departure: weekLater
  });
  
  const villaysEstate = ALL_VILLAS[0]; 

  const handleBookNow = (arrival?: Date, departure?: Date) => {
    if (arrival && departure) {
      setBookingDates({ arrival, departure });
    }
    setCurrentPage('checkout-rooms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuiteSelected = (suite: Suite) => {
    setSelectedSuite(suite);
    setCurrentPage('checkout-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowSuiteDetail = (suite: Suite) => {
    setSelectedSuite(suite);
    setCurrentPage('suite-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCloseWelcome = () => {
    setShowWelcomePopup(false);
    localStorage.setItem('villays_welcome_seen', 'true');
  };
  
  const handleClaimDiscount = () => {
    setShowWelcomePopup(false);
    localStorage.setItem('villays_welcome_seen', 'true');
    handleBookNow();
  };
  
  const handleCloseLimitedOffer = () => {
    setShowLimitedOffer(false);
    sessionStorage.setItem('villays_offer_seen', 'true');
  };
  
  const handleCloseNewsletter = () => {
    setShowNewsletter(false);
    localStorage.setItem('villays_newsletter_seen', 'true');
  };
  
  const handleSubscribe = (email: string) => {
    console.log('Subscribed:', email);
    setShowNewsletter(false);
    localStorage.setItem('villays_newsletter_seen', 'true');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onBookNow={handleBookNow} />
            <div id="experience"><VillaDetailPage villa={villaysEstate} onBookNow={() => handleBookNow()} /></div>
            <div id="spaces"><SignatureCollection /></div>
            <Stats />
            <HowItWorks />
            <Inspirations />
            <FAQ />
          </>
        );
      case 'signin':
        return <AuthPage initialType="signin" onSwitch={(type) => setCurrentPage(type as Page)} onBack={() => setCurrentPage('home')} onAuthSuccess={handleAuthSuccess} />;
      case 'signup':
        return <AuthPage initialType="signup" onSwitch={(type) => setCurrentPage(type as Page)} onBack={() => setCurrentPage('home')} onAuthSuccess={handleAuthSuccess} />;
      case 'profile':
        return user ? <MyProfilePage user={user} onUpdate={handleUpdateProfile} onLogout={handleLogout} onBack={() => setCurrentPage('home')} /> : null;
      case 'checkout-rooms':
        return (
          <RoomSelectionPage 
            villa={villaysEstate} 
            arrivalDate={bookingDates.arrival}
            departureDate={bookingDates.departure}
            onBack={() => setCurrentPage('home')} 
            onProceed={handleSuiteSelected}
            onViewDetails={handleShowSuiteDetail}
          />
        );
      case 'suite-detail':
        return selectedSuite ? (
          <SuiteDetailPage 
            villa={villaysEstate}
            suite={selectedSuite}
            onBack={() => setCurrentPage('checkout-rooms')}
            onBook={() => setCurrentPage('checkout-details')}
          />
        ) : null;
      case 'checkout-details':
        return selectedSuite ? (
          <CheckoutDetailsPage 
            villa={villaysEstate}
            suite={selectedSuite}
            arrivalDate={bookingDates.arrival}
            departureDate={bookingDates.departure}
            onBack={() => setCurrentPage('checkout-rooms')}
            onComplete={() => setCurrentPage('payment')}
            onNavigateAuth={(type) => setCurrentPage(type as Page)}
            user={user}
          />
        ) : null;
      case 'payment':
        return selectedSuite ? (
          <PaymentPage 
            villa={villaysEstate}
            suite={selectedSuite}
            total={(selectedSuite.basePrice * Math.ceil(Math.abs(bookingDates.departure.getTime() - bookingDates.arrival.getTime()) / (1000 * 60 * 60 * 24))) + 480}
            onBack={() => setCurrentPage('checkout-details')}
            onComplete={() => setCurrentPage('confirmation')}
          />
        ) : null;
      case 'confirmation':
        return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 md:px-6">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 md:mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-12 md:h-12"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#0d5c63] mb-3 md:mb-4">Request Received</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-lg leading-relaxed">
              Thank you for choosing Villays. Your personal estate manager will contact you within the next 2 hours to finalize your itinerary.
            </p>
            <button 
              onClick={() => setCurrentPage('home')}
              className="mt-8 md:mt-12 bg-[#0d5c63] text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-bold shadow-xl active:scale-95 transition-all text-sm md:text-base"
            >
              Return Home
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // Pages that should hide footer
  const hideFooterPages = ['profile', 'signin', 'signup', 'checkout-rooms', 'suite-detail', 'checkout-details', 'payment', 'confirmation'];
  const shouldShowFooter = !hideFooterPages.includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col relative pb-20 lg:pb-0">
      <Navbar 
        onNavigate={(page) => setCurrentPage(page as Page)} 
        currentPage={currentPage} 
        onBookNow={() => handleBookNow()}
        onSignIn={() => setCurrentPage('signin')}
        user={user}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {shouldShowFooter && <Footer />}

      {/* Floating Concierge Button - Hidden on mobile (using bottom nav instead) */}
      <button 
        onClick={() => setShowConcierge(!showConcierge)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-[#0d5c63] text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-[#0a4a50] transition-all transform hover:scale-110 active:scale-95 hidden lg:flex items-center gap-2"
      >
        <div className="p-1.5 md:p-2 bg-white/10 rounded-full">
            <Sparkles size={16} />
        </div>
        <span className="hidden md:inline font-bold pr-2 text-sm">Estate Concierge</span>
      </button>

      {showConcierge && <AIConcierge onClose={() => setShowConcierge(false)} />}
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'profile' && !user) {
            setCurrentPage('signin');
          } else {
            setCurrentPage(page as Page);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearch={() => setShowMobileSearch(true)}
        onChat={() => setShowConcierge(true)}
        userAvatar={user?.avatar}
      />
      
      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileSearch(false)} />
          <div className="absolute top-0 left-0 right-0 bg-white p-4 safe-top animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3">
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  placeholder="Search villas, locations..." 
                  className="w-full bg-slate-100 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c63]"
                  autoFocus
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              <button 
                onClick={() => setShowMobileSearch(false)}
                className="text-slate-500 font-medium text-sm"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Amalfi Coast', 'Ocean View', 'Private Pool', 'Family Suite'].map((term) => (
                  <button 
                    key={term}
                    className="bg-slate-100 px-3 py-1.5 rounded-full text-xs text-slate-600 font-medium"
                    onClick={() => setShowMobileSearch(false)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Promo Popups */}
      <WelcomeDiscountPopup 
        isVisible={showWelcomePopup}
        onClose={handleCloseWelcome}
        onClaim={handleClaimDiscount}
      />
      
      <LimitedOfferPopup 
        isVisible={showLimitedOffer}
        onClose={handleCloseLimitedOffer}
        onBook={() => { handleCloseLimitedOffer(); handleBookNow(); }}
      />
      
      <NewsletterPopup 
        isVisible={showNewsletter}
        onClose={handleCloseNewsletter}
        onSubscribe={handleSubscribe}
      />
      
      {/* Floating Promo Banner - Only on home page */}
      {currentPage === 'home' && (
        <>
          <MobileRatePopup 
            isVisible={showRatePopup && !showConcierge}
            price={2450}
            onClose={handleCloseRatePopup}
            onBook={() => { handleCloseRatePopup(); handleBookNow(); }}
          />
          <FloatingPromoBanner 
            isVisible={showPromoBanner && !showConcierge && !showRatePopup}
            onClose={() => { setShowPromoBanner(false); sessionStorage.setItem('villays_banner_closed', 'true'); }}
            onClick={() => { setShowPromoBanner(false); sessionStorage.setItem('villays_banner_closed', 'true'); handleBookNow(); }}
          />
        </>
      )}
    </div>
  );
};

const Sparkles = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

export default App;
