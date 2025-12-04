import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export default function MyBookings(){
  const [bookings,setBookings]=useState([])
  useEffect(()=>{ async function load(){ try{ const res = await api.get('/user/bookings'); setBookings(res.data.bookings || []) }catch(e){ console.warn(e) }} load() },[])
  return (
    <div>
      <h3 className="text-xl font-bold">My Bookings</h3>
      <div className="mt-4 space-y-3">
        {bookings.map(b=> (
          <div key={b._id} className="bg-slate-900 p-4 rounded">{b.event?.title} • ₹{b.totalAmount}</div>
        ))}
        {bookings.length===0 && <div className="text-slate-400">No bookings yet.</div>}
      </div>
    </div>
  )
}
