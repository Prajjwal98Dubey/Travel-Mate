import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const REGISTER_USER_API = 'http://localhost:5000/api/v1/register'
const RegisterUser = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pic, setPic] = useState("")
    const [city1, setCity1] = useState("")
    const [city2, setCity2] = useState("")
    const [city3, setCity3] = useState("")
    const navigate = useNavigate()
    const handlePicUpload = (e) => {
        const file = e.target.files[0]
        transformFile(file)
    }
    const transformFile = (file) => {
        const reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setPic(reader.result)
            }
        }
        else {
            setPic("")
        }

    }
    const registerUser = async () => {
        if (!name || !email || !password || !confirmPassword || !city1 || !city2 || !city3) {
            toast.warning("Enter all Fields", {
                position: 'top-center'
            })
            return
        }
        if (password !== confirmPassword) {
            toast.error("Password do not match", {
                position: 'top-center'
            })
            return
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(REGISTER_USER_API, {
            name, email, password, topCities: [city1, city2, city3], photo: pic
        }, config)

        if (data.token) {
            toast.success("Registration Successful.", {
                position: 'top-center'
            })
            localStorage.setItem("userInfo", JSON.stringify({ token: data.token, email: data.email }))
            navigate('/')
        }
        else {
            toast.error("User Exists with this email", {
                position: 'top-center'
            })
        }
    }

    return (
        <>
            <div className= '  bg-white flex justify-center pt-[10px] shadow-lg font-Afacad  border-x-slate-500 rounded-lg border border-gray-400 w-[540px] h-[540px]'>
                <div>
                    <div className='flex justify-center text-xl font-extrabold'>Register With us</div>
                    <div className='p-1 font-semibold'>Name</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Email' className=' p-1 border border-red-400 font-semibold w-[340px] h-[35px]' />
                    <div className='p-1 font-semibold'>Email</div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className=' p-1 border border-red-400 font-semibold w-[340px] h-[35px]' />
                    <div className='p-1 font-semibold'>Password</div>
                    <div className='relative'>
                        <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' className=' p-1 w-[340px] h-[35px] font-semibold border border-red-400' />
                        <div className='absolute top-0 right-0 p-2'>
                            {show ? <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#757070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off cursor-pointer" onClick={() => setShow(!show)}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#757070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye cursor-pointer" onClick={() => setShow(!show)}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>}
                        </div>
                    </div>
                    <div className='p-1 font-semibold'>Confirm Password</div>
                    <div className='relative'>
                        <input type={show ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Your Password' className=' p-1 w-[340px] h-[35px] font-semibold border border-red-400' />
                        <div className='absolute top-0 right-0 p-2'>
                            {show ? <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#757070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off cursor-pointer" onClick={() => setShow(!show)}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#757070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye cursor-pointer" onClick={() => setShow(!show)}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>}
                        </div>
                    </div>
                    <div className='p-[1px] font-semibold'>
                        <span className='mr-[3px]'>Upload Photo</span><input type="file" accept='image/' onChange={handlePicUpload} />
                    </div>
                    <div className='flex justify-center p-1 font-semibold'>Enter Your Top 3 Favourite Cities</div>
                    <div className=''>
                        <div><input className=' mb-1 p-1 w-[340px] h-[35px] font-semibold border border-red-400' placeholder='Enter City 1' type="text" value={city1} onChange={(e) => setCity1(e.target.value)} /></div>
                        <div><input className=' mb-1 p-1 w-[340px] h-[35px] font-semibold border border-red-400' placeholder='Enter City 2' type="text" value={city2} onChange={(e) => setCity2(e.target.value)} /></div>
                        <div><input className='mb-1 p-1 w-[340px] h-[35px] font-semibold border border-red-400' placeholder='Enter City 3' type="text" value={city3} onChange={(e) => setCity3(e.target.value)} /></div>
                    </div>
                    <div className='flex justify-center mt-2'><button className='w-[150px] h-[35px] bg-blue-500 font-semibold text-white text-xl hover:bg-blue-700 rounded-sm shadow-lg' onClick={() => {
                        
                        registerUser()
                    }}>Register</button></div>

                </div>
            </div>
        </>
    )
}

export default RegisterUser