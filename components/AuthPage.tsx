
import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { User } from '../types';

interface AuthPageProps {
  initialType: 'signin' | 'signup';
  onSwitch: (type: 'signin' | 'signup') => void;
  onBack: () => void;
  onAuthSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialType, onSwitch, onBack, onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated authentications
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: firstName || (initialType === 'signin' ? 'Eugene' : 'New'),
        lastName: lastName || (initialType === 'signin' ? 'Mendes' : 'Member'),
        email: email || 'user@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
        points: initialType === 'signin' ? 350 : 0
      };
      
      onAuthSuccess(mockUser);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Side */}
      <div className="hidden lg:block relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1510011564756-74938363f480?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxury Escape" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-20 left-20 right-20 text-white">
          <h2 className="text-5xl font-serif mb-6 leading-tight">Your elite sanctuary <br /> is waiting for you.</h2>
          <p className="text-white/60 text-lg font-light max-w-md italic">"Every detail at Villays is tailored for the world's most discerning guests."</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center px-6 md:px-20 py-20">
        <div className="w-full max-w-md">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-[#BC8F48] transition-colors mb-16"
          >
            <ArrowLeft size={14} /> Back to home
          </button>

          <div className="mb-12">
            <h1 className="text-5xl font-serif text-[#BC8F48] mb-4">
              {initialType === 'signin' ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className="text-slate-400 font-light">
              {initialType === 'signin' 
                ? 'Access your private portal and saved escapes.' 
                : 'Join our exclusive collective of global travelers.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {initialType === 'signup' && (
              <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-500">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                  <input 
                    type="text" required
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input 
                    type="text" required
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 py-4 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-14 py-4 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#BC8F48]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#BC8F48] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#BC8F48]/20 hover:bg-[#A67B3D] transition-all uppercase tracking-widest disabled:opacity-50"
            >
              {isLoading ? 'Verifying Credentials...' : (initialType === 'signin' ? <><LogIn size={20} /> Sign In</> : <><UserPlus size={20} /> Register</>)}
            </button>
          </form>

          <div className="text-center mt-12">
            <p className="text-sm text-slate-400 font-light">
              {initialType === 'signin' ? "Don't have an account yet?" : "Already have an account?"}
              <button 
                type="button"
                onClick={() => onSwitch(initialType === 'signin' ? 'signup' : 'signin')}
                className="ml-2 font-bold text-[#BC8F48] hover:underline uppercase tracking-widest text-xs"
              >
                {initialType === 'signin' ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
