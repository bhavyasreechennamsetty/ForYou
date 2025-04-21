import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-700 bg-gray-900 px-4 sm:px-6'>
  {/* Logo */}
  <img 
    onClick={() => navigate('/')} 
    className='w-44 cursor-pointer hover:opacity-90 transition-opacity' 
    src={assets.logo} 
    alt="Prescripto Logo" 
  />

  {/* Desktop Navigation */}
  <ul className='md:flex items-start gap-8 font-medium hidden'>
    <NavLink 
      to='/' 
      className={({ isActive }) => isActive ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300 transition-colors'}
    >
      <li className='py-1 relative group'>
        HOME
        <span className='absolute bottom-0 left-0 h-0.5 bg-pink-500 w-0 group-hover:w-3/5 transition-all duration-300'></span>
      </li>
    </NavLink>
    <NavLink 
      to='/doctors' 
      className={({ isActive }) => isActive ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300 transition-colors'}
    >
      <li className='py-1 relative group'>
        ALL DOCTORS
        <span className='absolute bottom-0 left-0 h-0.5 bg-pink-500 w-0 group-hover:w-3/5 transition-all duration-300'></span>
      </li>
    </NavLink>
    <NavLink 
      to='/about' 
      className={({ isActive }) => isActive ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300 transition-colors'}
    >
      <li className='py-1 relative group'>
        ABOUT
        <span className='absolute bottom-0 left-0 h-0.5 bg-pink-500 w-0 group-hover:w-3/5 transition-all duration-300'></span>
      </li>
    </NavLink>
    <NavLink 
      to='/contact' 
      className={({ isActive }) => isActive ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300 transition-colors'}
    >
      <li className='py-1 relative group'>
        CONTACT
        <span className='absolute bottom-0 left-0 h-0.5 bg-pink-500 w-0 group-hover:w-3/5 transition-all duration-300'></span>
      </li>
    </NavLink>
  </ul>

  {/* User Actions */}
  <div className='flex items-center gap-4'>
    {token && userData ? (
      <div className='flex items-center gap-2 cursor-pointer group relative'>
        <div className='w-8 h-8 rounded-full overflow-hidden border border-pink-500/30'>
          <img className='w-full h-full object-cover' src={userData.image} alt="User Profile" />
        </div>
        <img className='w-2.5 filter brightness-0 invert opacity-70' src={assets.dropdown_icon} alt="Dropdown" />
        
        {/* Dropdown Menu */}
        <div className='absolute top-full right-0 pt-2 text-base z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
          <div className='min-w-48 bg-gray-800 rounded-lg shadow-xl border border-pink-500/20 flex flex-col gap-2 p-3'>
            <p 
              onClick={() => navigate('/my-profile')} 
              className='text-gray-300 hover:text-pink-400 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors'
            >
              My Profile
            </p>
            <p 
              onClick={() => navigate('/my-appointments')} 
              className='text-gray-300 hover:text-pink-400 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors'
            >
              My Appointments
            </p>
            <p 
              onClick={logout} 
              className='text-gray-300 hover:text-red-400 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors'
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    ) : (
      <button 
        onClick={() => navigate('/login')} 
        className='bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-2.5 rounded-full font-medium hidden md:block hover:from-pink-500 hover:to-pink-400 transition-all shadow-lg hover:shadow-pink-500/30'
      >
        Create account
      </button>
    )}
    
    {/* Mobile Menu Button */}
    <img 
      onClick={() => setShowMenu(true)} 
      className='w-6 md:hidden filter brightness-0 invert cursor-pointer hover:opacity-80' 
      src={assets.menu_icon} 
      alt="Menu" 
    />

    {/* Mobile Menu */}
    <div className={`md:hidden fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className='flex items-center justify-between px-6 py-5 border-b border-pink-500/20'>
        <img src={assets.logo} className='w-36' alt="Prescripto Logo" />
        <img 
          onClick={() => setShowMenu(false)} 
          src={assets.cross_icon} 
          className='w-7 filter brightness-0 invert cursor-pointer hover:opacity-80' 
          alt="Close Menu" 
        />
      </div>
      
      <ul className='flex flex-col items-center gap-1 mt-6 px-6 text-lg font-medium'>
        <NavLink 
          onClick={() => setShowMenu(false)} 
          to='/'
          className={({ isActive }) => isActive ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300'}
        >
          <p className='w-full text-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'>HOME</p>
        </NavLink>
        <NavLink 
          onClick={() => setShowMenu(false)} 
          to='/doctors'
          className={({ isActive }) => isActive ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300'}
        >
          <p className='w-full text-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'>ALL DOCTORS</p>
        </NavLink>
        <NavLink 
          onClick={() => setShowMenu(false)} 
          to='/about'
          className={({ isActive }) => isActive ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300'}
        >
          <p className='w-full text-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'>ABOUT</p>
        </NavLink>
        <NavLink 
          onClick={() => setShowMenu(false)} 
          to='/contact'
          className={({ isActive }) => isActive ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300'}
        >
          <p className='w-full text-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'>CONTACT</p>
        </NavLink>
      </ul>
      
      {!token && (
        <div className='px-6 mt-8'>
          <button 
            onClick={() => {
              setShowMenu(false);
              navigate('/login');
            }} 
            className='w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:from-pink-500 hover:to-pink-400 transition-all shadow-lg'
          >
            Create account
          </button>
        </div>
      )}
    </div>
  </div>
</div>
  )
}

export default Navbar