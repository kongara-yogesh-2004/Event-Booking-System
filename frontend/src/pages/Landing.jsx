import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="max-w-6xl mx-auto py-20 px-6 text-slate-100">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Eventix</h1>
        <Link to="/role" className="px-4 py-2 bg-indigo-600 rounded">Get Started</Link>
      </header>
      <main className="mt-16">
        <h2 className="text-4xl font-extrabold">Discover events near you</h2>
        <p className="mt-4 text-slate-300">Calendar-first booking experience — demo connected to your backend.</p>
      </main>
    </div>
  )
}
