
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronRight, ChevronLeft, Search } from 'lucide-react';

interface BookingWidgetProps {
  onBook?: (arrival: Date, departure: Date) => void;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ onBook }) => {
  const [showPicker, setShowPicker] = useState<'dates' | 'guests' | null>(null);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekLater = new Date(today);
  weekLater.setDate(today.getDate() + 7);

  const [arrivalDate, setArrivalDate] = useState<Date | null>(today);
  const [departureDate, setDepartureDate] = useState<Date | null>(weekLater);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setShowPicker(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateLabel = (date: Date | null) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) return 'Select date';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]}`;
  };

  const getDaysInMonth = (month: Date) => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const days = [];
    const firstDay = new Date(year, m, 1).getDay();
    const adjustedFirstDay = (firstDay === 0 ? 6 : firstDay - 1);
    const lastDay = new Date(year, m + 1, 0).getDate();

    for (let i = 0; i < adjustedFirstDay; i++) days.push(null);
    for (let i = 1; i <= lastDay; i++) days.push(new Date(year, m, i));
    return days;
  };

  const isSelected = (date: Date | null) => {
    if (!date) return null;
    const time = date.getTime();
    if (arrivalDate && arrivalDate instanceof Date && time === arrivalDate.getTime()) return 'start';
    if (departureDate && departureDate instanceof Date && time === departureDate.getTime()) return 'end';
    if (arrivalDate && departureDate && date > arrivalDate && date < departureDate) return 'range';
    return null;
  };

  const handleDateClick = (date: Date) => {
    if (!arrivalDate || (arrivalDate && departureDate)) {
      setArrivalDate(date);
      setDepartureDate(null);
    } else if (date < arrivalDate) {
      setArrivalDate(date);
      setDepartureDate(null);
    } else {
      setDepartureDate(date);
    }
  };

  const renderMonth = (monthOffset: number) => {
    const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const monthName = monthDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const days = getDaysInMonth(monthDate);

    return (
      <div className="flex-1">
        <h4 className="text-center text-slate-800 mb-6 text-sm font-bold">{monthName}</h4>
        <div className="grid grid-cols-7 text-[10px] font-medium text-slate-400 mb-2 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-0.5">
          {days.map((date, i) => {
            if (!date) return <div key={i} className="h-8" />;
            const status = isSelected(date);
            const isToday = date.getTime() === today.getTime();
            const isPast = date < today;
            
            return (
              <div
                key={i}
                onClick={() => !isPast && handleDateClick(date)}
                className={`
                  h-8 flex items-center justify-center cursor-pointer text-[11px] font-medium transition-all relative
                  ${status === 'start' ? 'bg-[#BC8F48] text-white rounded-md z-10' : ''}
                  ${status === 'end' ? 'bg-[#BC8F48] text-white rounded-md z-10' : ''}
                  ${status === 'range' ? 'bg-[#BC8F48]/10 text-[#BC8F48]' : 'text-slate-700 hover:bg-slate-50 rounded-md'}
                  ${isToday && !status ? 'text-[#BC8F48] font-bold' : ''}
                  ${isPast ? 'text-slate-200 cursor-not-allowed' : ''}
                `}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative z-[100]" ref={widgetRef}>
      {/* Search Bar - Mobile First Layout */}
      <div className="bg-white rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-stretch border border-slate-100 overflow-hidden p-3 md:px-2 md:py-2">
        
        {/* Mobile: Compact Grid Layout */}
        <div className="grid grid-cols-2 gap-2 md:hidden mb-3">
          {/* Location */}
          <div className="col-span-2 bg-slate-50 rounded-2xl p-3">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lokasi</p>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#BC8F48] shrink-0" />
              <span className="text-sm font-semibold text-slate-800 truncate">Tawangmangu, Karanganyar</span>
            </div>
          </div>
          
          {/* Arrival */}
          <div 
            className="bg-slate-50 rounded-2xl p-3 active:bg-slate-100 transition-colors"
            onClick={() => setShowPicker('dates')}
          >
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Arrival</p>
            <p className="text-xs font-bold text-slate-800">{formatDateLabel(arrivalDate)}</p>
          </div>
          
          {/* Departure */}
          <div 
            className="bg-slate-50 rounded-2xl p-3 active:bg-slate-100 transition-colors"
            onClick={() => setShowPicker('dates')}
          >
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Departure</p>
            <p className="text-xs font-bold text-slate-800">{formatDateLabel(departureDate)}</p>
          </div>
          
          {/* Guests */}
          <div 
            className="col-span-2 bg-slate-50 rounded-2xl p-3 active:bg-slate-100 transition-colors"
            onClick={() => setShowPicker('guests')}
          >
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Guests</p>
            <p className="text-sm font-bold text-slate-800">{adults + childrenCount} Travelers</p>
          </div>
        </div>
        
        {/* Mobile: Full Width Button */}
        <button 
          onClick={() => arrivalDate && departureDate && onBook?.(arrivalDate, departureDate)}
          className="md:hidden bg-[#BC8F48] hover:bg-[#A67B3D] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] w-full"
        >
          <Search size={18} /> Pesan Sekarang
        </button>
        
        {/* Desktop: Original Horizontal Layout */}
        <div className="hidden md:flex md:flex-row items-stretch flex-grow">
          {/* Locality */}
          <div className="flex-[1.5] border-r border-slate-100 p-4 md:p-5 md:pl-8">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Lokasi</p>
             <div className="flex items-center gap-2 text-sm text-slate-700">
               <MapPin size={14} className="text-[#BC8F48]" />
               <input type="text" defaultValue="Tawangmangu, Karanganyar" className="w-full bg-transparent focus:outline-none font-semibold text-slate-800" />
             </div>
          </div>

          {/* Check In */}
          <div 
            className="flex-1 border-r border-slate-100 p-4 md:p-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
            onClick={() => setShowPicker('dates')}
          >
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Arrival</p>
             <p className="text-sm font-bold text-slate-800">{formatDateLabel(arrivalDate)}</p>
          </div>

          {/* Check Out */}
          <div 
            className="flex-1 border-r border-slate-100 p-4 md:p-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
            onClick={() => setShowPicker('dates')}
          >
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Departure</p>
             <p className="text-sm font-bold text-slate-800">{formatDateLabel(departureDate)}</p>
          </div>

          {/* Rooms/Guests */}
          <div 
            className="flex-1 p-4 md:p-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
            onClick={() => setShowPicker('guests')}
          >
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Guests</p>
             <p className="text-sm font-bold text-slate-800">{adults + childrenCount} Travelers</p>
          </div>

          {/* Action Button - Fully Rounded */}
          <div className="p-2 flex items-center">
            <button 
              onClick={() => arrivalDate && departureDate && onBook?.(arrivalDate, departureDate)}
              className="bg-[#BC8F48] hover:bg-[#A67B3D] text-white px-10 h-full rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 w-full md:w-auto min-h-[56px]"
            >
              <Search size={18} /> Pesan
            </button>
          </div>
        </div>
      </div>

      {/* Date Picker Popover - Mobile Full Screen, Desktop Floating */}
      {showPicker === 'dates' && (
        <div className="fixed md:absolute inset-0 md:inset-auto md:top-full md:left-0 md:right-0 md:mt-4 bg-white md:rounded-[2.5rem] shadow-none md:shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-0 md:border md:border-slate-100 z-[200] flex flex-col">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-100 safe-top">
            <button 
              onClick={() => setShowPicker(null)}
              className="text-slate-400 font-bold text-sm"
            >
              Cancel
            </button>
            <h3 className="font-bold text-slate-800">Select Dates</h3>
            <button 
              onClick={() => setShowPicker(null)}
              className="text-[#BC8F48] font-bold text-sm"
            >
              Done
            </button>
          </div>
          
          <div className="flex-grow overflow-auto p-6 md:p-8">
            <div className="relative max-w-[600px] mx-auto">
               <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  className="absolute -left-2 md:-left-2 top-0 text-slate-300 hover:text-[#BC8F48] transition-colors p-2"
               >
                  <ChevronLeft size={20} />
               </button>
               <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  className="absolute -right-2 md:-right-2 top-0 text-slate-300 hover:text-[#BC8F48] transition-colors p-2"
               >
                  <ChevronRight size={20} />
               </button>

               <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                  {renderMonth(0)}
                  <div className="hidden md:block w-px bg-slate-50 my-4"></div>
                  <div className="md:hidden h-px bg-slate-100 w-full"></div>
                  {renderMonth(1)}
               </div>
            </div>
          </div>
          
          {/* Bottom Actions */}
          <div className="p-4 md:p-6 md:pt-6 border-t border-slate-100 bg-white" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-[#BC8F48]"></div>
                {arrivalDate && departureDate ? `${arrivalDate.toLocaleDateString('en-GB')} - ${departureDate.toLocaleDateString('en-GB')}` : 'Select your dates'}
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => { setArrivalDate(null); setDepartureDate(null); }}
                  className="flex-1 md:flex-none text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-800 py-3 md:py-0"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowPicker(null)}
                  className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-3 md:py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guests Picker Popover - Mobile Full Width Bottom Sheet */}
      {showPicker === 'guests' && (
        <div className="fixed md:absolute inset-x-0 bottom-0 md:inset-auto md:top-full md:right-0 md:mt-4 w-full md:w-72 bg-white rounded-t-[2rem] md:rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-slate-100 p-6 md:p-8 z-[200]">
          {/* Mobile Handle */}
          <div className="md:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Adults</p>
                <p className="text-[10px] text-slate-400 uppercase">Ages 13+</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#BC8F48] active:bg-slate-50 transition-all"><Minus size={16} /></button>
                <span className="font-bold text-lg w-6 text-center">{adults}</span>
                <button onClick={() => setAdults(Math.min(10, adults + 1))} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#BC8F48] active:bg-slate-50 transition-all"><Plus size={16} /></button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Children</p>
                <p className="text-[10px] text-slate-400 uppercase">Ages 2-12</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#BC8F48] active:bg-slate-50 transition-all"><Minus size={16} /></button>
                <span className="font-bold text-lg w-6 text-center">{childrenCount}</span>
                <button onClick={() => setChildrenCount(Math.min(10, childrenCount + 1))} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#BC8F48] active:bg-slate-50 transition-all"><Plus size={16} /></button>
              </div>
            </div>
          </div>
          <button onClick={() => setShowPicker(null)} className="w-full mt-8 bg-[#BC8F48] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest active:scale-[0.98] transition-all" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>Apply</button>
        </div>
      )}

      {showPicker && (
        <div 
          className="fixed inset-0 z-[-1] bg-black/5" 
          onClick={() => setShowPicker(null)}
        />
      )}
    </div>
  );
};

const Plus = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>;
const Minus = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>;

export default BookingWidget;
