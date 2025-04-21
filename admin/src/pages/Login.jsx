import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <form 
  onSubmit={onSubmitHandler} 
  className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4"
>
  <div className="flex flex-col gap-6 items-center p-10 w-full max-w-2xl border-2 border-pink-500/20 rounded-3xl text-gray-200 shadow-2xl bg-gray-800/90 backdrop-blur-sm transition-all duration-500">
    
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300">
        {state} Portal
      </h1>
      <p className="text-pink-200">Access your professional dashboard</p>
    </div>

    <div className="w-full max-w-md space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-pink-200">Email Address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border-2 border-pink-500/30 bg-gray-700/50 text-white rounded-xl w-full p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-pink-200">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border-2 border-pink-500/30 bg-gray-700/50 text-white rounded-xl w-full p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      <button 
        type="submit"
        className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40"
      >
        Sign In
      </button>
    </div>

    <div className="text-center w-full text-gray-300">
      {
        state === 'Admin'
          ? (
            <p className="text-sm">
              Are you a Doctor?{" "}
              <button
                type="button"
                onClick={() => setState('Doctor')}
                className="text-pink-400 hover:text-pink-300 font-medium underline-offset-4 hover:underline transition-colors"
              >
                Switch to Doctor Login
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Are you an Admin?{" "}
              <button
                type="button"
                onClick={() => setState('Admin')}
                className="text-pink-400 hover:text-pink-300 font-medium underline-offset-4 hover:underline transition-colors"
              >
                Switch to Admin Login
              </button>
            </p>
          )
      }
    </div>
  </div>
</form>

  )
}

export default Login