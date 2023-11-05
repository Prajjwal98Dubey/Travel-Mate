import React from 'react'

const ProfileShimmer = () => {
  return (
   <>
   <div className='w-full h-[600px] flex justify-center m-2 '>
    <div className=''>
        <div className=' m-2 ml-[55px] flex justify-center rounded-full bg-gray-400 animate-pulse w-[200px] h-[200px]'></div>
        <div className=' m-2  flex justify-center w-[300px] h-[20px] rounded-lg bg-gray-400 animate-pulse'></div>
        <div className=' m-2  flex justify-center w-[300px] h-[20px] rounded-lg  bg-gray-400 animate-pulse'></div>
        <div className='m-2  flex justify-center w-[300px] h-[20px] rounded-lg  bg-gray-400 animate-pulse'></div>
        </div>
   </div>
   </>
  )
}

export default ProfileShimmer