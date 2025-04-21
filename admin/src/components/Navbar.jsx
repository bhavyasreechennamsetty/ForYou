import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-pink-500/20 bg-gray-900'>
  <div className='flex items-center gap-3'>
    <img 
      onClick={() => navigate('/')} 
      className='w-32 sm:w-36 cursor-pointer transition-opacity hover:opacity-80' 
      src={assets.admin_logo} 
      alt="Logo" 
    />
    <p className='border border-pink-500/40 px-3 py-0.5 rounded-full text-xs font-medium bg-pink-900/20 text-pink-300'>
      {aToken ? 'Admin' : 'Doctor'}
    </p>
  </div>
  <button 
    onClick={() => logout()} 
    className='bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white text-sm px-6 py-1.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-pink-500/30'
  >
    Logout
  </button>
</div>
  )
}

export default Navbar