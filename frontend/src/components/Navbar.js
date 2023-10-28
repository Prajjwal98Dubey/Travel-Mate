import React, { useState }  from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
      const[isHovered,setIsHovered]=useState(false)
      const getUser=(token)=>{
        return token.email
      }
  return (
    <>
    <div className='h-[100px] w-full flex justify-around border border-b-red-600 items-center'>
        <div className=''>Ex.</div>
        <div className='font-bold text-3xl text-red-500'>Travel Mate</div>
        <div>{localStorage.getItem("userInfo")?<Link to="/my-profile"><div className='text-blue-600 text-xl font-bold relative' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>{getUser(JSON.parse(localStorage.getItem("userInfo")))}
        {isHovered && <div className='absolute text-center ml-6 w-[70px] h-[25px] text-sm font-medium text-black border border-gray-400 bg-gray-400 rounded-lg'>Profile</div>}
        </div> </Link>:<Link to='/auth/user'><button className='h-[50px] w-[100px] bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-800 font-semibold'>Login</button></Link>}</div>
    </div>
    </>
  )
}

export default Navbar