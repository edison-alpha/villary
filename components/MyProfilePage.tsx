
import React, { useState, useRef } from 'react';
import { User, Camera, Mail, Shield, CreditCard, LogOut, ArrowLeft, Check, Trash2, ChevronRight, Bell, HelpCircle, Info, Heart, Bookmark, Clock, Settings } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<string | null>(null);
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
    <div className="min-h-screen bg-slate-50 pt-2 md:pt-32 pb-32 md:pb-40">
      <div className="max-w-lg mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-6">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">Settings</h1>
          <div className="w-10"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-slate-100">
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 bg-[#0d5c63] text-white rounded-full shadow-lg"
              >
                <Camera size={12} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-base font-semibold text-slate-900">{firstName} {lastName}</h2>
              <p className="text-sm text-slate-500">{email}</p>
              <p className="text-xs text-[#0d5c63] font-medium mt-0.5">{user.points} Points</p>
            </div>
            <button 
              onClick={() => setActiveSection(activeSection === 'edit' ? null : 'edit')}
              className="text-[#0d5c63] text-sm font-semibold"
            >
              Edit
            </button>
          </div>
          
          {/* Edit Profile Form - Expandable */}
          {activeSection === 'edit' && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in slide-in-from-top duration-200">
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c63]/20"
                />
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c63]/20"
                />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c63]/20"
              />
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-[#0d5c63] text-white py-3 rounded-xl font-semibold text-sm active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : (showSuccess ? '✓ Saved' : 'Save Changes')}
              </button>
            </div>
          )}
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Account Section */}
          <SettingsSection title="Account">
            <SettingsItem icon={<User size={20} />} label="Personal Information" />
            <SettingsItem icon={<Shield size={20} />} label="Security & Privacy" />
            <SettingsItem icon={<Bell size={20} />} label="Notifications" />
          </SettingsSection>

          {/* Payments Section */}
          <SettingsSection title="Payments">
            <SettingsItem icon={<CreditCard size={20} />} label="Payment Methods" />
            <SettingsItem icon={<Clock size={20} />} label="Booking History" />
            <SettingsItem icon={<Bookmark size={20} />} label="Saved Properties" />
          </SettingsSection>

          {/* Preferences Section */}
          <SettingsSection title="Preferences">
            <SettingsItem icon={<Heart size={20} />} label="Favorites" />
            <SettingsItem icon={<Settings size={20} />} label="App Settings" />
          </SettingsSection>

          {/* Support Section */}
          <SettingsSection title="Support">
            <SettingsItem icon={<HelpCircle size={20} />} label="Help Center" />
            <SettingsItem icon={<Info size={20} />} label="About Villays" />
          </SettingsSection>

          {/* Logout & Delete */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-4 py-4 text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>

          <button className="w-full text-center text-red-400 text-xs font-medium py-4 hover:text-red-500 transition-colors">
            Delete Account
          </button>
        </div>

        {/* App Version */}
        <p className="text-center text-slate-300 text-xs mt-8">Villays v1.0.0</p>
      </div>
    </div>
  );
};

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div>
    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">{title}</h3>
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
      {children}
    </div>
  </div>
);

const SettingsItem = ({ icon, label, value, danger = false }: { icon: React.ReactNode, label: string, value?: string, danger?: boolean }) => (
  <button className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50 transition-colors ${danger ? 'text-red-500' : ''}`}>
    <span className={danger ? 'text-red-500' : 'text-slate-400'}>{icon}</span>
    <span className={`flex-grow text-left text-sm ${danger ? 'text-red-500 font-medium' : 'text-slate-700'}`}>{label}</span>
    {value && <span className="text-sm text-slate-400">{value}</span>}
    <ChevronRight size={18} className="text-slate-300" />
  </button>
);

export default MyProfilePage;
