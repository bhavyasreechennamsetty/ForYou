import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row bg-gradient-to-br from-gray-800 to-pink-900/40 rounded-xl px-6 md:px-10 lg:px-20 border border-pink-500/30 shadow-lg overflow-hidden relative'>

  {/* Decorative elements */}
  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-pink-900/20 blur-3xl -z-10"></div>
  <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-pink-900/20 blur-3xl -z-10"></div>

  {/* Left Content */}
  <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-14 lg:py-20 z-10'>
    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>
      <span className='bg-gradient-to-r from-pink-300 to-pink-200 bg-clip-text text-transparent'>Book Appointment</span>
      <br />
      <span className='text-white'>With Trusted Doctors</span>
    </h1>
    
    <div className='flex flex-col md:flex-row items-center gap-4 text-gray-300 text-sm'>
      <img 
        className='w-28 h-auto rounded-full border-2 border-pink-500/30' 
        src={assets.group_profiles} 
        alt="Trusted doctors" 
      />
      <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
    </div>
    
    <a 
      href='#speciality' 
      className='flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:from-pink-400 hover:to-pink-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300'
    >
      Book appointment 
      <img 
        className='w-3 h-3 filter brightness-0 invert' 
        src={assets.arrow_icon} 
        alt="Arrow icon" 
      />
    </a>
  </div>

  {/* Right Image */}
  <div className='md:w-1/2 relative z-10'>
    <div className='w-full h-full md:absolute bottom-0 overflow-hidden rounded-lg border border-pink-500/30 shadow-xl'>
      <img 
        className='w-full h-auto object-cover' 
        src={assets.header_img} 
        alt="Doctor consultation" 
      />
      <div className='absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent'></div>
    </div>
  </div>
</div>
    )
}

export default Header