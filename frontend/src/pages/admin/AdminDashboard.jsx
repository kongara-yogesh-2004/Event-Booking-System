import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import { Dialog } from '@headlessui/react'
import AdminCalendar from './AdminCalendar'

export default function AdminDashboard(){
  const [events,setEvents] = useState([])
  const [openNew,setOpenNew] = useState(false)
  const [form,setForm] = useState({ title:'', startTime:'', endTime:'', venue:'', description:'', price:199 })

  useEffect(()=>{ async function load(){ try{ const res = await api.get('/events'); setEvents(res.data.events || []) }catch(e){ console.warn(e) } } load() },[])

  async function create(){
    try{
      const payload = { ...form, tags:['demo'] }
      await api.post('/admin/events', payload)
      setOpenNew(false)
      const res = await api.get('/events'); setEvents(res.data.events || [])
    }catch(err){ alert(err.response?.data?.message || err.message) }
  }

  async function del(id){
    if(!confirm('Delete event?')) return
    try{ await api.delete(`/admin/events/${id}`); setEvents(events.filter(e=>e._id!==id)) }catch(e){ alert('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={()=>setOpenNew(true)} className="px-4 py-2 bg-indigo-600 rounded">Add Event</button>
      </div>
      <div className="mt-6 space-y-3">
        {events.map(ev => (
          <div key={ev._id} className="bg-slate-900 p-4 rounded flex justify-between">
            <div>
              <div className="font-semibold">{ev.title}</div>
              <div className="text-sm text-slate-400">{new Date(ev.startTime).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-64">
                <div className="h-3 bg-slate-800 rounded overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500" style={{width: `${Math.floor(Math.random()*100)}%`}} />
                </div>
              </div>
              <button onClick={()=>del(ev._id)} className="px-3 py-1 bg-red-600 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openNew} onClose={()=>setOpenNew(false)}>
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-slate-900 p-6 rounded max-w-xl w-full">
            <h3 className="text-lg font-bold">Create Event</h3>
            <div className="mt-4 space-y-3">
              <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full p-2 bg-slate-800 rounded" />
              <input placeholder="Start Time (ISO)" value={form.startTime} onChange={e=>setForm({...form,startTime:e.target.value})} className="w-full p-2 bg-slate-800 rounded" />
              <input placeholder="End Time (ISO)" value={form.endTime} onChange={e=>setForm({...form,endTime:e.target.value})} className="w-full p-2 bg-slate-800 rounded" />
              <input placeholder="Venue" value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})} className="w-full p-2 bg-slate-800 rounded" />
              <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full p-2 bg-slate-800 rounded" />
              <div className="flex justify-end gap-3 mt-3">
                <button onClick={()=>setOpenNew(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={create} className="px-4 py-2 bg-indigo-600 rounded">Create</button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
