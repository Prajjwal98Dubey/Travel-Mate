import React from 'react'

const SearchResultComponent = ({search}) => {
  return (
    <div className='bg-gray-400 m-2 rounded-lg shadow-md hover:cursor-pointer hover:bg-gray-500'>
            <div className='flex p-2'>
                <div className='p-1'>
                    <img src={search.photo} alt="dp" className='w-[50px] h-[50px] rounded-full' />
                </div>
                <div className='p-1'>
                    <div className='font-semibold'>{search.name.toUpperCase()}</div>
                    <div>{search.email}</div>
                    <div>{search.topPlaces.map((e,i)=><span key={i} className='p-[2px] font-semibold'>{e.toUpperCase()}</span>)}</div>
                </div>
            </div>
    </div>
  )
}

export default SearchResultComponent