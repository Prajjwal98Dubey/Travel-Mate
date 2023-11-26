import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
const BLOG_EDIT_API = 'http://localhost:5000/api/v1/blog_edit/'
const BLOG_DELETE_API='http://localhost:5000/api/v1/blog_delete/'
const MyBlogs = ({ blog }) => {
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState(blog.title)
    const [updatedDescription, setUpdatedDescription] = useState(blog.description)

    const handleClostEditBlogModal=()=>{
        setEditModal(false)
    }
    const handleDeleteBlog=async()=>{
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
            }
        }
        const {data} = await axios.delete(BLOG_DELETE_API+blog._id,config)
        toast.error("Blog Removed",{
            position:'top-center'
        })
        window.location.reload()
        setDeleteModal(false)
    }
    const handleEditBlog = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
            }
        }
        const { data } = await axios.put(BLOG_EDIT_API + blog._id, {
            updatedTitle: updatedTitle, updatedDescription: updatedDescription
        }, config)
        setEditModal(false)
        toast.success("Blog Updated", {
            position: 'top-center'
        })
    }

    return (
        <>
            <div className='text-black'>
                <div className=' w-[900px] h-fit p-2 border border-gray-400 rounded-xl m-2 '>
                    <div className='text-center font-bold relative'>{blog.title}
                        <div className='absolute top-0  right-6 cursor-pointer' onClick={() => setEditModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                        </div>
                        <div className='absolute top-0 right-0 cursor-pointer' onClick={() => setDeleteModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                        </div>

                        {editModal &&
                            <div className='transform -translate-x-1/2 -translate-y-1/2 flex justify-center bg-black w-[500px] h-[300px] border border-gray-400 z-10 absolute left-[450px] top-0  shadow-red-500 shadow-md rounded-lg '>
                                <div className='absolute top-1 right-2 cursor-pointer ' onClick={()=>handleClostEditBlogModal()}>❌</div>
                                <div className=' text-black mt-6'>
                                    <div className='w-[30px] absolute right-0 cursor-pointer'></div>
                                    <div className='flex justify-center font-bold text-2xl text-white'>Edit Blog</div>
                                    <div><input type="text" className='rounded-lg m-2 w-[300px] h-[30px] pl-1 font-medium' placeholder='write the title' value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} /></div>
                                    <div><textarea placeholder='write the description of your trip' value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} rows="4" cols="50" className=' m-2 w-[300px] h-[70px] pl-1 font-medium ' /></div>
                                    <div className='flex justify-center'><button className='w-[100px] h-[35px] border border-red-400 hover:bg-red-400 rounded-lg text-white' onClick={() => handleEditBlog()}>Edit</button></div>
                                </div>
                            </div>
                        }
                        {deleteModal &&
                            <div className='w-[550px] h-[100px] bg-black absolute left-[200px] top-0 rounded-lg '>
                                <div className='flex justify-center text-xl font-bold text-white'>Are you sure to delete this blog ? </div>
                                <div className='flex justify-center p-2'>
                                    <div><button className='w-[100px] h-[36px] bg-blue-600 m-2 hover:bg-blue-400 rounded-lg' onClick={()=>handleDeleteBlog()}>YES</button></div>
                                    <div><button className='w-[100px] h-[36px] bg-red-600 m-2 hover:bg-red-400 rounded-lg' onClick={()=>setDeleteModal(false)}>NO</button></div>
                                </div>

                            </div>
                        }
                    </div>
                    <div className='text-center'>{blog.description}</div>
                </div>
            </div>
        </>
    )
}


export default MyBlogs