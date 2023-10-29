import React, { useEffect, useState }  from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
      const[isHovered,setIsHovered]=useState(false)
      const[isHoveredBurger,setIsHoveredBurger]=useState(false)
      const[showSideModal,setShowSideModal]=useState(false)
      const[closeModal,setCloseModal]=useState(false)
      const getUser=(token)=>{
        return token.email
      }
      const handleCloseModal=()=>{
        setShowSideModal(false)
      }
      
      useEffect(()=>{
            handleCloseModal()
      },[closeModal])
  return (
    <>
    <div className='h-[100px] w-full flex justify-around p-2 border border-b-red-600 items-center relative'>
        <div className=' w-fit h-fit cursor-pointer flex justify-center' onMouseEnter={()=>setIsHoveredBurger(true)} onMouseLeave={()=>setIsHoveredBurger(false)} onClick={()=>setShowSideModal(true)}>
        {isHoveredBurger ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#cb1515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>}
        {showSideModal && <div className='animate-slideInLeft absolute z-10 shadow-xl shadow-red-500 top-0 left-0 w-[310px] h-[594px] border border-gray-400 bg-red-500 rounded-md flex justify-center p-2'>
          <div className='mt-12 text-white'>
          <div className='text-4xl font-extrabold text-center '>Travel Mate</div>
          <div className='font-medium text-center'>Companion for Solo Adventures</div>
          <div className='font-medium mt-10 text-center'>Embark on unforgettable journeys with Travel Mate, a web application designed to connect solo travelers and transform their adventures into shared experiences. </div>
          <div className='font-medium mt-6 text-center'>No more exploring the world alone – find your ideal travel companion and create memories that last a lifetime.</div>
          <div className='flex justify-center'><img src="https://t3.ftcdn.net/jpg/06/29/94/88/240_F_629948846_6qr35o5Rq4nR4vGrf7LU2MnnWKUZzji7.jpg" alt="loading" className='w-[140px] h-[140px] rounded-full mt-4 border border-red-700' /></div>
          </div>
          <div className='absolute left-[310px] z-10 cursor-pointer' onClick={()=>{
              console.log("Cross Clicked !!!")
              handleCloseModal()
              setCloseModal(!closeModal)
          }}>❌</div>
          </div>}
        </div>
        <div className='font-bold text-3xl text-red-500'>Travel Mate</div>
        <div>{localStorage.getItem("userInfo")?<Link to="/my-profile"><div className='text-blue-600 text-xl font-bold relative' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>{getUser(JSON.parse(localStorage.getItem("userInfo")))}
        {isHovered && <div className='absolute text-center ml-6 w-[70px] h-[25px] text-sm font-medium text-black border border-gray-400 bg-gray-400 rounded-lg'>Profile</div>}
        </div> </Link>:<Link to='/auth/user'><button className='h-[50px] w-[100px] bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-800 font-semibold'>Login</button></Link>}</div>
    </div>
    </>
  )
}

export default Navbar