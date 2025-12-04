import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import UserHome from './UserHome'
import EventDetail from './EventDetail'
import MyBookings from './MyBookings'
import Notifications from './Notifications'
import BookingSuccess from './BookingSuccess'
import UserCalendar from './UserCalendar';


export default function UserApp(){
  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto p-6 text-slate-100">
        <Routes>
          <Route path="/" element={<UserHome/>} />
          <Route path="/events/:id" element={<EventDetail/>} />
          <Route path="/calendar" element={<UserCalendar/>} />
          <Route path="/bookings" element={<MyBookings/>} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/booking/success" element={<BookingSuccess/>} />
        </Routes>
      </div>
    </div>
  )
}
