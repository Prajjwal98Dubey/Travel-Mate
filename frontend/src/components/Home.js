import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SearchComponent from './SearchComponent'
import { BG_IMG } from './dummy'
import FrequentCities from './FrequentCities'
import SearchByName from './SearchByName'
const Home = () => {
  const[bgImg,setBgImg]=useState("https://as1.ftcdn.net/v2/jpg/04/01/43/06/1000_F_401430617_QU5FmwCbN3oiysrAnVN2yXreAkbPOESe.jpg")
  const[animationClass,setAnimationClass]=useState('animate-fadeOut')

  useEffect(()=>{
      const interval = setInterval(()=>{
        setBgImg(BG_IMG[Math.floor(Math.random()*BG_IMG.length)])
        setAnimationClass('animate-fadeOut')
      },6000)
      return ()=>{
        clearInterval(interval)
      }
  },[bgImg])
  return (
        <>
        <div className='font-Afacad'>
        <Navbar/>
        <div className={`bg-cover bg-center ${animationClass}`} style={{ backgroundImage: `url(${bgImg})`, width: '100%', height: '495px'}}
        >
        <div className=''>
        <SearchComponent/>
        </div>
        </div>
        <div>
        <FrequentCities/>
        </div>
        <div>
          <SearchByName/>
        </div>
        
        </div>
        </>
  )
}

export default Home