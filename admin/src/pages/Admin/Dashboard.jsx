import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>

  {/* Summary Cards */}
  <div className='flex flex-wrap gap-3'>
    <div className='flex items-center gap-2 bg-gray-900 p-4 min-w-52 rounded border border-gray-700 cursor-pointer hover:scale-105 transition-all'>
      <img className='w-14' src={assets.doctor_icon} alt="Doctors Icon" />
      <div>
        <p className='text-xl font-semibold text-white'>{dashData.doctors}</p>
        <p className='text-gray-400'>Doctors</p>
      </div>
    </div>

    <div className='flex items-center gap-2 bg-gray-900 p-4 min-w-52 rounded border border-gray-700 cursor-pointer hover:scale-105 transition-all'>
      <img className='w-14' src={assets.appointments_icon} alt="Appointments Icon" />
      <div>
        <p className='text-xl font-semibold text-white'>{dashData.appointments}</p>
        <p className='text-gray-400'>Appointments</p>
      </div>
    </div>

    <div className='flex items-center gap-2 bg-gray-900 p-4 min-w-52 rounded border border-gray-700 cursor-pointer hover:scale-105 transition-all'>
      <img className='w-14' src={assets.patients_icon} alt="Patients Icon" />
      <div>
        <p className='text-xl font-semibold text-white'>{dashData.patients}</p>
        <p className='text-gray-400'>Patients</p>
      </div>
    </div>
  </div>

  {/* Latest Bookings */}
  <div className='bg-gray-900 mt-10 rounded border border-gray-700'>

    <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b border-gray-700'>
      <img src={assets.list_icon} alt="List Icon" />
      <p className='font-semibold text-white'>Latest Bookings</p>
    </div>

    <div className='pt-4'>
      {dashData.latestAppointments.slice(0, 5).map((item, index) => (
        <div
          key={index}
          className='flex items-center px-6 py-3 gap-3 hover:bg-gray-800 transition-all'
        >
          <img className='rounded-full w-10' src={item.docData.image} alt="Doctor" />
          <div className='flex-1 text-sm'>
            <p className='text-white font-medium'>{item.docData.name}</p>
            <p className='text-gray-400'>Booking on {slotDateFormat(item.slotDate)}</p>
          </div>

          {item.cancelled ? (
            <p className='text-red-400 text-xs font-medium'>Cancelled</p>
          ) : item.isCompleted ? (
            <p className='text-green-500 text-xs font-medium'>Completed</p>
          ) : (
            <img
              onClick={() => cancelAppointment(item._id)}
              className='w-8 cursor-pointer filter invert hover:scale-105 transition-transform'
              src={assets.cancel_icon}
              alt="Cancel"
            />
          )}
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default Dashboard