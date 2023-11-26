

import React, { useEffect, useState } from 'react'
import LoginPage from './LoginPage'
import RegisterUser from './RegisterUser'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AuthPage = () => {
    const[newUser,setNewUser]=useState(false)

  return (
    <>
    <div className='flex items-center'>
        <div className='text-4xl text-red-600 font-extrabold border border-r-red-400 w-1/3 h-[590px] flex justify-center items-center'>Travel Mate</div>
       { newUser ? <div className='pl-[200px] pt-[30px] w-1/2 h-[610px] flex justify-center '><RegisterUser/></div>:<div className='pl-[200px] pt-[50px] w-1/2 h-[590px] flex justify-center '><LoginPage setNewUser={setNewUser}/></div> }
    </div>
    </>
  )
}

export default AuthPage