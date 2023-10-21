import React, { useState } from 'react'

const CityImages = ({selectedCity}) => {
    const[img,setImg]=useState("")
    const[counter,setCounter]=useState(0)
    const increment=()=>{
        setCounter(counter+1)
    }
    const decrement=()=>{
        setCounter(counter-1)
    }
    
  return (
    <>
    {selectedCity==="" ?<div>No City Exists.</div> :selectedCity[0].images.length===0 ? <div className='flex justify-center items-center w-[500px] h-[300px] border border-gray-400'><div className='text-2xl font-bold'>"No Images to show!!!"</div></div> : <div className='flex relative'>
        <button className={`absolute top-[125px] p-2 text-white ${counter===0 ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={counter===0} ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left" onClick={()=>decrement()}><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg></button>
    <img className='w-[500px] h-[300px]' src={selectedCity[0].images[counter]} alt="loading" />    
    <button className={`absolute top-[125px] right-0 p-2 text-white ${counter === 2 ?"cursor-not-allowed" : "cursor-pointer"}`} disabled={counter===2} ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right" onClick={()=>increment()}><path d="M18 8L22 12L18 16"/><path d="M2 12H22" /></svg></button>
    </div>}
    </>
  )
}

export default CityImages
