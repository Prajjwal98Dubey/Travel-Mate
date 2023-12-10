import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {city} from './dummy.js'
const FREQ_CITY_API="http://localhost:5000/api/v1/freq-city"
const FrequentCities = () => {
    const [cities,setCities]=useState([])
    const[isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const getFreqCities=async()=>{
            const {data} = await axios.get(FREQ_CITY_API,config)
            setCities(data.freqCities)
            setIsLoading(false)
        }
        getFreqCities()
    },[])
    const getCityImage = (givenCity)=>{
        const filteredCity = city.filter((c)=>c.name.toLowerCase()=== givenCity.toLowerCase())
        return filteredCity[0].images[2]
    }
  return (
    <>
    <div className='font-semibold font-Afacad h-fit'>
    <div className='p-2 text-center text-4xl '>
        Top Cities People like to go...
    </div>
    {console.log(cities)}
    {isLoading ?<div className='text-center'>Loading...</div> :
    <div className='w-full h-[400px] flex justify-center'>
        {cities.map((c)=>
        <div key={c._id}>
            <img className='w-[400px] h-[250px] p-2 rounded-xl shadow-gray-50 shadow-xl' src={getCityImage(c.cityName)} alt="loading" />
            <div className='text-center font-semibold'> {c.cityName.toUpperCase()}</div>
        </div>)}
    </div>}
    </div>
    </>
  )
}

export default FrequentCities