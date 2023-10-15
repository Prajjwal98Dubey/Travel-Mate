import React from 'react'
import Navbar from './Navbar'
import SearchComponent from './SearchComponent'

const Home = () => {
  return (
        <>
        <Navbar/>
        <div className='mt-6'>
        <SearchComponent/>
        </div>
        </>
  )
}

export default Home