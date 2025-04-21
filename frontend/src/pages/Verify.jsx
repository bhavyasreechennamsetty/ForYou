import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get("success")
    const appointmentId = searchParams.get("appointmentId")

    const { backendUrl, token } = useContext(AppContext)

    const navigate = useNavigate()

    // Function to verify stripe payment
    const verifyStripe = async () => {

        try {

            const { data } = await axios.post(backendUrl + "/api/user/verifyStripe", { success, appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

            navigate("/my-appointments")

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (token, appointmentId, success) {
            verifyStripe()
        }
    }, [token])

    return (
        <div className='min-h-[60vh] flex items-center justify-center bg-gray-900'>
  <div className="relative">
    {/* Pink glowing outer circle */}
    <div className="absolute -inset-1 rounded-full bg-pink-500/20 blur-md animate-pulse"></div>
    
    {/* Main spinner */}
    <div className="w-20 h-20 border-4 border-gray-700 border-t-4 border-t-pink-500 rounded-full animate-spin relative">
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(236,72,153,0.3)]"></div>
    </div>
  </div>
</div>
    )
}

export default Verify