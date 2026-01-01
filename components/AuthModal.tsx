
import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, UserPlus, LogIn } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialType = 'signin' }) => {
  const [authType, setAuthType] = useState<'signin' | 'signup'>(initialType);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header Image/Pattern */}
        <div className="h-32 bg-[#BC8F48] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center">
             <div className="bg-white px-8 py-3 rounded-t-3xl flex gap-8 shadow-sm">
                <button 
                  onClick={() => setAuthType('signin')}
                  className={`text-xs font-bold uppercase tracking-widest transition-all ${authType === 'signin' ? 'text-[#BC8F48]' : 'text-slate-300'}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setAuthType('signup')}
                  className={`text-xs font-bold uppercase tracking-widest transition-all ${authType === 'signup' ? 'text-[#BC8F48]' : 'text-slate-300'}`}
                >
                  Sign Up
                </button>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 pt-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-serif text-[#BC8F48] mb-2">
              {authType === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p className="text-slate-400 text-sm font-light">
              {authType === 'signin' 
                ? 'Enter your credentials to access your luxury escapes.' 
                : 'Join the world\'s most exclusive travel collective.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {authType === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-5 py-3.5 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                  placeholder="name@luxury.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-14 py-3.5 text-sm focus:outline-none focus:border-[#BC8F48] transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#BC8F48] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {authType === 'signin' && (
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-[#BC8F48] focus:ring-[#BC8F48]" />
                  <span className="text-xs text-slate-400 group-hover:text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-xs font-bold text-[#BC8F48] hover:underline">Forgot password?</button>
              </div>
            )}

            <button 
              className="w-full bg-[#BC8F48] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#BC8F48]/20 hover:bg-[#A67B3D] transition-all mt-4"
              onClick={() => {
                alert(`${authType === 'signin' ? 'Signing in' : 'Creating account'}...`);
                onClose();
              }}
            >
              {authType === 'signin' ? <LogIn size={18} /> : <UserPlus size={18} />}
              {authType === 'signin' ? 'Sign In to Estate' : 'Create My Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-300">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3.5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span className="text-xs font-bold text-slate-600">Facebook</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3.5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.693-2.459 1.096-4.04 1.096-3.373 0-6.233-2.29-7.213-5.397L.76 16.83C2.719 20.781 6.79 23.5 11.52 23.5c3.055 0 5.864-1.023 8.018-2.768l-3.498-2.719z"/><path fill="#4285F4" d="M23.5 12c0-.85-.078-1.67-.218-2.464h-11.76V14.15h6.7a5.727 5.727 0 0 1-2.484 3.75l3.5 2.72c2.046-1.889 3.262-4.67 3.262-8.62z"/><path fill="#FBBC05" d="M5.266 14.235A7.05 7.05 0 0 1 4.8 12c0-.783.136-1.535.385-2.235L1.16 6.65A11.93 11.93 0 0 0 0 12c0 1.92.453 3.733 1.258 5.34l4.008-3.105z"/></svg>
              <span className="text-xs font-bold text-slate-600">Google</span>
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-slate-400">
              {authType === 'signin' ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button"
                onClick={() => setAuthType(authType === 'signin' ? 'signup' : 'signin')}
                className="ml-2 font-bold text-[#BC8F48] hover:underline"
              >
                {authType === 'signin' ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
