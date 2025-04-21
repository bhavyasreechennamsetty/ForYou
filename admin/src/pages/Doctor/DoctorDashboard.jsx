import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)


  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])

  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-gray-800 p-4 min-w-52 rounded-lg border-2 border-gray-700 cursor-pointer hover:scale-105 transition-all hover:border-pink-500'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-pink-400'>{currency} {dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-gray-800 p-4 min-w-52 rounded-lg border-2 border-gray-700 cursor-pointer hover:scale-105 transition-all hover:border-pink-500'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-pink-400'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-gray-800 p-4 min-w-52 rounded-lg border-2 border-gray-700 cursor-pointer hover:scale-105 transition-all hover:border-pink-500'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-pink-400'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-gray-800 rounded-lg mt-8'>
        <div className='flex items-center gap-2.5 px-6 py-4 rounded-t-lg border-b border-gray-700'>
          <img src={assets.list_icon} alt="" className='filter invert' />
          <p className='font-semibold text-pink-400'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-700'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-700 transition-colors' key={index}>
              <img className='rounded-full w-10 h-10 object-cover' src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-100 font-medium'>{item.userData.name}</p>
                <p className='text-gray-400'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium px-3 py-1 bg-red-900/30 rounded-full'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-400 text-xs font-medium px-3 py-1 bg-green-900/30 rounded-full'>Completed</p>
                  : <div className='flex gap-2'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-8 h-8 cursor-pointer hover:opacity-80' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-8 h-8 cursor-pointer hover:opacity-80' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard