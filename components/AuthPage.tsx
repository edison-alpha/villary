
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
          <h2 className="text-4xl font-serif mb-4 leading-tight">Selamat datang di <br /> Omah Turu</h2>
          <p className="text-white/60 text-base font-light max-w-md">"Pengalaman menginap terbaik dengan kenyamanan seperti di rumah sendiri."</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center px-5 md:px-16 py-8 md:py-16">
        <div className="w-full max-w-sm">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 font-medium text-xs uppercase tracking-wider hover:text-[#BC8F48] transition-colors mb-8 md:mb-12"
          >
            <ArrowLeft size={14} /> Kembali
          </button>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[#BC8F48] mb-2">
              {initialType === 'signin' ? 'Masuk' : 'Daftar'}
            </h1>
            <p className="text-slate-400 text-sm">
              {initialType === 'signin' 
                ? 'Masuk untuk melihat reservasi Anda.' 
                : 'Buat akun untuk mulai memesan kamar.'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {initialType === 'signup' && (
              <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-4 duration-500">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider ml-1">Nama Depan</label>
                  <input 
                    type="text" required
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider ml-1">Nama Belakang</label>
                  <input 
                    type="text" required
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider ml-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#BC8F48]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#BC8F48] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#BC8F48]/20 hover:bg-[#A67B3D] transition-all text-sm disabled:opacity-50 mt-6"
            >
              {isLoading ? 'Memproses...' : (initialType === 'signin' ? <><LogIn size={18} /> Masuk</> : <><UserPlus size={18} /> Daftar</>)}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-400">
              {initialType === 'signin' ? "Belum punya akun?" : "Sudah punya akun?"}
              <button 
                type="button"
                onClick={() => onSwitch(initialType === 'signin' ? 'signup' : 'signin')}
                className="ml-2 font-semibold text-[#BC8F48] hover:underline"
              >
                {initialType === 'signin' ? 'Daftar' : 'Masuk'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
