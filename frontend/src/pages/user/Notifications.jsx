import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export default function Notifications(){
  const [notes, setNotes] = useState([])
  useEffect(()=>{
    // For demo: fetch or simulate notifications; backend logs emails to console
    setNotes([{id:1,title:'Hold created',text:'Your hold for A1 expires in 10 minutes.'}])
  },[])
  return (
    <div>
      <h3 className="text-xl font-bold">Notifications</h3>
      <div className="mt-4 space-y-3">
        {notes.map(n=> <div key={n.id} className="bg-slate-900 p-3 rounded">{n.title} • <div className="text-sm text-slate-400">{n.text}</div></div>)}
      </div>
    </div>
  )
}
