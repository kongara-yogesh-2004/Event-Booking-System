// src/pages/admin/AdminCalendar.jsx
import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../../api/api'
import { Dialog } from '@headlessui/react'

export default function AdminCalendar(){
  const [events, setEvents] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title:'', startTime:'', endTime:'', venue:'', price:199, capacity:100 })
  const [selectedRange, setSelectedRange] = useState(null)

  useEffect(()=> load(new Date().toISOString(), new Date(Date.now()+7*24*60*60*1000).toISOString()), [])

  async function load(start, end){
    try{ const res = await api.get('/events/range', { params: { start, end } }); setEvents((res.data.events||[]).map(e=>({ id:e._id, title:e.title, start:e.startTime, end:e.endTime, extendedProps: e }))); }
    catch(e){ console.warn(e) }
  }

  function handleDateSelect(selectInfo){
    setSelectedRange(selectInfo);
    setForm({ title:'', startTime: selectInfo.startStr, endTime: selectInfo.endStr, venue:'', price:199, capacity:100})
    setOpen(true)
  }

  async function create(){
    try{
      const payload = { ...form, startTime: new Date(form.startTime).toISOString(), endTime: new Date(form.endTime).toISOString() }
      await api.post('/events', payload)
      setOpen(false)
      load(new Date().toISOString(), new Date(Date.now()+30*24*60*60*1000).toISOString())
    }catch(e){ alert('Create failed') }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Calendar</h2>
      </div>

      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
        eventClick={(info)=> {
          // open quick editor or view
          const data = info.event.extendedProps;
          // implement editing popup if needed
          alert(`${info.event.title}\n${new Date(info.event.start).toLocaleString()} - ${new Date(info.event.end).toLocaleString()}\nVenue: ${data.venue || 'N/A'}`)
        }}
      />

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <div className="fixed inset-0 bg-black/40"/>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-slate-900 p-6 rounded max-w-lg w-full">
            <h3 className="text-lg font-bold">Create Event</h3>
            <div className="mt-4 space-y-2">
              <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full p-2 bg-slate-800 rounded" />
              <div className="grid grid-cols-2 gap-2">
                <input type="datetime-local" value={form.startTime} onChange={e=>setForm({...form,startTime:e.target.value})} className="p-2 bg-slate-800 rounded" />
                <input type="datetime-local" value={form.endTime} onChange={e=>setForm({...form,endTime:e.target.value})} className="p-2 bg-slate-800 rounded" />
              </div>
              <input value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})} placeholder="Venue" className="w-full p-2 bg-slate-800 rounded" />
              <div className="flex gap-2">
                <input type="number" value={form.capacity} onChange={e=>setForm({...form, capacity: Number(e.target.value) })} className="p-2 bg-slate-800 rounded" />
                <input type="number" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value) })} className="p-2 bg-slate-800 rounded" />
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button onClick={()=>setOpen(false)} className="px-3 py-1 border rounded">Cancel</button>
                <button onClick={create} className="px-3 py-1 bg-indigo-600 rounded">Create</button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
