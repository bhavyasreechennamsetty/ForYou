import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="bg-gray-900 text-gray-200 px-4 sm:px-6 py-10">

    {/* About Us Header */}
    <div className='text-center pt-10'>
      <h2 className='text-3xl font-bold'>
        ABOUT <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300'>US</span>
      </h2>
      <div className='w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-pink-500 to-transparent'></div>
    </div>
  
    {/* Main Content */}
    <div className='my-10 flex flex-col lg:flex-row gap-12 items-center'>
      {/* Image */}
      <div className='lg:w-1/2 rounded-xl overflow-hidden border-2 border-pink-500/30 shadow-lg'>
        <img 
          className='w-full h-full object-cover' 
          src={assets.about_image} 
          alt="About ForYou" 
        />
      </div>
  
      {/* Text Content */}
      <div className='lg:w-1/2 space-y-6 text-gray-300'>
        <p className='text-lg leading-relaxed'>
          Welcome to <span className='text-pink-300 font-medium'>ForYou</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At ForYou, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
        </p>
        
        <p className='text-lg leading-relaxed'>
          ForYou is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, ForYou is here to support you every step of the way.
        </p>
  
        <h3 className='text-xl font-bold text-pink-300 mt-8'>Our Vision</h3>
        <p className='text-lg leading-relaxed'>
          Our vision at ForYou is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
        </p>
      </div>
    </div>
  
    {/* Why Choose Us */}
    <div className='text-center my-16'>
      <h2 className='text-3xl font-bold'>
        WHY <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300'>CHOOSE US</span>
      </h2>
      <div className='w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-pink-500 to-transparent'></div>
    </div>
  
    {/* Features */}
    <div className='grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-20 bg-gradient-to-r from-pink-500/30 to-transparent rounded-xl overflow-hidden'>
      {[
        {
          title: "EFFICIENCY",
          description: "Streamlined appointment scheduling that fits into your busy lifestyle."
        },
        {
          title: "CONVENIENCE",
          description: "Access to a network of trusted healthcare professionals in your area."
        },
        {
          title: "PERSONALIZATION",
          description: "Tailored recommendations and reminders to help you stay on top of your health."
        }
      ].map((feature, index) => (
        <div 
          key={index}
          className='bg-gray-800/80 p-8 sm:p-10 flex flex-col gap-4 hover:bg-gradient-to-br from-gray-800 to-pink-900/30 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-pink-500/30'
        >
          <h3 className='text-xl font-bold text-pink-300'>{feature.title}</h3>
          <p className='text-gray-300'>{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default About