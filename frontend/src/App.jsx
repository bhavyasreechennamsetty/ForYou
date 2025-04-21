import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%] bg-gray-900 min-h-screen'>
  {/* Background gradient overlay */}
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -z-10"></div>
  
  {/* Decorative elements */}
  <div className="fixed top-0 right-0 w-64 h-64 rounded-full bg-pink-900/10 blur-3xl -z-10"></div>
  <div className="fixed bottom-0 left-0 w-64 h-64 rounded-full bg-pink-900/10 blur-3xl -z-10"></div>

  <ToastContainer 
    toastClassName="bg-gray-800 border border-pink-500/30 text-gray-200"
    progressClassName="bg-pink-500"
  />
  
  <Navbar />
  
  <main className="pt-4 pb-8">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/doctors' element={<Doctors />} />
      <Route path='/doctors/:speciality' element={<Doctors />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/appointment/:docId' element={<Appointment />} />
      <Route path='/my-appointments' element={<MyAppointments />} />
      <Route path='/my-profile' element={<MyProfile />} />
      <Route path='/verify' element={<Verify />} />
    </Routes>
  </main>
  
  <Footer />
</div>
  )
}

export default App
