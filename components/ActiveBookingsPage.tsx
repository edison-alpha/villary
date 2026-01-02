import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Phone, MessageCircle, Navigation } from 'lucide-react';
import { Booking } from '../types';

interface ActiveBookingsPageProps {
  onBack: () => void;
}

const ActiveBookingsPage: React.FC<ActiveBookingsPageProps> = ({ onBack }) => {
  // Load bookings from localStorage and filter active ones
  const loadActiveBookings = (): Booking[] => {
    const saved = localStorage.getItem('villays_bookings');
    if (!saved) return [];
    const allBookings = JSON.parse(saved).map((b: any) => ({
      ...b,
      arrivalDate: new Date(b.arrivalDate),
      departureDate: new Date(b.departureDate),
      createdAt: new Date(b.createdAt),
    }));
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter: confirmed bookings where departure date is in the future
    return allBookings.filter((b: Booking) => 
      b.status === 'confirmed' && b.departureDate >= today
    );
  };

  const activeBookings = loadActiveBookings();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const calculateNights = (arrival: Date, departure: Date) => {
    return Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getDaysUntilCheckIn = (arrivalDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const arrival = new Date(arrivalDate);
    arrival.setHours(0, 0, 0, 0);
    const diff = Math.ceil((arrival.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getCheckInStatus = (arrivalDate: Date, departureDate: Date) => {
    const daysUntil = getDaysUntilCheckIn(arrivalDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (today >= arrivalDate && today <= departureDate) {
      return { text: 'Sedang Menginap', color: 'bg-green-500' };
    } else if (daysUntil === 0) {
      return { text: 'Check-in Hari Ini', color: 'bg-[#BC8F48]' };
    } else if (daysUntil === 1) {
      return { text: 'Check-in Besok', color: 'bg-amber-500' };
    } else if (daysUntil <= 7) {
      return { text: `${daysUntil} hari lagi`, color: 'bg-blue-500' };
    } else {
      return { text: `${daysUntil} hari lagi`, color: 'bg-slate-400' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-2 md:pt-32 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">Reservasi Aktif</h1>
          <div className="w-10"></div>
        </div>

        {activeBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={28} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Tidak Ada Reservasi Aktif</h3>
            <p className="text-sm text-slate-500">Anda belum memiliki reservasi yang akan datang. Pesan kamar sekarang untuk pengalaman menginap terbaik di Omah Turu.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeBookings.map((booking) => {
              const status = getCheckInStatus(booking.arrivalDate, booking.departureDate);
              return (
                <div key={booking.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                  {/* Status Banner */}
                  <div className={`${status.color} text-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-center`}>
                    {status.text}
                  </div>

                  <div className="p-4">
                    {/* Booking Code */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Kode Booking</p>
                        <p className="font-mono text-lg font-bold text-[#BC8F48]">{booking.bookingCode}</p>
                      </div>
                    </div>

                    {/* Villa & Room Info */}
                    <div className="bg-slate-50 rounded-xl p-4 mb-4">
                      <h3 className="font-semibold text-slate-800 text-lg">{booking.villaName}</h3>
                      <p className="text-sm text-slate-500 mb-3">{booking.suiteName}</p>
                      
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={14} />
                        <span>Yogyakarta, Indonesia</span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider mb-1">Check-in</p>
                        <p className="font-semibold text-slate-800 text-sm">{formatDate(booking.arrivalDate)}</p>
                        <p className="text-xs text-slate-500">14:00 WIB</p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-3">
                        <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider mb-1">Check-out</p>
                        <p className="font-semibold text-slate-800 text-sm">{formatDate(booking.departureDate)}</p>
                        <p className="text-xs text-slate-500">12:00 WIB</p>
                      </div>
                    </div>

                    {/* Duration & Total */}
                    <div className="flex items-center justify-between py-3 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Clock size={16} className="text-slate-400" />
                        <span>{calculateNights(booking.arrivalDate, booking.departureDate)} malam</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase">Total</p>
                        <p className="font-bold text-[#BC8F48]">Rp {booking.total.toLocaleString('id-ID')}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <button className="flex flex-col items-center gap-1 bg-slate-50 hover:bg-slate-100 rounded-xl py-3 transition-colors">
                        <Phone size={18} className="text-slate-600" />
                        <span className="text-[10px] font-medium text-slate-600">Hubungi</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 bg-slate-50 hover:bg-slate-100 rounded-xl py-3 transition-colors">
                        <MessageCircle size={18} className="text-slate-600" />
                        <span className="text-[10px] font-medium text-slate-600">Chat</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 bg-slate-50 hover:bg-slate-100 rounded-xl py-3 transition-colors">
                        <Navigation size={18} className="text-slate-600" />
                        <span className="text-[10px] font-medium text-slate-600">Navigasi</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveBookingsPage;
