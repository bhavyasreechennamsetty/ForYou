import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='m-5'>
  <div className='flex flex-col gap-4'>
    <div>
      <img className='bg-pink-500/80 w-full sm:max-w-64 rounded-lg border-2 border-gray-700' src={profileData.image} alt="" />
    </div>

    <div className='flex-1 border border-gray-700 rounded-lg p-8 py-7 bg-gray-800 text-gray-200'>

      {/* ----- Doc Info : name, degree, experience ----- */}
      <p className='flex items-center gap-2 text-3xl font-medium text-pink-400'>{profileData.name}</p>
      <div className='flex items-center gap-2 mt-1 text-gray-400'>
        <p>{profileData.degree} - {profileData.speciality}</p>
        <button className='py-0.5 px-2 border border-pink-500 text-xs rounded-full text-pink-400'>{profileData.experience} years</button>
      </div>

      {/* ----- Doc About ----- */}
      <div className='mt-4'>
        <p className='flex items-center gap-1 text-sm font-medium text-pink-300'>About :</p>
        <p className='text-sm text-gray-300 max-w-[700px] mt-1'>
          {
            isEdit
              ? <textarea 
                  onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                  className='w-full bg-gray-700 text-gray-200 border border-gray-600 rounded p-2 focus:border-pink-500 focus:ring-pink-500' 
                  rows={8} 
                  value={profileData.about} 
                />
              : profileData.about
          }
        </p>
      </div>

      <p className='text-gray-400 font-medium mt-4'>
        Appointment fee: <span className='text-pink-400'>
          {currency} {
            isEdit 
              ? <input 
                  type='number' 
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                  value={profileData.fees}
                  className='bg-gray-700 border border-gray-600 rounded px-2 py-1 w-20 text-gray-200 focus:border-pink-500'
                /> 
              : profileData.fees
          }
        </span>
      </p>

      <div className='flex gap-2 py-2 text-gray-400'>
        <p>Address:</p>
        <div className='text-sm text-gray-300'>
          {isEdit 
            ? <>
                <input 
                  type='text' 
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                  value={profileData.address.line1}
                  className='bg-gray-700 border border-gray-600 rounded px-2 py-1 w-full mb-2 text-gray-200 focus:border-pink-500'
                />
                <input 
                  type='text' 
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                  value={profileData.address.line2}
                  className='bg-gray-700 border border-gray-600 rounded px-2 py-1 w-full text-gray-200 focus:border-pink-500'
                />
              </>
            : <>
                {profileData.address.line1}
                <br />
                {profileData.address.line2}
              </>
          }
        </div>
      </div>

      <div className='flex gap-2 pt-2 items-center text-gray-400'>
        <input 
          type="checkbox" 
          onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
          checked={profileData.available}
          className='rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700'
        />
        <label>Available for appointments</label>
      </div>

      <div className='mt-6'>
        {
          isEdit
            ? <button 
                onClick={updateProfile} 
                className='px-6 py-2 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-all'
              >
                Save Changes
              </button>
            : <button 
                onClick={() => setIsEdit(prev => !prev)} 
                className='px-6 py-2 border border-pink-500 text-pink-400 text-sm rounded-lg hover:bg-pink-500/10 transition-all'
              >
                Edit Profile
              </button>
        }
      </div>
    </div>
  </div>
</div>
    )
}

export default DoctorProfile