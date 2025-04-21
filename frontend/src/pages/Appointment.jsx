import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className="bg-gray-900 p-4 sm:p-6">
        {/* Doctor Profile Section */}
        <div className='flex flex-col lg:flex-row gap-6 relative'>
          {/* Doctor Image */}
          <div className='lg:w-80 flex-shrink-0'>
            <div className='relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-700 border-2 border-pink-500/30 shadow-lg'>
              <img 
                className='w-full h-full object-cover aspect-square'
                src={docInfo.image} 
                alt={`Dr. ${docInfo.name}`}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent'></div>
            </div>
          </div>
      
          {/* Doctor Info */}
          <div className='flex-1 border-2 border-pink-500/20 rounded-xl p-6 sm:p-8 bg-gray-800/90 backdrop-blur-sm -mt-16 sm:mt-0 shadow-lg shadow-pink-500/10'>
            {/* Name and Verification */}
            <div className='flex items-center gap-3 mb-2'>
              <h1 className='text-2xl sm:text-3xl font-bold text-white'>{docInfo.name}</h1>
              <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
            </div>
      
            {/* Credentials */}
            <div className='flex flex-wrap items-center gap-3 mb-6'>
              <p className='text-pink-300'>{docInfo.degree} - {docInfo.speciality}</p>
              <span className='text-xs py-1 px-3 rounded-full bg-pink-900/40 border border-pink-500/30 text-pink-300'>
                {docInfo.experience} years experience
              </span>
            </div>
      
            {/* About Section */}
            <div className='mb-6'>
              <div className='flex items-center gap-2 text-pink-400 mb-2'>
                <img className='w-4 h-4' src={assets.info_icon} alt="About" />
                <h2 className='font-medium'>About</h2>
              </div>
              <p className='text-gray-300 leading-relaxed'>{docInfo.about}</p>
            </div>
      
            {/* Appointment Fee */}
            <div className='flex items-center gap-2'>
              <span className='text-pink-300 font-medium'>Appointment fee:</span>
              <span className='text-white font-bold'>{currencySymbol}{docInfo.fees}</span>
            </div>
          </div>
        </div>
      
        {/* Booking Section */}
        <div className='lg:ml-80 lg:pl-6 mt-8'>
          <h3 className='text-xl font-semibold text-pink-300 mb-6'>Available Time Slots</h3>
          
          {/* Date Selection */}
          <div className='flex gap-3 overflow-x-auto pb-4 scrollbar-hide'>
            {docSlots.length > 0 && docSlots.map((item, index) => {
              const dayName = item[0] ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][item[0].datetime.getDay()] : '';
              const dateNumber = item[0] ? item[0].datetime.getDate() : '';
              
              return (
                <button
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`flex flex-col items-center justify-center min-w-16 h-16 rounded-full cursor-pointer transition-all ${
                    slotIndex === index 
                      ? 'bg-gradient-to-br from-pink-600 to-pink-500 text-white shadow-lg' 
                      : 'border border-pink-500/30 hover:bg-gray-800'
                  }`}
                >
                  <span className={`text-xs ${slotIndex !== index ? 'text-pink-400' : 'text-white'}`}>
                    {dayName}
                  </span>
                  <span className={`font-medium ${slotIndex !== index ? 'text-pink-300' : 'text-white'}`}>
                    {dateNumber}
                  </span>
                </button>
              )
            })}
          </div>
      
          {/* Time Selection */}
          <div className='flex gap-3 overflow-x-auto mt-6 pb-4 scrollbar-hide'>
            {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  item.time === slotTime
                    ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white font-medium shadow-md'
                    : 'border border-pink-500/30 text-pink-300 hover:bg-gray-800'
                }`}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
          </div>
      
          {/* Book Button */}
          <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`mt-8 w-full sm:w-auto px-12 py-3 rounded-full font-medium transition-all ${
              !slotTime 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white shadow-lg hover:shadow-pink-500/30'
            }`}
          >
            Book Appointment
          </button>
        </div>
      
        {/* Related Doctors */}
        <div className='mt-12 border-t border-pink-500/20 pt-8'>
          <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
      </div>
    ) : null
}

export default Appointment