import React, { useEffect, useState } from 'react'
import {  city } from './dummy'
import SearchResultComponent from './SearchResultComponent'
import CityImages from './CityImages'
import axios from 'axios'

const DATA_API='http://localhost:5000/api/v1/db'

const SearchComponent = () => {
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [cityNames, setCityNames] = useState([])
    const [updation, setUpdation] = useState(false)
    const [toggleDisplay, setToggleDisplay] = useState(true)
    const [displayImages, setDisplayImages] = useState(false)
    const [selectedCityImage, setSelectedCityImage] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getResults = async() => {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.get(DATA_API,config)
        // console.log(data)
        const results = await data.filter((d) => d.topCities.includes(`${searchText.toLowerCase()}`))
        console.log(results)
        setSearchResults(results)
    }
    const getImages = (text) => {
        const selectedCity = city.filter((c) => c.name.toLowerCase() === text.toLowerCase())
        selectedCity.length===0 ? setSelectedCityImage("") :setSelectedCityImage(selectedCity)
        setIsLoading(false)
    }
    // useEffect(() => {
    //     setSearchResults([])
    // }, [searchText])
    useEffect(() => {
        const getCity = () => {
            const data = city.filter((c) => c.state.toLowerCase().includes(`${searchText.toLowerCase()}`) || c.name.toLowerCase().includes(`${searchText.toLowerCase()}`))
            setCityNames(data)
        }
        setSearchResults([])
        setDisplayImages(false)
        getCity()
    }, [searchText])
    useEffect(() => {
        getResults()
        setUpdation(false)
    }, [updation])


    return (
        <>

            <div className="w-full flex justify-center items-center">
                <div className=''>
                    <input className='pl-2 w-[500px] h-[50px] border border-red-600' value={searchText} placeholder='Enter City or State' onChange={(e) => setSearchText(e.target.value)} type="text" />
                    <button className='h-[50px] w-[100px] bg-red-500 hover:bg-red-600 font-bold' onClick={() => {
                        getResults()
                        setDisplayImages(true)
                        getImages(searchText)
                    }
                    }>Search</button>
                    {
                        searchText && <div className={`${toggleDisplay ? " mt-1 rounded-sm w-[500px] h-fit border border-red-400" : "hidden"}`}>
                            <ul>
                                {cityNames.map((c) => <li className="font-semibold p-2 hover:bg-gray-300 hover:cursor-pointer " key={c.name}
                                    onClick={() => {
                                        setSearchText(c.name.toLowerCase())
                                        setUpdation(true)
                                        setToggleDisplay(false)
                                        setDisplayImages(true) 
                                    }
                                    }>{c.name},{c.state}</li>)}
                            </ul>
                        </div>
                    }

                </div>
            </div>
            {isLoading ? "" : <div className='mt-4'>

                {displayImages ? <div className='w-full h-fit flex justify-center'>
                    <div className='flex justify-around'>

                        {displayImages ? <CityImages selectedCity={selectedCityImage} /> : <div>No Images to show</div>}
                        <div className='w-[500px] h-[300px] overflow-y-scroll'>{searchResults.map((search) => <div key={search.email}><SearchResultComponent search={search} /></div>)}</div>

                    </div>

                </div> : null}


            </div>}

        </>
    )
}

export default SearchComponent
