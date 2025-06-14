import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>

  <p className='mb-3 text-lg font-medium text-white'>All Appointments</p>

  <div className='bg-gray-900 border border-gray-700 rounded text-sm max-h-[80vh] overflow-y-scroll'>

    <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-700 text-gray-300'>
      <p>#</p>
      <p>Patient</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Doctor</p>
      <p>Fees</p>
      <p>Action</p>
    </div>

    {appointments.map((item, index) => (
      <div
        key={index}
        className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-400 py-3 px-6 border-b border-gray-700 hover:bg-gray-800 transition-all'
      >
        <p className='max-sm:hidden'>{index + 1}</p>

        <div className='flex items-center gap-2'>
          <img src={item.userData.image} className='w-8 h-8 rounded-full object-cover' alt="Patient" />
          <p>{item.userData.name}</p>
        </div>

        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

        <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

        <div className='flex items-center gap-2'>
          <img src={item.docData.image} className='w-8 h-8 rounded-full object-cover bg-gray-700' alt="Doctor" />
          <p>{item.docData.name}</p>
        </div>

        <p>{currency}{item.amount}</p>

        {item.cancelled ? (
          <p className='text-red-400 text-xs font-medium'>Cancelled</p>
        ) : item.isCompleted ? (
          <p className='text-green-500 text-xs font-medium'>Completed</p>
        ) : (
          <img
            onClick={() => cancelAppointment(item._id)}
            className='w-6 cursor-pointer filter invert hover:scale-105 transition-transform'
            src={assets.cancel_icon}
            alt="Cancel"
          />
        )}
      </div>
    ))}

  </div>

</div>

  )
}

export default AllAppointments