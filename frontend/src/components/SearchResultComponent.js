import React from 'react'
import { IMG_USER } from './dummy'
import { Link } from 'react-router-dom'

const SearchResultComponent = ({search}) => {
  return (
    <Link to={"/blogs?v="+search.email}><div className='bg-gray-400 m-2 rounded-lg shadow-md hover:cursor-pointer hover:bg-gray-500'>
            <div className='flex p-2 relative'>
                <div className='p-1'>
                    <img src={IMG_USER} alt="dp" className='w-[50px] h-[50px] rounded-full' />
                </div>
                <div className='p-1'>
                    <div className='font-semibold'>{search.name.toUpperCase()}</div>
                    <div>{search.email}</div>
                    <div>{search.topCities.map((e,i)=><span key={i} className='p-[2px] font-semibold'>{e.toUpperCase()}</span>)}</div>
                </div>
                <div className='absolute right-3 flex justify-center rounded-lg w-[50px] h-[25px] hover:bg-yellow-400'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
            </div>
    </div>
    </Link>
  )
}

export default SearchResultComponent