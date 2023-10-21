import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IMG_USER, city } from './dummy'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const PROFILE_API = "http://localhost:5000/api/v1/getmyinfo"

const Profile = () => {
    const [result,setResult]=useState([])
    const[isLoading,setIsLoading]=useState(true)
    const[isHovered1,setIsHovered1]=useState(false)
    const[isHovered2,setIsHovered2]=useState(false)
    const[isHovered3,setIsHovered3]=useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const getMyProfile = async () => {
            const { data } = await axios.post(PROFILE_API, {
                email: JSON.parse(localStorage.getItem("userInfo")).email
            }, config)
            setResult(data)
            setIsLoading(false)
        }
        getMyProfile()
    }, [])
    const getImages=(city_name)=>{
        const cityImage = city.filter((c)=>c.name.toLowerCase()===city_name.toLowerCase())
        return cityImage[0].images[0]
    }
    const handleLogout=()=>{
        localStorage.removeItem("userInfo")
        setTimeout(()=>{
            toast.error('Logout Success',{
                position:'top-center'
            })
            navigate("/")
        },1000)
        
    }
    return (
        <>
            {isLoading ? <div>loading</div>:
            <div className='text-white'>
                <div className='w-full h-[350px] bg-red-500'>
                    <div className='flex justify-center p-4'>
                        <img className='w-[150px] h-[150px] rounded-full border border-black' src={IMG_USER} alt="loading" />
                    </div>
                    <div className='font-extrabold flex justify-center text-5xl'>{result[0].name}</div>
                    <div className='font-semibold flex justify-center text-xl p-2'>{result[0].email}</div>
                    <div className='flex justify-center'>
                        <div className='p-2 cursor-pointer  hover:bg-black rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></div>
                        <div className='p-2 cursor-pointer hover:bg-black rounded-full ' onClick={()=>handleLogout()}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg></div>
                    </div>
                </div>
                <div className='text-black w-full h-[245px]'>
                    <div className='flex justify-center font-bold text-3xl  ml-10 p-2 '>My Favourite Destinations <span className=' flex justify-center p-2 ml-2 hover:bg-black rounded-full hover:text-white cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></span></div>
                    <div className='flex justify-center p-2'>
                        <div className='relative'>
                            <img  className={`w-[300px] h-[150px] rounded-lg p-1    cursor-pointer ${isHovered1 ? 'opacity-50':''}`} src={getImages(result[0].topCities[0])}  alt="loading" onMouseEnter={()=>setIsHovered1(true)} onMouseLeave={()=>setIsHovered1(false)} />
                            {isHovered1 && <div className=' cursor-pointer  text-5xl text-black font-bold absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{result[0].topCities[0].toUpperCase()}</div>}
                        </div>
                        <div className='relative'>
                            <img  className={`w-[300px] h-[150px] rounded-lg p-1    cursor-pointer ${isHovered2 ? 'opacity-50':''}`} src={getImages(result[0].topCities[1])}  alt="loading" onMouseEnter={()=>setIsHovered2(true)} onMouseLeave={()=>setIsHovered2(false)} />
                            {isHovered2 && <div className=' cursor-pointer  text-5xl text-black font-bold absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{result[0].topCities[1].toUpperCase()}</div>}
                        </div>
                        <div className='relative'>
                            <img  className={`w-[300px] h-[150px] rounded-lg p-1    cursor-pointer ${isHovered3 ? 'opacity-50':''}`} src={getImages(result[0].topCities[2])}  alt="loading" onMouseEnter={()=>setIsHovered3(true)} onMouseLeave={()=>setIsHovered3(false)} />
                            {isHovered3 && <div className=' cursor-pointer  text-5xl text-black font-bold absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{result[0].topCities[2].toUpperCase()}</div>}
                        </div>
                    </div>
                </div>
            </div>
                }
        </>
    )
}

export default Profile