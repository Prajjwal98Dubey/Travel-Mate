import React from 'react'

const MyBlogs = ({ blog }) => {
    return (
        <>
            <div className='text-black'>
                <div className='w-[900px] h-fit p-2 border border-gray-400 rounded-xl relative m-2'>
                    <div className='text-center font-bold'>{blog.title}</div>
                    <div className='text-center'>{blog.description}</div>
                </div>
            </div>
        </>
    )
}

export default MyBlogs