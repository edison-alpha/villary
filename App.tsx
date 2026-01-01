
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
import AuthPage from './components/AuthPage';
import MyProfilePage from './components/MyProfilePage';
import Inspirations from './components/Inspirations';
import { ALL_VILLAS } from './constants/villas';
import { Suite, User } from './types';

type Page = 'home' | 'checkout-rooms' | 'suite-detail' | 'checkout-details' | 'confirmation' | 'signin' | 'signup' | 'profile';

const App: React.FC = () => {
  const [showConcierge, setShowConcierge] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  // Persistence logic
  useEffect(() => {
    const savedUser = localStorage.getItem('villays_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onBookNow={handleBookNow} />
            <div id="experience"><VillaDetailPage villa={villaysEstate} /></div>
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
            onComplete={() => setCurrentPage('confirmation')}
            onNavigateAuth={(type) => setCurrentPage(type as Page)}
          />
        ) : null;
      case 'confirmation':
        return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h2 className="text-5xl font-serif text-[#0d5c63] mb-4">Request Received</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-lg">
              Thank you for choosing Villays. Your personal estate manager will contact you within the next 2 hours to finalize your itinerary.
            </p>
            <button 
              onClick={() => setCurrentPage('home')}
              className="mt-12 bg-[#0d5c63] text-white px-12 py-4 rounded-full font-bold shadow-xl"
            >
              Return Home
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
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

      <Footer />

      <button 
        onClick={() => setShowConcierge(!showConcierge)}
        className="fixed bottom-8 right-8 z-50 bg-[#0d5c63] text-white p-4 rounded-full shadow-2xl hover:bg-[#0a4a50] transition-all transform hover:scale-110 flex items-center gap-2"
      >
        <div className="p-2 bg-white/10 rounded-full">
            <Sparkles size={18} />
        </div>
        <span className="hidden md:inline font-bold pr-2">Estate Concierge</span>
      </button>

      {showConcierge && <AIConcierge onClose={() => setShowConcierge(false)} />}
    </div>
  );
};

const Sparkles = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

export default App;
