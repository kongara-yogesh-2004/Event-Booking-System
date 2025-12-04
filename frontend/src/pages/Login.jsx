import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Login(){
  const loc = useLocation()
  const role = loc.state?.role || 'user'
  const nav = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await api.post('/auth/login', { email, password })
      const user = { ...res.data.user, token: res.data.token, role }
      localStorage.setItem('user', JSON.stringify(user))
      nav(role==='admin'?'/admin':'/user')
    }catch(err){ setErr(err.response?.data?.message || err.message) }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center text-slate-100">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold">Sign in as {role}</h2>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="w-full p-3 rounded bg-slate-900/40" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" className="w-full p-3 rounded bg-slate-900/40" />
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-indigo-500 rounded">Sign in</button>
          </div>
          {err && <div className="text-sm text-red-400">{err}</div>}
        </form>
        <div className="mt-4 text-xs text-slate-400">Demo: user@example.com / password123</div>
      </div>
    </div>
  )
}
