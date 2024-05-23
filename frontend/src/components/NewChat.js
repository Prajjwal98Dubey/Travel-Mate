/*import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io.connect('http://localhost:5001/')
const NewChat = ({ chatUniqueId, receiver }) => {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        const receiveChat = () => {
            socket.on(`chat-${chatUniqueId}-list`, (payload) => {
                setChat([...chat, payload])
                setIsLoading(false)
            })
        }
        receiveChat()
    },[chatUniqueId])
    const sendMessage = () => {
        socket.emit('send-emails', { sEmail: JSON.parse(localStorage.getItem('userInfo')).email, rEmail: receiver })
        socket.emit(`chat-${chatUniqueId}`, { message: message, user: JSON.parse(localStorage.getItem("userInfo")).email })
        setMessage("")
    }

    return (
        <div>
            <div className='h-[250px] overflow-y-scroll mb-[20px]'>
                {
                    <div className=''>
                        {!isLoading && chat.map((c, i) =>
                            (c.user === JSON.parse(localStorage.getItem("userInfo")).email ? <div key={i} className='w-full flex justify-end'><div className='w-fit h-fit border border-white text-sm p-1 rounded-md mr-[4px] mt-[6px] mb-[6px] bg-green-400 text-black rounded-tr-xl'>{c.message}</div></div> : <div key={i} className=' flex justify-start w-fit h-fit border border-white text-sm p-1 rounded-md ml-[4px] mt-[6px] mb-[6px] bg-slate-300 text-black rounded-tl-xl'>{c.message}</div>)
                        )}
                    </div>
                }
            </div>
            <div className='h-[100px]'>
                <div className=' flex justify-center'>
                    <input type="text" className='w-[350px] h-[35px] border border-white text-black mr-[2px]' value={message} onChange={(e) => setMessage(e.target.value)} />
                    <span><button type='submit' className='w-[70px] bg-green-600 h-[35px] font-light' onClick={sendMessage}>send</button></span>
                </div>
            </div>

        </div>

    )
}

export default NewChat

*/
import axios from 'axios'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const socket = io.connect('http://localhost:5001/')
const ADD_MESSAGE_TO_DB = "http://localhost:5000/api/v1/m/add-message"
const NewChat = ({ chatUniqueId, receiver ,dbChats}) => {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])
    const[oldChats,setOldChats] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    const[isInputDisabled,setIsInputDisabled] = useState(true)
    useEffect(() => {
        const recieveChats = () => {
            setOldChats(dbChats)
            socket.on(`chat-${chatUniqueId}`, (payload) => {
                setChat([...chat, payload])
            })
            setIsLoading(false)
            setIsInputDisabled(false)
        }
        recieveChats()
    })
    useEffect(() => {
        const sendEmailThroughSocket = () => {
            socket.emit('send-emails', { sEmail: JSON.parse(localStorage.getItem("userInfo")).email, rEmail: receiver })
        }
        sendEmailThroughSocket()
    }, [])
    const sendMessage = () => {
        socket.emit(`chat-${chatUniqueId}`, { message, user: JSON.parse(localStorage.getItem("userInfo")).email })
        setMessage("")
    }

    const addMessageToDb=async()=>{
        await axios.post(ADD_MESSAGE_TO_DB,{
            sEmail:JSON.parse(localStorage.getItem("userInfo")).email,
            rEmail:receiver,
            message:message,
            chatUniqueId:chatUniqueId
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return (
        <>
        {console.log("DB chatzzss",oldChats)}
        <div className='h-[250px] overflow-y-scroll mb-[20px]'>
            {
                !isLoading && oldChats && 
                <div className=''>
                    {oldChats.map((c, i) =>
                        (c.senderId === JSON.parse(localStorage.getItem("senderUserId")) ? <div key={i} className='w-full flex justify-end'><div className='w-fit h-fit border border-white text-sm p-1 rounded-md mr-[4px] mt-[6px] mb-[6px] bg-green-400 text-black rounded-tr-xl'>{c.message}</div></div> : <div key={i} className=' flex justify-start w-fit h-fit border border-white text-sm p-1 rounded-md ml-[4px] mt-[6px] mb-[6px] bg-slate-300 text-black rounded-tl-xl'>{c.message}</div>)
                    )}
                </div>
            }
            {
                <div className=''>
                    {chat.map((c, i) =>
                        (c.user === JSON.parse(localStorage.getItem("userInfo")).email ? <div key={i} className='w-full flex justify-end'><div className='w-fit h-fit border border-white text-sm p-1 rounded-md mr-[4px] mt-[6px] mb-[6px] bg-green-400 text-black rounded-tr-xl'>{c.message}</div></div> : <div key={i} className=' flex justify-start w-fit h-fit border border-white text-sm p-1 rounded-md ml-[4px] mt-[6px] mb-[6px] bg-slate-300 text-black rounded-tl-xl'>{c.message}</div>)
                    )}
                </div>
            }
        </div>
            <div className='h-[100px]'>
                <div className=' flex justify-center'>
                    <input type="text" className={ isInputDisabled ? 'w-[350px] h-[35px] border border-white text-black mr-[2px] cursor-not-allowed' : 'w-[350px] h-[35px] border border-white text-black mr-[2px]' } value={message} onChange={(e) => setMessage(e.target.value)} />
                    <span><button type='submit' className='w-[70px] bg-green-600 h-[35px] font-light' onClick={()=>{
                        sendMessage()
                        addMessageToDb()
                    }}>send</button></span>
                </div>
            </div>
        </>
    )
}


export default NewChat