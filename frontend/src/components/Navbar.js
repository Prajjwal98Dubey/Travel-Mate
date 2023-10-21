import React  from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
      const getUser=(token)=>{
        return token.email
      }
      // useEffect(()=>{
      //     getUser()
      // },[JSON.parse(localStorage.("userInfo"))])
  return (
    <>
    <div className='h-[100px] w-full flex justify-around border border-b-red-600 items-center'>
        <div className=''>Ex.</div>
        <div className='font-bold text-3xl text-red-500'>Travel Mate</div>
        <div className=''>{localStorage.getItem("userInfo")?<Link to="/my-profile"><div className='text-blue-600 text-xl font-bold '>{getUser(JSON.parse(localStorage.getItem("userInfo")))}</div> </Link>:<Link to='/auth/user'><button className='h-[50px] w-[100px] bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-800 font-semibold'>Login</button></Link>}</div>
    </div>
    </>
  )
}

export default Navbar