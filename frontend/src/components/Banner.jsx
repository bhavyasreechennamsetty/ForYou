import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-gradient-to-br from-gray-800 via-gray-800 to-pink-900/40 rounded-xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 border border-pink-500/30 shadow-lg overflow-hidden'>

  {/* Decorative elements */}
  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-pink-900/20 blur-3xl -z-10"></div>
  <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-pink-900/20 blur-3xl -z-10"></div>

  {/* Left Content */}
  <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 relative z-10'>
    <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
      <p className='bg-gradient-to-r from-pink-300 to-pink-200 bg-clip-text text-transparent'>Book Appointment</p>
      <p className='mt-4 text-white'>With 100+ Trusted Doctors</p>
    </div>
    <button 
      onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
      className='bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm sm:text-base px-8 py-3.5 rounded-full mt-8 hover:from-pink-400 hover:to-pink-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 font-medium'
    >
      Create account
    </button>
  </div>

  {/* Right Image */}
  <div className='hidden md:block md:w-1/2 lg:w-[370px] relative z-10'>
    <div className='w-full h-full absolute bottom-0 right-0 max-w-md overflow-hidden rounded-l-xl'>
      <img 
        className='w-full h-full object-cover object-bottom' 
        src={assets.appointment_img} 
        alt="Doctor appointment"
      />
      <div className='absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/30 to-transparent'></div>
    </div>
  </div>
</div>
    )
}

export default Banner