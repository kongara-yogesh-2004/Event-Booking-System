import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import NavBar from '../../components/NavBar'
import AdminCalendar from './AdminCalendar';


export default function AdminApp(){
  return (
    <div>
      <NavBar admin />
      <div className="max-w-6xl mx-auto p-6 text-slate-100">
        <Routes>
          <Route path="/" element={<AdminDashboard/>} />
          <Route path="/calendar" element={<AdminCalendar/>} />
        </Routes>
      </div>
    </div>
  )
}
