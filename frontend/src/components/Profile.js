import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IMG_USER, LOADING_IMG, city } from './dummy'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import MyBlogs from './MyBlogs'
import ProfileShimmer from './ProfileShimmer'
const PROFILE_API = "http://localhost:5000/api/v1/getmyinfo"
const CREATE_POST_API = "http://localhost:5000/api/v1/blog"
const GET_MY_BLOGS = "http://localhost:5000/api/v1/blog"
const UPDATE_NAME_API = "http://localhost:5000/api/v1/edit_name"

const Profile = () => {
    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingBlog, setIsLoadingBlog] = useState(true)
    const [showPostModal, setShowPostModal] = useState(false)
    const [editNameModal, setEditNameModal] = useState(false)
    const [updatedName, setUpdatedName] = useState("")
    const [postButton, setPostButton] = useState(true)
    const [isHovered1, setIsHovered1] = useState(false)
    const [isHovered2, setIsHovered2] = useState(false)
    const [isHovered3, setIsHovered3] = useState(false)
    const [isHoveredLogout, setIsHoveredLogOut] = useState(false)
    const [isHoveredEdit, setIsHoveredEdit] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [blogs, setBlogs] = useState([])
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
    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
            }
        }
        const getBlogs = async () => {
            const { data } = await axios.get(GET_MY_BLOGS
                , config)
            setBlogs(data)
            setIsLoadingBlog(false)
            console.log("API CALL")
        }
        getBlogs()

    }, [])
    const handleUpdateName = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
            }
        }
        const { data } = await axios.put(UPDATE_NAME_API, {
            email: localStorage.getItem("userInfo").email,
            updatedName: "Chiku Kohli Cool Boy"
        }, config)
        console.log(data)
        toast.success("Name Updated", {
            position: 'top-center'
        })
        setEditNameModal(false)
    }
    const getImages = (city_name) => {
        const cityImage = city.filter((c) => c.name.toLowerCase() === city_name.toLowerCase())
        return cityImage[0].images[0]
    }
    const handleLogout = () => {
        localStorage.removeItem("userInfo")
        setTimeout(() => {
            toast.error('Logout Success', {
                position: 'top-center'
            })
            navigate("/")
        }, 1000)

    }
    const handleCreateAPost = async () => {
        if (!title || !desc) {
            toast.error('Enter all Fields', {
                position: 'top-center'
            })
            return
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
            }
        }

        const { data } = await axios.post(CREATE_POST_API, {
            title: title,
            description: desc
        }, config)
        setShowPostModal(false)
        setPostButton(true)
        setTitle("")
        setDesc("")
        toast.success("Blog Posted", {
            position: 'top-center'
        })
    }

    return (
        <> 
            {isLoading ? <div className='flex justify-center mt-[250px]'><img src={LOADING_IMG} alt="loading" className='w-[150px] h-[150px] rounded-full' /></div>:
                <div className='text-white'>
                    <div className='w-full h-[400px] bg-red-500 relative'>
                        <Link to='/'><div className='absolute top-1 left-4 '><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg></div></Link>
                        <div className='flex justify-center p-4'>
                            <img className='w-[150px] h-[150px] rounded-full border border-black' src={IMG_USER} alt="loading" />
                        </div>
                        <div className='font-extrabold flex justify-center text-5xl'>{result[0].name}</div>
                        <div className='font-semibold flex justify-center text-xl p-2'>{result[0].email}</div>
                        <div className='flex justify-center'>
                            <div className=' relative p-2 cursor-pointer hover:bg-black rounded-full' onMouseEnter={() => setIsHoveredEdit(true)} onMouseLeave={() => setIsHoveredEdit(false)}
                                onClick={() => setEditNameModal(true)}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                {isHoveredEdit && <div className='absolute top-0 right-10 text-center ml-6 w-[70px] h-[25px] text-sm font-medium text-black border border-gray-400 bg-gray-400 rounded-lg '>Edit</div>}

                            </div>
                            {editNameModal &&
                                <div className='rounded-lg absolute top-30 z-10 shadow-lg shadow-black  w-[300px] h-[120px] bg-black'>
                                    <div className='m-2'>
                                        <div className='relative flex justify-center'>Enter New Name
                                            <div className='absolute top-0 right-0 cursor-pointer' onClick={() => setEditNameModal(false)}>❌</div>
                                        </div>
                                        <div className='flex justify-center m-2 text-black'><input type="text" className='w-[200px] h-[35px] rounded-lg p-2 ' placeholder="Change your name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} /></div>
                                        <div className='flex justify-center'><button className='w-[100px] h-[30px] bg-green-500 rounded-lg' onClick={() => handleUpdateName()}>Update</button></div>
                                    </div>
                                </div>

                            }
                            <div className='p-2 cursor-pointer hover:bg-black rounded-full relative ' onMouseEnter={() => setIsHoveredLogOut(true)} onMouseLeave={() => setIsHoveredLogOut(false)} onClick={() => handleLogout()}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                {isHoveredLogout && <div className='absolute top-0 left-4 text-center ml-6 w-[70px] h-[25px] text-sm font-medium text-black border border-gray-400 bg-gray-400 rounded-lg '>Logout</div>}</div>
                        </div>
                        <div className='flex justify-center mt-2'>
                            {postButton && <div className='bg-black rounded-full cursor-pointer' onClick={() => {
                                setShowPostModal(true)
                                setPostButton(false)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            </div>}
                            {showPostModal &&
                                <div className=' transform -translate-x-1/2 -translate-y-1/2 relative flex justify-center bg-black w-[500px] h-[300px] border border-gray-400 z-10'>
                                    <div className=' text-black'>
                                        <div className='w-[30px] absolute right-0 cursor-pointer' onClick={() => {
                                            setPostButton(true)
                                            setShowPostModal(false)
                                            setDesc("")
                                            setTitle("")
                                        }}>❌</div>
                                        <div className='flex justify-center font-bold text-2xl text-white'>Write a Blog</div>
                                        <div><input type="text" className='m-2 w-[300px] h-[30px] pl-1 font-medium' placeholder='write the title' value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                                        <div><textarea placeholder='write the description of your trip' value={desc} onChange={(e) => setDesc(e.target.value)} rows="4" cols="50" className=' m-2 w-[300px] h-[30px] pl-1 font-medium' /></div>
                                        <div className='flex justify-center'><button className='w-[100px] h-[35px] border border-red-400 hover:bg-red-400 rounded-lg text-white' onClick={() => handleCreateAPost()}>Post</button></div>
                                    </div>
                                </div>}

                        </div>
                    </div>
                    <div className='text-black w-full h-[245px] font-sans'>
                        <div className='flex justify-center font-bold text-3xl  ml-10 p-2 '>My Favourite Destinations <span className=' flex justify-center p-2 ml-2 hover:bg-black rounded-full hover:text-white cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg></span></div>
                        <div className='flex justify-center p-2'>
                            <div className='relative'>
                                <img className={`w-[300px] h-[150px] rounded-lg p-1  cursor-pointer ${isHovered1 ? 'opacity-50' : ''}`} src={getImages(result[0].topCities[0])} alt="loading" onMouseEnter={() => setIsHovered1(true)} onMouseLeave={() => setIsHovered1(false)} />
                                {isHovered1 && <div className=' cursor-pointer  text-3xl text-black font-bold absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{result[0].topCities[0].toUpperCase()}</div>}
                            </div>
                            <div className='relative'>
                                <img className={`w-[300px] h-[150px] rounded-lg p-1    cursor-pointer ${isHovered2 ? 'opacity-50' : ''}`} src={getImages(result[0].topCities[1])} alt="loading" onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)} />
                                {isHovered2 && <div className=' cursor-pointer  text-3xl text-black font-bold absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{result[0].topCities[1].toUpperCase()}</div>}
                            </div>
                            <div className='relative'>
                                <img className={`w-[300px] h-[150px] rounded-lg p-1    cursor-pointer ${isHovered3 ? 'opacity-50' : ''}`} src={getImages(result[0].topCities[2])} alt="loading" onMouseEnter={() => setIsHovered3(true)} onMouseLeave={() => setIsHovered3(false)} />
                                {isHovered3 && <div className=' cursor-pointer  text-3xl text-black font-bold absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{result[0].topCities[2].toUpperCase()}</div>}
                            </div>
                        </div>
                    </div>
                    <div className='text-black flex justify-center text-2xl font-extrabold'>My Blogs</div>
                    {isLoadingBlog ? <div>Loading Blogs...</div> : <div className='flex justify-center'>
                        <div>
                            {blogs.length === 0 ? <div>You have not written any blog.</div> : 
                            blogs.map((blog) => <MyBlogs key={blog._id} blog={blog} />)}
                        </div>
                    </div>}
                </div>

            }
        </>
    )
}

export default Profile