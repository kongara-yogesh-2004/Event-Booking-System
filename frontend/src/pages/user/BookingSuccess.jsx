import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BookingSuccess(){
  const query = useQuery();
  const sessionId = query.get('session_id');
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    async function confirm(){
      if(!sessionId){
        setStatus('error');
        setMessage('No session id provided.');
        return;
      }
      try{
        // Call backend endpoint that confirms the checkout session (fallback if webhook didn't arrive)
        const res = await api.post('/bookings/confirm-session', { sessionId });
        setStatus('success');
        setMessage(res.data.message || 'Booking confirmed.');
      }catch(err){
        // If backend reports not yet confirmed, you can retry or show instructions
        setStatus('error');
        setMessage(err.response?.data?.message || err.message || 'Could not confirm booking.');
      }
    }
    confirm();
  }, [sessionId]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-100">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-lg text-center">
        {status === 'pending' && <div><h3 className="text-xl font-bold">Finalizing your booking...</h3><p className="text-sm text-slate-400 mt-2">Please wait a moment — we are confirming payment.</p></div>}
        {status === 'success' && <div><h3 className="text-xl font-bold text-green-400">Booking confirmed ✅</h3><p className="mt-2 text-slate-300">{message}</p><div className="mt-6"><button onClick={()=>navigate('/user/bookings')} className="px-4 py-2 bg-indigo-600 rounded">Go to My Bookings</button></div></div>}
        {status === 'error' && <div><h3 className="text-xl font-bold text-red-400">Couldn't confirm booking</h3><p className="mt-2 text-slate-300">{message}</p><div className="mt-6 space-x-3"><button onClick={()=>window.location.reload()} className="px-4 py-2 bg-indigo-600 rounded">Retry</button><button onClick={()=>navigate('/user')} className="px-4 py-2 border rounded">Back to Home</button></div></div>}
      </div>
    </div>
  )
}
