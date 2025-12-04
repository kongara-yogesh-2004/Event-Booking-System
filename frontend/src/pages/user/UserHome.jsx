import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import EventCard from '../../components/EventCard'
import { fakeEvents } from '../../utils/fakeData'

export default function UserHome(){
  const [events,setEvents] = useState([])
  useEffect(()=>{ async function load(){ try{ const res = await api.get('/events'); setEvents(res.data.events || []) }catch(e){ console.warn(e); setEvents(fakeEvents()); }} load() },[])

  return (
    <div>
      <h2 className="text-2xl font-bold">Discover</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(ev => <EventCard key={ev._id || ev.id} event={ev} />)}
      </div>
    </div>
  )
}
