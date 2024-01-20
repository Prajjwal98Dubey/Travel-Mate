import React, { useEffect, useState } from 'react'
import { IMG_USER, LOADING_IMG, city } from './dummy'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import TravellerBlog from './TravellerBlog';
import Chat from './Chat';

const GET_USER_API = "http://localhost:5000/api/v1/getUser"
const TRAVELLER_API = "http://localhost:5000/api/v1/traveller"
const Blogs = () => {
    const [searchParams] = useSearchParams()
    const [personData, setPersonData] = useState([])
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingBlog, setIsLoadingBlog] = useState(true)
    const[openChat,setOpenChat] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const getData = async () => {
            const { data } = await axios.post(GET_USER_API, {
                email: searchParams.get('v')
            }, config)
            setPersonData(data)
            setIsLoading(false)
        }
        const getBlogs = async () => {
            const { data } = await axios.post(TRAVELLER_API, {
                email: searchParams.get('v')
            }, config)
            setBlogs(data)
            setIsLoadingBlog(false)
        }
        getData()
        getBlogs()
    }, [searchParams])
    const getImages = (city_name) => {
        const cityImage = city.filter((c) => c.name.toLowerCase() === city_name.toLowerCase())
        return cityImage[0].images[0]
    }
    return (
        <>
            <div className='flex font-Afacad '>
                {isLoading ? <div className='flex justify-center'><img src={LOADING_IMG} alt="loading" className='w-[150px] h-[150px] rounded-full flex justify-center mt-[100px]' /></div> : <div className='w-1/3 h-[595px] bg-red-500 text-white p-5 relative'>
                    <Link to='/'><div className='absolute top-1 '><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg></div></Link>
                    <div className='mt-3'>
                        <div className='flex justify-center m-1'><img src={personData[0].photo.url ? personData[0].photo.url : IMG_USER} alt="loading" className='w-[130px] h-[130px] rounded-full  ' /></div>
                    </div>
                    <div className='text-white flex justify-center font-bold text-4xl p-2'>{personData[0].name}</div>
                    <div className='flex justify-center font-semibold text-white'>{personData[0].email}</div>
                    <div className='flex justify-center font-bold text-xl p-2'>Favourite Places</div>
                    <div className=''>
                        <div className='flex justify-center'>
                            <div className='relative'>
                                <img className="w-[190px] h-[150px] p-1 rounded-lg hover:scale-105" src={getImages(personData[0].topCities[0])} alt="loading" />
                                <div className='absolute top-[115px] left-[75px] font-semibold '>{personData[0].topCities[0].toUpperCase()}</div>
                            </div>
                            <div className="relative">
                                <img className="w-[190px] h-[150px] p-1 rounded-lg hover:scale-105" src={getImages(personData[0].topCities[1])} alt="loading" />
                                <div className='absolute top-[115px] left-[70px] font-semibold  '>{personData[0].topCities[1].toUpperCase()}</div>
                            </div>
                        </div>
                        <div className='relative'>
                            <img className="w-[385px] h-[150px] p-1 rounded-lg hover:scale-105" src={getImages(personData[0].topCities[2])} alt="loading" />
                            <div className='absolute top-[115px] left-[170px] font-extrabold '>{personData[0].topCities[2].toUpperCase()}</div>
                        </div>

                    </div>
                </div>}
                <div className='w-2/3 h-[590px] overflow-y-scroll scroll-smooth '  >
                    <div className=' flex justify-center font-bold text-2xl p-2 '>Blogs</div>
                    {isLoadingBlog ? <div className='flex justify-center'><img src={LOADING_IMG} alt="loading" className='w-[150px] h-[150px] flex justify-center mt-[100px]' /></div> : <div className='flex justify-center p-2 '>
                        <div>
                            {blogs.length === 0 ? <div>He/She has not written any blogs yet.</div> : blogs.map((blog) => <TravellerBlog key={blog._id} blog={blog} />)}

                        </div>
                        <div className='font-Afacad w-[300px] h-[50px] fixed right-0 bottom-0 bg-black text-white font-bold text-xl flex justify-center items-center rounded-l-md rounded-r-md cursor-pointer' onClick={()=>
                            localStorage.getItem("userInfo") ? setOpenChat(true) :  navigate('/auth/user')
                        }>Chat with {personData[0].name}</div>
                        {openChat && <div className='fixed z-10 right-0 bottom-0 w-[450px] h-[350px] bg-black text-white  font-bold text-xl p-2'>
                            <div className='flex justify-between'>
                            <div className=''>Chat</div>
                        <div onClick={()=>setOpenChat(false)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b5aaaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
                        </div>
                        <Chat person ={personData[0].email}/>
                        </div>
                        }
                    </div>}
                    
                </div>
            </div>
        </>
    )
}

export default Blogs