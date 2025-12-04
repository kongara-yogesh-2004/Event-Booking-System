import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RoleSelect(){
  const nav = useNavigate()
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-slate-100">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold">Choose your role</h2>
        <div className="mt-6 flex gap-6">
          <div onClick={()=>nav('/login',{state:{role:'user'}})} className="flex-1 p-6 rounded-xl cursor-pointer bg-gradient-to-br from-slate-700 to-slate-900">User</div>
          <div onClick={()=>nav('/login',{state:{role:'admin'}})} className="flex-1 p-6 rounded-xl cursor-pointer bg-gradient-to-br from-indigo-700 to-indigo-900">Admin</div>
        </div>
      </div>
    </div>
  )
}
