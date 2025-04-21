import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8">
  <div className="flex flex-col gap-6 w-full max-w-md p-8 sm:p-10 border border-pink-500/30 rounded-xl shadow-xl bg-gray-800/90 backdrop-blur-sm">
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300">
        {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
      </h1>
      <p className="text-pink-200/80">
        {state === 'Sign Up' ? 'Join our platform' : 'Log in to continue'}
      </p>
    </div>

    <div className="space-y-5">
      {state === 'Sign Up' && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-pink-200">Full Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full p-3 bg-gray-700/50 border border-pink-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            type="text"
            placeholder="John Doe"
            required
          />
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-pink-200">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full p-3 bg-gray-700/50 border border-pink-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
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
          className="w-full p-3 bg-gray-700/50 border border-pink-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/30 mt-4"
      >
        {state === 'Sign Up' ? 'Create Account' : 'Login'}
      </button>
    </div>

    <div className="text-center text-sm text-gray-300">
      {state === 'Sign Up' ? (
        <p>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setState('Login')}
            className="text-pink-400 font-medium hover:text-pink-300 underline underline-offset-2 transition-colors"
          >
            Sign in
          </button>
        </p>
      ) : (
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setState('Sign Up')}
            className="text-pink-400 font-medium hover:text-pink-300 underline underline-offset-2 transition-colors"
          >
            Sign up
          </button>
        </p>
      )}
    </div>
  </div>
</form>
  )
}

export default Login