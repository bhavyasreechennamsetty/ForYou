import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-6 py-16 px-4 sm:px-0 bg-gray-900'>
  {/* Section Header */}
  <div className='text-center'>
    <h1 className='text-3xl font-bold bg-gradient-to-r from-pink-300 to-pink-200 bg-clip-text text-transparent'>
      Find by Speciality
    </h1>
    <p className='sm:w-1/2 mx-auto mt-3 text-gray-400 text-sm'>
      Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
    </p>
  </div>

  {/* Speciality Cards */}
  <div className='flex justify-start sm:justify-center gap-6 pt-8 w-full overflow-x-auto pb-4 scrollbar-hide'>
    {specialityData.map((item, index) => (
      <Link 
        to={`/doctors/${item.speciality}`} 
        onClick={() => window.scrollTo(0, 0)} 
        className='flex flex-col items-center text-center cursor-pointer flex-shrink-0 group transition-all duration-300 hover:-translate-y-2'
        key={index}
      >
        {/* Speciality Icon */}
        <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-800 border-2 border-pink-500/30 flex items-center justify-center group-hover:bg-pink-900/20 group-hover:border-pink-500/50 transition-all mb-3'>
          <img 
            className='w-10 h-10 sm:w-12 sm:h-12 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all' 
            src={item.image} 
            alt={item.speciality}
          />
        </div>
        
        {/* Speciality Name */}
        <p className='text-gray-300 group-hover:text-pink-300 transition-colors text-sm font-medium'>
          {item.speciality}
        </p>
      </Link>
    ))}
  </div>
</div>
    )
}

export default SpecialityMenu