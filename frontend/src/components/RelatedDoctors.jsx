import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-6 my-16 px-4 sm:px-0'>
        {/* Section Header */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-pink-300 to-pink-200 bg-clip-text text-transparent'>
            Related Doctors
          </h1>
          <p className='sm:w-1/2 mx-auto mt-3 text-gray-400'>
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>
      
        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8'>
          {relDoc.map((item, index) => (
            <div 
              onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
              className='border border-pink-500/20 bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 group'
              key={index}
            >
              {/* Doctor Image */}
              <div className='relative pt-[100%] bg-gray-700 overflow-hidden'>
                <img 
                  className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  src={item.image} 
                  alt={`Dr. ${item.name}`}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent'></div>
              </div>
      
              {/* Doctor Info */}
              <div className='p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`text-xs ${item.available ? 'text-green-400' : 'text-red-400'}`}>
                    {item.available ? 'Available Now' : 'Currently Unavailable'}
                  </span>
                </div>
                
                <h3 className='text-lg font-semibold text-white'>{item.name}</h3>
                <p className='text-pink-300/80 text-sm'>{item.speciality}</p>
                
                <button className='mt-4 w-full py-2 bg-pink-900/40 text-pink-300 rounded-lg text-sm font-medium hover:bg-pink-900/60 transition-colors'>
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default RelatedDoctors