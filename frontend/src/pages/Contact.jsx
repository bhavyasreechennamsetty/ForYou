import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="bg-gray-900 px-4 sm:px-6 py-12 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-pink-900/20 blur-3xl"></div>
  <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-pink-900/20 blur-3xl"></div>

  {/* Contact Header */}
  <div className='text-center pt-6 relative z-10'>
    <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300'>
      CONTACT US
    </h2>
    <div className='w-24 h-1.5 mx-auto mt-4 bg-gradient-to-r from-pink-500 via-pink-400 to-transparent rounded-full'></div>
    <p className="mt-4 text-pink-200/80 max-w-2xl mx-auto">
      Get in touch with our team for any inquiries or career opportunities
    </p>
  </div>

  {/* Contact Content */}
  <div className='my-12 flex flex-col lg:flex-row gap-10 items-center max-w-6xl mx-auto relative z-10'>
    {/* Contact Image */}
    <div className='lg:w-1/2 rounded-xl overflow-hidden border-2 border-pink-500/30 shadow-2xl hover:shadow-pink-500/20 transition-shadow duration-300'>
      <img 
        className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
        src={assets.contact_image} 
        alt="Contact ForYou" 
      />
    </div>

    {/* Contact Info */}
    <div className='lg:w-1/2 space-y-8 p-6 sm:p-8 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-pink-500/20'>
      <div>
        <h3 className='text-2xl font-bold text-pink-300 flex items-center gap-2'>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          OUR OFFICE
        </h3>
        <p className='text-lg mt-3 text-gray-300'>
          1234 JubliHills<br />
          Suite 350, Hyderabad, India
        </p>
      </div>
      
      <div>
        <h3 className='text-2xl font-bold text-pink-300 flex items-center gap-2'>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          CONTACT INFO
        </h3>
        <p className='text-lg mt-3 text-gray-300'>
          Tel: (+91) 1234567890<br />
          Email: ForYou@gmail.com
        </p>
      </div>

      <div className='pt-4'>
        <h3 className='text-2xl font-bold text-pink-300 flex items-center gap-2'>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
          CAREERS AT ForYou
        </h3>
        <p className='text-lg mt-3 text-gray-300 mb-6'>
          Learn more about our teams and job openings.
        </p>
        <button className='bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-8 py-3.5 text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center gap-2'>
          Explore Jobs
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Contact
