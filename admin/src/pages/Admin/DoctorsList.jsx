import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto'>
    <h1 className='text-2xl font-bold text-pink-400 mb-6'>Our Doctors</h1>
  
    <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5'>
      {doctors.map((item, index) => (
        <div
          key={index}
          className='bg-gray-800 border border-pink-500/20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_-3px_rgba(236,72,153,0.4)] group'
        >
          <div className='relative pt-[70%] overflow-hidden bg-gray-700'>
            <img
              className='absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105'
              src={item.image}
              alt={`Dr. ${item.name}`}
            />
          </div>
          
          <div className='p-3'>
            <div className='flex justify-between items-start gap-2'>
              <div>
                <p className='text-white text-base font-semibold truncate'>{item.name}</p>
                <p className='text-pink-300/80 text-xs mt-0.5'>{item.speciality}</p>
              </div>
              <div className={`flex items-center gap-1 ${item.available ? 'text-green-400' : 'text-pink-400'}`}>
                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-400' : 'bg-pink-400'}`}></div>
                <span className='text-xs'>
                  {item.available ? 'Available' : 'Busy'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => changeAvailability(item._id)}
              className={`mt-3 w-full py-1.5 rounded-md text-xs font-medium transition-colors ${item.available ? 
                'bg-gray-700/50 text-green-400 hover:bg-gray-600/50' : 
                'bg-pink-900/40 text-pink-300 hover:bg-pink-900/60'
              }`}
            >
              {item.available ? 'Mark Busy' : 'Mark Available'}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default DoctorsList