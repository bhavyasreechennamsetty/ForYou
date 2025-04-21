import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { FaEdit, FaSave } from 'react-icons/fa'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      formData.append('emergencyPhone', userData.emergencyPhone || '')
      formData.append('bloodType', userData.bloodType || '')
      formData.append('medicalHistory', userData.medicalHistory || '')

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { token },
      })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData ? (
    <section className="max-w-lg mx-auto bg-gray-800 shadow-xl rounded-xl p-6 mt-6 mb-10 border border-pink-500/20">
  {/* Profile Header */}
  <header className="flex flex-col items-center mb-6">
    <div className="relative cursor-pointer group">
      {isEdit ? (
        <>
          <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-pink-500/30 shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
          </div>
          <label
            htmlFor="image"
            className="absolute bottom-0 right-0 w-12 h-12 rounded-full bg-gray-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer border border-pink-500/30"
            title="Upload new profile image"
          >
            <img src={assets.upload_icon} alt="Upload" className="w-6 h-6 filter brightness-0 invert" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </>
      ) : (
        <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-pink-500/30 shadow-lg">
          <img
            className="w-full h-full object-cover"
            src={userData.image}
            alt="Profile"
          />
        </div>
      )}
    </div>
    <div className="mt-4 text-center">
      {isEdit ? (
        <input
          className="bg-gray-700 text-3xl font-semibold py-2 px-4 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
          type="text"
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          value={userData.name}
        />
      ) : (
        <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
      )}
    </div>
  </header>

  <hr className="border-pink-500/20 my-6" />

  {/* Contact Info */}
  <section className="mb-6">
    <h2 className="text-lg font-semibold text-pink-400 underline mb-3">Contact Information</h2>
    <dl className="grid grid-cols-1 gap-y-3 text-gray-300">
      <div className="flex justify-between">
        <dt className="font-medium">Email:</dt>
        <dd className="text-pink-300 break-words">{userData.email}</dd>
      </div>

      <div className="flex justify-between items-center">
        <dt className="font-medium">Phone:</dt>
        <dd className="flex-1 ml-4">
          {isEdit ? (
            <input
              className="bg-gray-700 rounded-lg p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              type="text"
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              value={userData.phone}
            />
          ) : (
            <span className="text-pink-300">{userData.phone}</span>
          )}
        </dd>
      </div>

      <div className="flex justify-between items-center">
        <dt className="font-medium">Emergency Phone:</dt>
        <dd className="flex-1 ml-4">
          {isEdit ? (
            <input
              className="bg-gray-700 rounded-lg p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              type="text"
              onChange={(e) => setUserData((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
              value={userData.emergencyPhone || ''}
            />
          ) : (
            <span className="text-red-400">{userData.emergencyPhone}</span>
          )}
        </dd>
      </div>

      <div className="flex flex-col">
        <dt className="font-medium mb-1">Address:</dt>
        {isEdit ? (
          <>
            <input
              className="bg-gray-700 rounded-lg p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              value={userData.address.line1}
            />
            <input
              className="bg-gray-700 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              value={userData.address.line2}
            />
          </>
        ) : (
          <dd className="text-gray-400 whitespace-pre-line">
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </dd>
        )}
      </div>
    </dl>
  </section>

  {/* Basic Info */}
  <section className="mb-6">
    <h2 className="text-lg font-semibold text-pink-400 underline mb-3">Basic Information</h2>
    <dl className="grid grid-cols-1 gap-y-3 text-gray-300">
      <div className="flex justify-between items-center">
        <dt className="font-medium">Gender:</dt>
        <dd className="flex-1 ml-4">
          {isEdit ? (
            <select
              className="bg-gray-700 rounded-lg p-2 max-w-xs w-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Not Selected" className="bg-gray-800">Not Selected</option>
              <option value="Male" className="bg-gray-800">Male</option>
              <option value="Female" className="bg-gray-800">Female</option>
            </select>
          ) : (
            <span className="text-gray-400">{userData.gender}</span>
          )}
        </dd>
      </div>

      <div className="flex justify-between items-center">
        <dt className="font-medium">Birthday:</dt>
        <dd className="flex-1 ml-4">
          {isEdit ? (
            <input
              className="bg-gray-700 rounded-lg p-2 max-w-xs w-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              type="date"
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
            />
          ) : (
            <span className="text-gray-400">{userData.dob}</span>
          )}
        </dd>
      </div>

      <div className="flex justify-between items-center">
        <dt className="font-medium">Blood Type:</dt>
        <dd className="flex-1 ml-4">
          {isEdit ? (
            <input
              className="bg-gray-700 rounded-lg p-2 max-w-xs w-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              type="text"
              placeholder="e.g. A+, O-"
              onChange={(e) => setUserData((prev) => ({ ...prev, bloodType: e.target.value }))}
              value={userData.bloodType || ''}
            />
          ) : (
            <span className="text-gray-400">{userData.bloodType}</span>
          )}
        </dd>
      </div>
    </dl>
  </section>

  {/* Medical History */}
  <section className="mb-6">
    <h2 className="text-lg font-semibold text-pink-400 underline mb-3">Medical History</h2>
    {isEdit ? (
      <textarea
        className="bg-gray-700 rounded-lg p-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
        placeholder="Enter any known medical conditions or allergies"
        onChange={(e) => setUserData((prev) => ({ ...prev, medicalHistory: e.target.value }))}
        value={userData.medicalHistory || ''}
      />
    ) : (
      <p className="text-gray-400 whitespace-pre-line">{userData.medicalHistory || 'No medical history provided.'}</p>
    )}
  </section>

  {/* Buttons */}
  <footer className="flex justify-center mt-8">
    {isEdit ? (
      <button
        onClick={updateUserProfileData}
        className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-8 py-3 rounded-full hover:from-pink-500 hover:to-pink-400 transition-all flex items-center gap-2 shadow-lg hover:shadow-pink-500/30"
        aria-label="Save Information"
      >
        <FaSave />
        Save Information
      </button>
    ) : (
      <button
        onClick={() => setIsEdit(true)}
        className="border-2 border-pink-500 px-8 py-3 rounded-full text-pink-400 hover:bg-pink-900/40 hover:text-white transition-all flex items-center gap-2"
        aria-label="Edit Profile"
      >
        <FaEdit />
        Edit Profile
      </button>
    )}
  </footer>
</section>
  ) : null
}

export default MyProfile
