import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className='md:mx-10 bg-gray-900 rounded-t-3xl px-6 sm:px-10 py-14 border-t border-pink-500/30'>
  {/* Main Content */}
  <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 md:gap-20 my-10 text-sm'>

    {/* Logo & Description */}
    <div>
      <img 
        className='mb-5 w-40' 
        src={assets.logo} 
        alt="Prescripto Logo" 
      />
      <p className='w-full md:w-2/3 text-gray-400 leading-relaxed'>
        ForYou is your trusted healthcare partner, connecting you with 100+ certified doctors for seamless appointment booking.
      </p>
      <div className='flex gap-4 mt-5'>
        <FaFacebookF 
          className='text-gray-400 hover:text-pink-400 cursor-pointer transition-colors duration-200' 
          size={18}
        />
        <FaTwitter 
          className='text-gray-400 hover:text-pink-400 cursor-pointer transition-colors duration-200' 
          size={18}
        />
        <FaInstagram 
          className='text-gray-400 hover:text-pink-400 cursor-pointer transition-colors duration-200' 
          size={18}
        />
      </div>
    </div>

    {/* Company Links */}
    <div>
      <p className='text-xl font-semibold mb-5 text-pink-300'>COMPANY</p>
      <ul className='flex flex-col gap-3 text-gray-400'>
        <li className='hover:text-pink-300 cursor-pointer transition-colors duration-200'>Home</li>
        <li className='hover:text-pink-300 cursor-pointer transition-colors duration-200'>About us</li>
        <li className='hover:text-pink-300 cursor-pointer transition-colors duration-200'>Services</li>
        <li className='hover:text-pink-300 cursor-pointer transition-colors duration-200'>Privacy policy</li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <p className='text-xl font-semibold mb-5 text-pink-300'>GET IN TOUCH</p>
      <ul className='flex flex-col gap-3 text-gray-400'>
        <li className='flex items-center gap-2 hover:text-pink-300 cursor-pointer transition-colors duration-200'>
          <FaPhone size={14} />
          +91 1234567890
        </li>
        <li className='flex items-center gap-2 hover:text-pink-300 cursor-pointer transition-colors duration-200'>
          <FaEnvelope size={14} />
          ForYou@gmail.com
        </li>
      </ul>
    </div>

  </div>

  {/* Copyright */}
  <div className='mt-10'>
    <hr className='border-gray-700' />
    <p className='py-5 text-sm text-center text-gray-500'>
      Copyright © {new Date().getFullYear()} ForYou.com - All Rights Reserved.
    </p>
  </div>
</div>
  )
}

export default Footer
