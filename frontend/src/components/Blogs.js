import React, { useEffect, useState } from 'react'
import { IMG_USER, city } from './dummy'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';

const GET_USER_API = "http://localhost:5000/api/v1/getUser";
const Blogs = () => {
    const [searchParams] = useSearchParams()
    const [personData, setPersonData] = useState([])
    const[isLoading,setIsLoading]=useState(true)
    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const getData = async () => {
            const { data } = await axios.post(GET_USER_API, {
                email:searchParams.get('v')
            }, config)
            setPersonData(data)
            setIsLoading(false)
        }
        getData()
    }, [])
    const getImages=(city_name)=>{
        const cityImage = city.filter((c)=>c.name.toLowerCase()===city_name.toLowerCase())
        return cityImage[0].images[0]
    }
    return (
        <>
            <div className='flex '>
                {isLoading? <div>Loading</div>:<div className='w-1/3 h-[595px] bg-red-500 text-white p-5'>
                    <div>
                        <div className='flex justify-center m-1'><img src={IMG_USER} alt="loading" className='w-[130px] h-[130px] rounded-full ' /></div>
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
                          <img className="w-[385px] h-[150px] p-1 rounded-lg hover:scale-105" src={getImages(personData[0].topCities[2])} alt="loading"/>
                          <div className='absolute top-[115px] left-[170px] font-extrabold '>{personData[0].topCities[2].toUpperCase()}</div>
                          </div>
                        
                    </div>
                </div>}
                <div className='w-1/2 h-[590px] flex justify-center items-center'>Blogs</div>
            </div>
        </>
    )
}

export default Blogs