import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className="bg-gray-900 p-4 sm:p-6">
        {/* Header */}
        <div className='pb-3 mt-12 border-b border-pink-500/20'>
          <h2 className='text-xl font-semibold text-pink-300'>My Appointments</h2>
        </div>
      
        {/* Appointments List */}
        <div className='space-y-6 mt-4'>
          {appointments.map((item, index) => (
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-6 p-4 rounded-xl bg-gray-800/50 border border-pink-500/20 hover:border-pink-500/40 transition-all'>
              {/* Doctor Image */}
              <div className='sm:w-36'>
                <div className='relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 aspect-square'>
                  <img 
                    className='w-full h-full object-cover'
                    src={item.docData.image} 
                    alt={item.docData.name}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent'></div>
                </div>
              </div>
      
              {/* Appointment Details */}
              <div className='text-gray-300 space-y-2'>
                <h3 className='text-lg font-semibold text-white'>{item.docData.name}</h3>
                <p className='text-pink-300'>{item.docData.speciality}</p>
                
                <div className='mt-3'>
                  <p className='font-medium text-pink-200'>Address:</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>
      
                <p className='mt-2'>
                  <span className='font-medium text-pink-200'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
      
              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row sm:flex-col gap-3 justify-end'>
                {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                  <button 
                    onClick={() => setPayment(item._id)}
                    className='px-4 py-2 rounded-lg border border-pink-500/40 text-pink-300 hover:bg-pink-900/40 hover:border-pink-500/60 transition-all'
                  >
                    Pay Online
                  </button>
                )}
      
                {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                  <>
                    <button 
                      onClick={() => appointmentStripe(item._id)}
                      className='px-4 py-2 rounded-lg border border-pink-500/40 bg-gray-800 hover:bg-gray-700 transition-all flex items-center justify-center gap-2'
                    >
                      <img className='h-5' src={assets.stripe_logo} alt="Stripe" />
                    </button>
                    <button 
                      onClick={() => appointmentRazorpay(item._id)}
                      className='px-4 py-2 rounded-lg border border-pink-500/40 bg-gray-800 hover:bg-gray-700 transition-all flex items-center justify-center gap-2'
                    >
                      <img className='h-5' src={assets.razorpay_logo} alt="Razorpay" />
                    </button>
                  </>
                )}
      
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className='px-4 py-2 rounded-lg bg-green-900/30 border border-green-500/30 text-green-400'>
                    Paid
                  </button>
                )}
      
                {item.isCompleted && (
                  <button className='px-4 py-2 rounded-lg bg-green-900/30 border border-green-500/30 text-green-400'>
                    Completed
                  </button>
                )}
      
                {!item.cancelled && !item.isCompleted && (
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className='px-4 py-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-900/30 hover:border-red-500/60 transition-all'
                  >
                    Cancel Appointment
                  </button>
                )}
      
                {item.cancelled && !item.isCompleted && (
                  <button className='px-4 py-2 rounded-lg border border-red-500/40 text-red-400 bg-red-900/20'>
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default MyAppointments