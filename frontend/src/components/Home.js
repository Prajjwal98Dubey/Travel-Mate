import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SearchComponent from './SearchComponent'
import { BG_IMG, SKETCH_IMG } from './dummy'
import FrequentCities from './FrequentCities'
import SearchByName from './SearchByName'
import {io} from 'socket.io-client'
import axios from 'axios'

const socket = io.connect('http://localhost:5001/')
const GET_SENDER_USER_ID = "http://localhost:5000/api/v1/sender-id"
const Home = () => {
  const[bgImg,setBgImg]=useState("https://as1.ftcdn.net/v2/jpg/04/01/43/06/1000_F_401430617_QU5FmwCbN3oiysrAnVN2yXreAkbPOESe.jpg")
  const[animationClass,setAnimationClass]=useState('animate-fadeOut')
  useEffect(()=>{
      const getSenderDetails=async()=>{
        const {data} = await axios.get(GET_SENDER_USER_ID + `?sEmail=${JSON.parse(localStorage.getItem("userInfo")).email}`,{
          headers: {
              'Content-Type': 'application/json'
          }
      })
        localStorage.setItem("senderUserId",JSON.stringify(data.sender))
      }
      if(localStorage.getItem("userInfo")) getSenderDetails()
  },[])
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
        {
        console.log(socket.id)
        }
        <div className='font-Afacad'>
        <Navbar/>
        <div className={`bg-cover bg-center ${animationClass}`} style={{ backgroundImage: `url(${bgImg})`, width: '100%', height: '495px'}}
        >
        <div className=''>
        <SearchComponent/>
        </div>
        </div>
        <div className= ' w-full h-[200px] bg-red-500'>
        <div>
        <FrequentCities/>
        </div>
        <div className='bg-cover bg-center' style={{ backgroundImage: `url("img4.png")`, width: '100%', height: '495px'}}>
          <SearchByName/>
        </div>
        </div>
        </div>
        </>
  )
}

export default Home