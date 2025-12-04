import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Search, 
  User, 
  LogOut, 
  Ticket, 
  Plus, 
  Clock, 
  CreditCard, 
  CheckCircle, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Trash2,
  Loader,
  Lock,
  ArrowRight,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

// --- HELPER FUNCTIONS ---
const formatDateForComparison = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// --- COMPONENTS ---

const IslandNavbar = ({ activeTab, setActiveTab, user, onLogout }) => (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90%]">
    <nav className="bg-white/80 backdrop-blur-xl shadow-xl shadow-orange-500/10 rounded-full px-6 py-3 flex items-center gap-6 border border-white/20">
      <div className="flex items-center gap-2 mr-4 cursor-pointer" onClick={() => setActiveTab('home')}>
        <div className="w-8 h-8 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
          E
        </div>
        <span className="font-bold text-gray-800 text-lg tracking-tight hidden sm:block">EventBooker</span>
      </div>

      <div className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full">
        {['home', 'events', 'my-bookings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-white text-orange-600 shadow-md' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab === 'my-bookings' ? 'My Bookings' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
        <button 
          onClick={() => setActiveTab('notifications')}
          className={`p-2 transition-colors relative ${activeTab === 'notifications' ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-medium border border-white shadow-sm ring-2 ring-transparent hover:ring-orange-200 transition-all cursor-pointer">
          {user ? user.name[0].toUpperCase() : <User size={16} />}
        </div>
        {user && (
          <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        )}
      </div>
    </nav>
  </div>
);

const HeroSection = ({ onBrowse }) => (
  <div className="relative w-full h-[85vh] rounded-b-[3rem] overflow-hidden shadow-2xl mx-auto max-w-[98%] mt-2">
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
      style={{ backgroundImage: 'url("/images/music.jpg")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </div>
    
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pt-20">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
        Discover Your Next <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
          Unforgettable Experience
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 font-light leading-relaxed">
        Book tickets to the best concerts, festivals, and parties in town. 
        Your next great memory is just a click away.
      </p>
      <button 
        onClick={onBrowse}
        className="group px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 transform hover:-translate-y-1 flex items-center gap-2"
      >
        Browse Events
        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const CalendarWidget = ({ selectedDate, setSelectedDate, events = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // Default to Dec 2025

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleDateClick = (day) => {
    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = formatDateForComparison(dateObj);
    setSelectedDate(selectedDate === dateString ? null : dateString);
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-100 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-gray-800">{monthName}</h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={16} /></button>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map(d => <span key={d} className="text-center text-xs font-semibold text-gray-400">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, idx) => {
          const dateStr = day ? formatDateForComparison(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)) : null;
          let isSelected = selectedDate === dateStr;
          
          const hasEvent = day && events.some(e => e.date === dateStr);

          return (
            <button
              key={idx}
              disabled={!day}
              onClick={() => day && handleDateClick(day)}
              className={`
                h-8 w-8 rounded-full flex flex-col items-center justify-center text-sm transition-all duration-200 relative
                ${!day ? 'invisible' : ''}
                ${isSelected ? 'bg-orange-500 text-white shadow-lg scale-110' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'}
              `}
            >
              <span>{day}</span>
              {hasEvent && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 bg-orange-500 rounded-full"></span>
              )}
              {hasEvent && isSelected && (
                <span className="absolute bottom-1 w-1 h-1 bg-white rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <button onClick={() => setSelectedDate(null)} className="text-xs text-orange-500 font-medium hover:underline">Reset Filter</button>
      </div>
    </div>
  );
};

const EventCard = ({ event, onClick, isReminded, onToggleReminder }) => (
  <div 
    onClick={() => onClick(event)} 
    className="group bg-white rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
  >
    <div className="relative h-48 overflow-hidden bg-gray-200">
      {event.image ? (
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
      )}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm uppercase tracking-wide">
        {event.category || 'Event'}
      </div>
      
      {/* Reminder Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleReminder();
        }}
        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all z-10 shadow-sm ${isReminded ? 'bg-orange-500 text-white' : 'bg-white/30 text-white hover:bg-white hover:text-orange-500'}`}
        title={isReminded ? "Remove Reminder" : "Set Reminder"}
      >
        <Bell size={18} fill={isReminded ? "currentColor" : "none"} />
      </button>
    </div>
    
    <div className="p-5 flex flex-col flex-grow">
      <div className="text-orange-500 text-sm font-semibold mb-2 flex items-center gap-1">
        <Calendar size={14} /> {event.date} <span className="mx-1">•</span> <Clock size={14} /> {event.time}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-orange-500 transition-colors">{event.title}</h3>
      <p className="text-gray-500 text-sm mb-4 flex items-center gap-1 truncate"><MapPin size={14} /> {event.venue}</p>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
        <span className="text-2xl font-bold text-gray-900">${event.price}</span>
        <button className="px-4 py-2 bg-orange-100 text-orange-600 text-sm font-semibold rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">Book Now</button>
      </div>
    </div>
  </div>
);

const RingChart = ({ total = 30, current = 0, size = 40, stroke = 4 }) => {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = total === 0 ? 0 : (current / total) * 100;
  const dashoffset = circumference - (progress / 100) * circumference;
  
  let color = "text-green-500";
  if (progress > 50) color = "text-yellow-500";
  if (progress > 85) color = "text-red-500";

  return (
    <div className="relative flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={stroke} fill="transparent" className="text-gray-200" />
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={stroke} fill="transparent" strokeDasharray={circumference} strokeDashoffset={dashoffset} className={`${color} transition-all duration-500`} />
      </svg>
      <span className="absolute text-[8px] font-bold text-gray-700">{Math.round(progress)}%</span>
    </div>
  )
};

const SeatGrid = ({ onSelect, selectedSeats, occupiedSeats = [] }) => {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5, 6];

  return (
    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
      <div className="w-full h-2 bg-orange-300 rounded-full mb-1 opacity-50 mx-auto max-w-xs"></div>
      <div className="text-center text-xs text-gray-400 mb-8 tracking-widest uppercase">Stage</div>
      
      <div className="mb-8 flex flex-col items-center gap-2">
        {rows.map(row => (
          <div key={row} className="flex justify-center gap-3">
             {cols.map(col => {
                const seatId = `${row}${col}`;
                const isBooked = occupiedSeats.includes(seatId); 
                const isSelected = selectedSeats.includes(seatId);
                
                let statusClass = "bg-green-400 hover:bg-green-500 cursor-pointer text-white shadow-sm";
                if (isBooked) statusClass = "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"; 
                if (isSelected) statusClass = "bg-orange-500 shadow-lg ring-2 ring-orange-200 scale-105 text-white";

                return (
                  <div 
                    key={seatId} 
                    onClick={() => !isBooked && onSelect(seatId)} 
                    className={`w-10 h-10 rounded-xl transition-all duration-200 flex items-center justify-center text-xs font-bold ${statusClass}`}
                  >
                     {isBooked ? <X size={14} /> : seatId}
                  </div>
                );
             })}
          </div>
        ))}
      </div>
      
       <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded-md"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-md"></div>
          <span className="text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-md border border-gray-300"></div>
          <span className="text-gray-400">Booked</span>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ event, user, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSeat = (id) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter(s => s !== id));
    } else {
      setSelectedSeats([...selectedSeats, id]);
    }
  };

  const totalAmount = (selectedSeats.length * event.price * 1.05).toFixed(2);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/bookings/create-checkout-session`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` 
        },
        body: JSON.stringify({
          eventId: event._id,
          seats: selectedSeats.length,
          seatIds: selectedSeats 
        })
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.url; 
      } else {
        alert('Checkout Failed: ' + data.message);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Network error during checkout.');
      setIsProcessing(false);
    } 
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-[2rem] w-full max-w-5xl h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10">
          <X size={20} className="text-gray-600" />
        </button>

        {/* Left Side: Summary */}
        <div className="w-full md:w-1/3 bg-gray-50 p-8 flex flex-col border-r border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h2>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Calendar className="text-orange-500" size={16} /> {event.date} | {event.time}
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <MapPin className="text-orange-500" size={16} /> {event.venue}
              </div>
            </div>
          </div>
          <div className="mt-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between mb-2 text-gray-600">
              <span>{selectedSeats.length} x Tickets</span>
              <span>${(selectedSeats.length * event.price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Fees</span>
              <span>${(selectedSeats.length * event.price * 0.05).toFixed(2)}</span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-center">
              <span className="font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-orange-600">${totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interaction */}
        <div className="w-full md:w-2/3 p-8 bg-white flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Select Seats</h3>
            <span className="text-sm text-gray-500">{selectedSeats.length} selected</span>
          </div>
          
          <SeatGrid 
             onSelect={toggleSeat} 
             selectedSeats={selectedSeats} 
             occupiedSeats={event.bookedSeatIds || []} 
          />
          
          <div className="mt-auto pt-8 border-t border-gray-100">
            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 mb-6">
               <div className="p-1 bg-blue-100 rounded-full text-blue-600 mt-0.5"><Lock size={14} /></div>
               <div>
                  <p className="text-sm font-semibold text-blue-900">Secure Checkout with Stripe</p>
                  <p className="text-xs text-blue-700">You will be redirected to Stripe to complete your payment safely.</p>
               </div>
            </div>
            <div className="flex justify-end gap-4">
               <button onClick={onClose} className="px-6 py-4 text-gray-500 font-semibold hover:text-gray-800 transition-colors">Cancel</button>
               <button 
                disabled={selectedSeats.length === 0 || isProcessing}
                onClick={handleCheckout}
                className="px-10 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-orange-600 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {isProcessing ? 'Redirecting...' : 'Checkout with Stripe'} <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ onClose, bookingRef }) => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in-up">
    <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-pulse">
        <CheckCircle size={48} />
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Your booking has been confirmed. You can view your tickets in the My Bookings tab.
      </p>
      {bookingRef && (
        <div className="bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
           <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Booking Reference</div>
           <div className="text-xl font-mono font-bold text-gray-800">#{bookingRef}</div>
        </div>
      )}
      <div className="flex gap-4 justify-center">
        <button onClick={onClose} className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl font-bold shadow-xl hover:bg-black transition-all">
          View My Bookings
        </button>
      </div>
    </div>
  </div>
);

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URL}/bookings/${user.id}`, {
           headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if(res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user.id, user.token]);

  if(loading) return <div className="pt-32 text-center">Loading bookings...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h2>
      <p className="text-gray-500 mb-10">View and manage all your event reservations.</p>
      
      {bookings.length === 0 ? (
         <div className="text-center py-20 bg-gray-50 rounded-3xl">
           <p className="text-gray-500">You haven't booked any events yet.</p>
         </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const event = booking.eventId || {}; 
            let badgeColor = "bg-green-100 text-green-700";

            return (
              <div key={booking._id} className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center">
                <img src={event.image || '/images/default.jpg'} alt={event.title} className="w-full md:w-48 h-32 object-cover rounded-xl" />
                <div className="flex-grow text-center md:text-left">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${badgeColor}`}>
                    {booking.status}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {event.date} at {event.time}
                  </p>
                  <p className="text-sm text-gray-400">{event.venue}</p>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                   <div className="text-center md:text-right mb-2">
                     <span className="block text-xs text-gray-400">Booking Ref</span>
                     <span className="font-mono font-bold text-gray-700">{booking.bookingRef}</span>
                   </div>
                   <div className="text-xs text-gray-400 text-right">
                      Seats: {booking.seatIds ? booking.seatIds.join(', ') : 'General'}
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${API_URL}/notifications/${user.id}`, {
           headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if(res.ok) {
          setNotifications(await res.json());
        }
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  if(loading) return <div className="pt-32 text-center">Loading notifications...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Notifications</h2>
      <div className="space-y-4">
        {notifications.map(note => (
          <div key={note.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 ${note.type === 'promo' ? 'bg-purple-500' : note.type === 'system' ? 'bg-blue-500' : 'bg-orange-500'}`}>
              <Bell size={18} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">{note.title}</h4>
              <p className="text-gray-600 leading-relaxed mb-2">{note.message}</p>
              <span className="text-xs text-gray-400">{note.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = ({ user, onLogout }) => {
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '', venue: '', date: '', price: '', category: '', totalSeats: '', image: '', time: ''
  });

  const loadEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/events`);
      if(res.ok) setEvents(await res.json());
    } catch(e) { console.error(e); }
  };

  useEffect(() => { loadEvents(); }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` 
        },
        body: JSON.stringify({ ...newEvent, image: "/images/default.jpg" }) 
      });
      if(res.ok) {
        setShowCreateForm(false);
        loadEvents();
      } else {
        alert('Failed to create event.');
      }
    } catch(e) { alert('Failed to create event'); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${API_URL}/events/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if(res.ok) loadEvents();
    } catch(e) { alert('Failed to delete'); }
  };

  const displayedEvents = selectedDate ? events.filter(e => e.date === selectedDate) : events;

  return (
    <div className="flex min-h-screen pt-24 bg-gray-50/50">
      <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6 fixed h-full top-0 left-0 pt-24 z-10">
        <div className="flex items-center gap-3 mb-10 px-2">
           <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">{user.name[0]}</div>
           <div><h4 className="font-bold text-gray-800">{user.name}</h4><p className="text-xs text-gray-500">Administrator</p></div>
        </div>
        <nav className="space-y-2 flex-grow"><button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-orange-50 text-orange-600"><Calendar size={18} /> Events</button></nav>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-colors mt-auto"><LogOut size={18} /> Logout</button>
      </div>

      <div className="flex-1 md:ml-64 p-8 flex gap-8">
        <div className="flex-1">
        {!showCreateForm ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div><h2 className="text-3xl font-bold text-gray-900">Event Dashboard</h2><p className="text-gray-500 mt-1">Manage and view all upcoming events.</p></div>
              <button onClick={() => setShowCreateForm(true)} className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-colors flex items-center gap-2"><Plus size={18} /> Add New Event</button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-medium"><tr><th className="px-6 py-4">Image</th><th className="px-6 py-4">Event Title</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Occupancy</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {displayedEvents.length === 0 ? (<tr><td colSpan="6" className="text-center py-8 text-gray-400">No events found for this date.</td></tr>) : (
                        displayedEvents.map(event => (
                        <tr key={event._id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4"><img src={event.image || '/images/default.jpg'} alt={event.title} className="w-10 h-10 rounded-lg object-cover shadow-sm border border-gray-100" /></td>
                            <td className="px-6 py-4 font-medium text-gray-800">{event.title}</td>
                            <td className="px-6 py-4 text-gray-500">{event.date}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <RingChart total={event.totalSeats || 30} current={event.bookedSeats || 0} size={36} />
                                   <span className="text-xs text-gray-500">{event.bookedSeats || 0}/{event.totalSeats || 30}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">{event.status}</span></td>
                            <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(event._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button></td>
                        </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-4xl animate-fade-in-up">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Create New Event</h2>
                <div className="flex gap-2"><button onClick={() => setShowCreateForm(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button><button onClick={handleCreate} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Create Event</button></div>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label><input value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" placeholder="Enter event name" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Venue</label><input value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><input value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" /></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" /></div>
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">Time</label><input type="text" placeholder="10:00 AM" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label><input type="number" value={newEvent.price} onChange={e => setNewEvent({...newEvent, price: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" /></div>
                </div>
                 <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label><input type="number" value={newEvent.totalSeats} onChange={e => setNewEvent({...newEvent, totalSeats: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none" /></div>
             </div>
          </div>
        )}
        </div>
        <div className="w-80 hidden lg:block">
           <CalendarWidget selectedDate={selectedDate} setSelectedDate={setSelectedDate} events={events} />
           <div className="mt-4 bg-white p-4 rounded-2xl border border-gray-200 text-sm text-gray-600"><p className="font-bold mb-2">Instructions</p><p>Select a date to filter the events list. Click reset to see all events.</p></div>
        </div>
      </div>
    </div>
  );
};

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('user'); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = { ...formData, role: selectedRole };
    try {
      const res = await fetch(`${API_URL}${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if(res.ok) { onLogin({ ...data.user, token: data.token }); } else { setError(data.message || 'Authentication failed'); }
    } catch (err) { console.warn("Server unreachable"); setError("Cannot connect to server. Please ensure the backend is running."); }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-400 to-amber-500 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 text-white max-w-lg">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 border border-white/30"><Ticket size={32} className="text-white" /></div>
          <h1 className="text-5xl font-bold mb-6">Experience the best events in your city.</h1>
          <p className="text-lg text-orange-100 font-light leading-relaxed">Join thousands of users who trust EventBooker for their entertainment needs. Secure, fast, and reliable.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8 animate-fade-in-up">
          <div className="text-center lg:text-left"><h2 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2><p className="text-gray-500">{isLogin ? 'Log in to your account to continue.' : 'Sign up to start booking tickets.'}</p></div>
          <div className="bg-gray-100 p-1 rounded-xl flex mb-6">
            <button onClick={() => setSelectedRole('user')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${selectedRole === 'user' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>User</button>
            <button onClick={() => setSelectedRole('admin')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${selectedRole === 'admin' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Admin <Lock size={12} /></button>
          </div>
          <div className="space-y-6">
            {!isLogin && (<div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 outline-none" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>)}
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 outline-none" placeholder={selectedRole === 'admin' ? "admin@event.com" : "Enter your email"} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 outline-none pr-12" 
                  placeholder="Enter your password" 
                  value={formData.password} 
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleSubmit} className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all">{isLogin ? `Login as ${selectedRole === 'admin' ? 'Admin' : 'User'}` : 'Sign Up'}</button>
          </div>
          <p className="text-center text-sm text-gray-500"><button onClick={() => setIsLogin(!isLogin)} className="font-bold text-orange-500 hover:underline">{isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}</button></p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function EventApp() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successBookingRef, setSuccessBookingRef] = useState(null);
  const [reminders, setReminders] = useState([]);

  // AUTH PERSISTENCE
  useEffect(() => {
    const storedUser = localStorage.getItem('event_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const savedReminders = localStorage.getItem('event_reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  const handleLogin = (u) => {
    localStorage.setItem('event_user', JSON.stringify(u));
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem('event_user');
    setUser(null);
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/events`);
      if(res.ok) { setEvents(await res.json()); } else { throw new Error('Server not responding'); }
    } catch (err) { console.warn("Backend not running or Error fetching"); } finally { setLoading(false); }
  };

  useEffect(() => {
    if (user) {
        fetchEvents();
        if(user.role === 'admin') setActiveTab('admin');
        else setActiveTab('home');
    }
  }, [user]);

  // Reminder Toggle
  const toggleReminder = (eventId) => {
    const newReminders = reminders.includes(eventId)
      ? reminders.filter(id => id !== eventId)
      : [...reminders, eventId];
    setReminders(newReminders);
    localStorage.setItem('event_reminders', JSON.stringify(newReminders));
  };

  // Handle Stripe Redirection Return
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');
    const success = query.get('success');

    if (success && sessionId && user && !showSuccessModal) {
      // Verify payment with backend
      const verifyPayment = async () => {
        try {
          const res = await fetch(`${API_URL}/bookings/verify-payment`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}` 
            },
            body: JSON.stringify({ sessionId })
          });
          const data = await res.json();
          if (res.ok) {
            setSuccessBookingRef(data.booking.bookingRef);
            setShowSuccessModal(true);
            setActiveTab('my-bookings');
            // Re-fetch events to update booked seat counts immediately
            fetchEvents();
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } catch (err) {
          console.error("Payment verification failed", err);
        }
      };
      verifyPayment();
    }
  }, [user, showSuccessModal]); // Run when user is loaded

  const filteredEvents = selectedDate ? events.filter(e => e.date === selectedDate) : events;

  const renderContent = () => {
    if (!user) return <AuthPage onLogin={handleLogin} />;
    switch (activeTab) {
      case 'home':
        return (
          <div className="pb-20">
            <HeroSection onBrowse={() => setActiveTab('events')} />
            <div className="max-w-7xl mx-auto px-4 mt-20">
               <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Events</h2>
               {loading ? (<div className="text-center py-20"><Loader className="animate-spin mx-auto text-orange-500" /></div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{events.slice(0, 4).map(event => (<EventCard key={event._id} event={event} onClick={setSelectedEvent} isReminded={reminders.includes(event._id)} onToggleReminder={() => toggleReminder(event._id)} />))} {events.length === 0 && <p className="text-gray-500">No events found. Make sure the backend is running!</p>}</div>)}
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-24 mb-20 bg-gray-50 rounded-[3rem] p-12 text-center"><h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2><div className="grid md:grid-cols-3 gap-8 mt-12">{[{ icon: Search, title: "1. Discover Events", desc: "Browse through our curated list of top events to find what excites you." }, { icon: Ticket, title: "2. Book Securely", desc: "Our secure payment process ensures your transaction is safe and simple." }, { icon: CheckCircle, title: "3. Enjoy the Show", desc: "Get your tickets, mark your calendar, and get ready for an amazing time." }].map((item, i) => (<div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-left hover:shadow-lg transition-shadow"><div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-4"><item.icon size={24} /></div><h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3><p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p></div>))}</div></div>
          </div>
        );
      case 'events':
        return (
          <div className="pt-32 pb-12 px-4 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-80 flex-shrink-0 space-y-8">
               <div className="relative"><input placeholder="Search events..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-200 outline-none" /><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /></div>
               <CalendarWidget selectedDate={selectedDate} setSelectedDate={setSelectedDate} events={events} />
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"><h3 className="font-bold text-gray-800 mb-4">Categories</h3><div className="flex flex-wrap gap-2">{['All', 'Music', 'Sports', 'Arts', 'Workshops', 'Business'].map(cat => (<button key={cat} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors">{cat}</button>))}</div></div>
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-end mb-8"><div><h2 className="text-3xl font-bold text-gray-900">Discover Amazing Events</h2><p className="text-gray-500 mt-1">{selectedDate ? `Showing events for ${selectedDate}` : "Find popular and trending events near you."}</p></div></div>
               {loading ? (<div className="flex justify-center py-20"><Loader className="animate-spin text-orange-500" /></div>) : (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{filteredEvents.map(event => (<div key={event._id} className="h-full"><EventCard event={event} onClick={setSelectedEvent} isReminded={reminders.includes(event._id)} onToggleReminder={() => toggleReminder(event._id)} /></div>))}{filteredEvents.length === 0 && (<div className="col-span-full text-center py-10 bg-gray-50 rounded-2xl text-gray-500">No events found {selectedDate && "for this date"}.</div>)}</div>)}
            </div>
          </div>
        );
      case 'notifications': return <Notifications user={user} />;
      case 'my-bookings': return <MyBookings user={user} />;
      case 'admin': return <AdminDashboard user={user} onLogout={handleLogout} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      {user && activeTab !== 'admin' && (<IslandNavbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />)}
      <main>{renderContent()}</main>
      {selectedEvent && (<BookingModal event={selectedEvent} user={user} onClose={() => setSelectedEvent(null)} />)}
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} bookingRef={successBookingRef} />}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}