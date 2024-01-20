import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMG_USER } from './dummy'
const USERS_DATA = 'http://localhost:5000/api/v1/db'
const SearchByName = () => {
    const [searchText, setSearchText] = useState("")
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filteredData, setFilterData] = useState([])
    useEffect(() => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const getData = async () => {
            const { data } = await axios.get(USERS_DATA, config)
            setUserData(data)
            setIsLoading(false)
        }
        getData()
    }, [])

    useEffect(() => {
        if (!isLoading && userData && searchText) {
            const getFilteredData = () => {
                const filtered = userData.filter((d) => d.name.toLowerCase().includes(searchText.toLowerCase()))
                setFilterData(filtered)
            }
            getFilteredData()
        }
       

    }, [searchText])

    return (
        <>
            <div className='flex justify-center mb-[50px] h-[500px] pt-[50px]'>
                <div>
                    <input type="text" placeholder='Find someone...' className='w-[500px] h-[50px] pl-2 text-md  border border-red-800 ' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    {(filteredData && searchText) ? <div>
                        <ul className=' bg-white w-[500px] h-[300px] border border-black rounded-lg mt-[3px] text-start pl-2 cursor-pointer overflow-y-scroll'>
                            {
                                filteredData.map((data) => (
                                    <Link key={data.email} to={`/blogs?v=${data.email}`}><li className='h-[60px] hover:bg-gray-400 m-1 flex justify-center'>
                                        <div className='flex m-1'>
                                        <span className='m-1 flex items-center '>
                                            <img className='w-[40px] h-[40px] rounded-full' src={data.photo.url ? data.photo.url : IMG_USER} alt="loading" />
                                            </span>
                                        <span className='m-1 flex items-center'>{data.name}</span>
                                        </div>
                                        </li>
                                        </Link>
                                ))
                            }
                        </ul>
                    </div> :null}
                </div>
            </div>
        </>
    )
}

export default SearchByName