import React, { useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import {useNavigate } from 'react-router-dom';
const LOGIN_API = 'http://localhost:5000/api/v1/login'
const LoginPage = ({ setNewUser }) => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate= useNavigate()
    const loginUser = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(LOGIN_API, {
            email, password
        }, config)
        console.log(data)
        if (data.token) {
            localStorage.setItem("userInfo",JSON.stringify(data))
            toast.success("Login Success", {
                position: 'top-center'
            })
            navigate('/')
        }
        else {
            if (data === 'User does not exists.') {
                toast.error("No User With this email exists.", {
                    position: 'top-center'
                })
            }
            else {
                toast.error("Invalid Credentials", {
                    position: 'top-center'
                })
            }

        }
    }
    return (
        <>
            <div className='bg-white flex justify-center pt-[100px] shadow-xl border-x-slate-500 rounded-lg border border-gray-400 w-[500px] h-[500px]'>
                <div>
                    <div className='flex justify-center text-xl font-extrabold'>Login With Email</div>
                    <div className='p-1'>Email</div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className='  p-1 border border-red-400 font-semibold w-[340px] h-[35px]' />
                    <div className='p-1'>Password</div>
                    <div className='relative'>
                        <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' className=' p-1 w-[340px] h-[35px] font-semibold border border-red-400' />
                        <div className='absolute top-0 right-0 p-2'>{show ? <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#757070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off cursor-pointer" onClick={() => setShow(!show)}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#757070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye cursor-pointer" onClick={() => setShow(!show)}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>}</div></div>
                    <div className='flex justify-center mt-2'><button className='w-[150px] h-[35px] bg-blue-500 font-semibold text-white hover:bg-blue-700 rounded-sm shadow-lg' onClick={() => loginUser()}>Login</button></div>
                    <div className='text-md flex justify-center pr-1 pt-4 font-semibold'>New User <span className='text-blue-600 hover:underline cursor-pointer pl-1' onClick={() => setNewUser(true)}> Register Here</span></div>
                    {JSON.parse(localStorage.getItem("userInfo")) ?<><div className='flex justify-center pt-4 text-xl font-extrabold'>You are already <span className='text-green-500 pl-2'>Logged in</span></div>
                    <div className='flex justify-center pt-2 text-lg font-bold'>Go to <span className='text-blue-600 text-lg pl-2 font-bold hover:underline cursor-pointer' onClick={()=>{navigate("/")}}>Main Page</span></div></> :null}
                </div>
            </div>
        </>
    )
}

export default LoginPage