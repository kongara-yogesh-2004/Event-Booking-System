import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import SeatSelector from '../../components/SeatSelector'
import { fakeEvents } from '../../utils/fakeData'

export default function EventDetail(){
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [openSeats, setOpenSeats] = useState(false)

  useEffect(()=>{
    async function load(){
      try{
        const res = await api.get(`/events/${id}`)
        setEvent(res.data.event)
      }catch(err){
        const fe = fakeEvents().find(e=> (e._id===id)||(e.id===id))
        setEvent(fe||fakeEvents()[0])
      }
    }
    load()
  },[id])

  if(!event) return <div>Loading...</div>
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-slate-400">{(event.tags||[]).join(' • ')}</div>
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <div className="text-sm text-slate-400">{new Date(event.startTime).toLocaleString()} • {event.venue || 'Main Hall'}</div>
        </div>
        <div>
          <button onClick={()=>setOpenSeats(true)} className="px-4 py-2 bg-indigo-600 rounded">Select Seats</button>
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded">{event.description || 'No description'}</div>

      <SeatSelector open={openSeats} onClose={()=>setOpenSeats(false)} event={event} />
    </div>
  )
}
