import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="bg-gray-900 p-4 sm:p-6">
  {/* Header */}
  <p className='text-pink-300/80 text-lg mb-6'>Browse through our specialist doctors</p>

  {/* Filter and Doctor Grid */}
  <div className='flex flex-col lg:flex-row gap-8'>
    {/* Filters Section */}
    <div className='lg:w-1/4'>
      <button 
        onClick={() => setShowFilter(!showFilter)}
        className={`lg:hidden py-2 px-4 mb-4 rounded-lg border border-pink-500/40 text-sm font-medium transition-all ${
          showFilter 
            ? 'bg-pink-600 text-white' 
            : 'text-pink-300 hover:bg-pink-900/30'
        }`}
      >
        {showFilter ? 'Hide Filters' : 'Show Filters'}
      </button>
      
      <div className={`flex flex-col gap-3 ${showFilter ? 'flex' : 'hidden lg:flex'}`}>
        {[
          'General physician',
          'Gynecologist',
          'Dermatologist',
          'Pediatricians',
          'Neurologist',
          'Gastroenterologist'
        ].map((spec) => (
          <button
            key={spec}
            onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
            className={`text-left py-2.5 px-4 rounded-lg transition-all cursor-pointer text-sm font-medium ${
              speciality === spec
                ? 'bg-pink-900/50 border border-pink-500/30 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                : 'border border-pink-500/20 text-gray-300 hover:bg-gray-800 hover:border-pink-500/40'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </div>
    
    {/* Doctors Grid */}
    <div className='flex-1'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filterDoc.map((item) => (
          <div 
            key={item._id}
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
            className='border border-pink-500/20 bg-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/10 group'
          >
            {/* Doctor Image */}
            <div className='relative pt-[70%] bg-gray-700 overflow-hidden'>
              <img 
                className='absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105'
                src={item.image} 
                alt={`Dr. ${item.name}`}
              />
            </div>
            
            {/* Doctor Info */}
            <div className='p-4'>
              {/* Availability */}
              <div className='flex items-center gap-2 mb-2'>
                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className={`text-xs ${item.available ? 'text-green-400' : 'text-red-400'}`}>
                  {item.available ? 'Available Now' : 'Currently Unavailable'}
                </span>
              </div>
              
              {/* Name and Speciality - Changed name color to gradient pink */}
              <h3 className='text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 font-medium text-lg'>
                {item.name}
              </h3>
              <p className='text-pink-300/80 text-sm'>{item.speciality}</p>
              
              {/* Book Button */}
              <button className='mt-4 w-full py-2 bg-pink-900/40 text-pink-300 rounded-lg text-sm font-medium hover:bg-pink-900/60 transition-colors'>
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  )
}

export default Doctors