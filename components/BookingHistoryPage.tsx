import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Booking } from '../types';

interface BookingHistoryPageProps {
  onBack: () => void;
}

const BookingHistoryPage: React.FC<BookingHistoryPageProps> = ({ onBack }) => {
  // Load bookings from localStorage
  const loadBookings = (): Booking[] => {
    const saved = localStorage.getItem('villays_bookings');
    if (!saved) return [];
    return JSON.parse(saved).map((b: any) => ({
      ...b,
      arrivalDate: new Date(b.arrivalDate),
      departureDate: new Date(b.departureDate),
      createdAt: new Date(b.createdAt),
    }));
  };

  const bookings = loadBookings();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-[10px] font-bold uppercase">
            <CheckCircle size={12} /> Dikonfirmasi
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-[10px] font-bold uppercase">
            <AlertCircle size={12} /> Menunggu
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-[10px] font-bold uppercase">
            <XCircle size={12} /> Dibatalkan
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const calculateNights = (arrival: Date, departure: Date) => {
    return Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));
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
          <h1 className="text-lg font-semibold text-slate-900">Riwayat Reservasi</h1>
          <div className="w-10"></div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={28} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Belum Ada Reservasi</h3>
            <p className="text-sm text-slate-500">Riwayat reservasi Anda akan muncul di sini setelah melakukan pemesanan kamar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Kode Booking</p>
                    <p className="font-mono font-bold text-[#BC8F48]">{booking.bookingCode}</p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="border-t border-slate-100 pt-3 mt-3">
                  <h3 className="font-semibold text-slate-800 mb-1">{booking.villaName}</h3>
                  <p className="text-sm text-slate-500 mb-3">{booking.suiteName}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-slate-400" />
                      <span>{formatDate(booking.arrivalDate)} - {formatDate(booking.departureDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-slate-400" />
                      <span>{calculateNights(booking.arrivalDate, booking.departureDate)} malam</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total</p>
                    <p className="font-bold text-slate-800">Rp {booking.total.toLocaleString('id-ID')}</p>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Dipesan: {booking.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryPage;
