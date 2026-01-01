
import React, { useState, useRef } from 'react';
import { User, Camera, Mail, Shield, CreditCard, LogOut, ArrowLeft, Check, Trash2 } from 'lucide-react';
import { User as UserType } from '../types';

interface MyProfilePageProps {
  user: UserType;
  onUpdate: (updatedUser: UserType) => void;
  onLogout: () => void;
  onBack: () => void;
}

const MyProfilePage: React.FC<MyProfilePageProps> = ({ user, onUpdate, onLogout, onBack }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onUpdate({
        ...user,
        firstName,
        lastName,
        email,
        avatar
      });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] pt-32 pb-40">
      <div className="max-w-5xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] hover:text-[#0d5c63] transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to sanctuary
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 space-y-2">
            <h1 className="text-4xl font-serif text-slate-800 mb-8">Account Settings</h1>
            <nav className="space-y-1">
              <ProfileNavLink icon={<User size={18}/>} label="Personal Information" active />
              <ProfileNavLink icon={<Shield size={18}/>} label="Security & Privacy" />
              <ProfileNavLink icon={<CreditCard size={18}/>} label="Billing & Payments" />
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-xs uppercase tracking-widest mt-8"
              >
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>

          {/* Main Form Content */}
          <main className="flex-grow">
            <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-slate-100">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center mb-16">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-3 bg-[#0d5c63] text-white rounded-full shadow-lg hover:scale-110 transition-all"
                  >
                    <Camera size={18} />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                  />
                </div>
                <div className="text-center mt-6">
                  <h3 className="text-xl font-serif font-bold text-slate-800">{firstName} {lastName}</h3>
                  <p className="text-[10px] text-[#0d5c63] font-bold uppercase tracking-widest mt-1">{user.points} Villays Points</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#0d5c63] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#0d5c63] transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 py-4 text-sm focus:outline-none focus:border-[#0d5c63] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between pt-10 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                  <Trash2 size={14} className="cursor-pointer hover:text-red-400" /> Delete My Account
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={onBack}
                    className="px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800"
                  >
                    Discard Changes
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-[#0d5c63] text-white px-10 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-[#0d5c63]/20 hover:bg-[#0a4a50] transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving ? 'Synchronizing...' : (showSuccess ? <><Check size={14}/> Saved</> : 'Update Profile')}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const ProfileNavLink = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-4 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${active ? 'bg-[#0d5c63] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}>
    <span className={active ? 'text-white' : 'text-slate-400'}>{icon}</span>
    {label}
  </button>
);

export default MyProfilePage;
