import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-gray-900 border-r border-pink-500/20'>
  {aToken && (
    <ul className='mt-5'>
      <NavLink 
        to={'/admin-dashboard'} 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${isActive ? 'bg-pink-900/30 border-r-4 border-pink-500 text-pink-300' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <img className='min-w-5 filter brightness-0 invert' src={assets.home_icon} alt='' />
        <p className='hidden md:block'>Dashboard</p>
      </NavLink>
      
      <NavLink 
        to={'/all-appointments'} 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${isActive ? 'bg-pink-900/30 border-r-4 border-pink-500 text-pink-300' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <img className='min-w-5 filter brightness-0 invert' src={assets.appointment_icon} alt='' />
        <p className='hidden md:block'>Appointments</p>
      </NavLink>
      
      <NavLink 
        to={'/add-doctor'} 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${isActive ? 'bg-pink-900/30 border-r-4 border-pink-500 text-pink-300' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <img className='min-w-5 filter brightness-0 invert' src={assets.add_icon} alt='' />
        <p className='hidden md:block'>Add Doctor</p>
      </NavLink>
      
      <NavLink 
        to={'/doctor-list'} 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${isActive ? 'bg-pink-900/30 border-r-4 border-pink-500 text-pink-300' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <img className='min-w-5 filter brightness-0 invert' src={assets.people_icon} alt='' />
        <p className='hidden md:block'>Doctors List</p>
      </NavLink>
    </ul>
  )}

  {dToken && (
    <ul className='mt-5'>
      <NavLink 
        to={'/doctor-dashboard'} 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${isActive ? 'bg-pink-900/30 border-r-4 border-pink-500 text-pink-300' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <img className='min-w-5 filter brightness-0 invert' src={assets.home_icon} alt='' />
        <p className='hidden md:block'>Dashboard</p>
      </NavLink>
      
      <NavLink 
        to={'/doctor-appointments'} 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${isActive ? 'bg-pink-900/30 border-r-4 border-pink-500 text-pink-300' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <img className='min-w-5 filter brightness-0 invert' src={assets.appointment_icon} alt='' />
        <p className='hidden md:block'>Appointments</p>
      </NavLink>
      
      <NavLink 
        to={'/doctor-profile'} 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${isActive ? 'bg-pink-900/30 border-r-4 border-pink-500 text-pink-300' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <img className='min-w-5 filter brightness-0 invert' src={assets.people_icon} alt='' />
        <p className='hidden md:block'>Profile</p>
      </NavLink>
    </ul>
  )}
</div>
  )
}

export default Sidebar