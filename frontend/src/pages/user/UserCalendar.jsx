import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'

export default function UserCalendar(){
  const [events, setEvents] = useState([])
  const nav = useNavigate()
  const calendarRef = useRef(null)

  useEffect(() => {
    let mounted = true

    async function loadRange(start, end){
      try{
        const res = await api.get('/events/range', { params: { start, end } })
        if (!mounted) return
        setEvents((res.data.events||[]).map(e => ({
          id: e._id,
          title: e.title,
          start: e.startTime,
          end: e.endTime,
          extendedProps: e
        })))
      } catch (err) {
        console.warn('loadRange failed', err)
      }
    }

    const start = new Date().toISOString()
    const end = new Date(Date.now() + 30*24*60*60*1000).toISOString()
    loadRange(start, end)

    return () => {
      // cleanup flag
      mounted = false

      // Defensive cleanup for FullCalendar instance if present
      try {
        const apiInst = calendarRef.current?.getApi?.()
        if (apiInst && typeof apiInst.destroy === 'function') {
          apiInst.destroy()
        }
      } catch (cleanupErr) {
        // swallow cleanup errors — we don't want cleanup to crash the app
        console.warn('FullCalendar cleanup error (ignored):', cleanupErr)
      }
    }
  }, []) // run once

  return (
    <div>
      <h2 className="text-2xl font-bold">Events Calendar</h2>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => nav(`/user/events/${info.event.id}`)}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
      />
    </div>
  )
}
