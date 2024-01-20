import React, { useEffect, useState } from 'react'
import { getDatabase, ref, push, set, onChildAdded, onValue } from "firebase/database";
import { app } from '../firebase';
import axios from 'axios';
const db = getDatabase(app)
const CREATE_CHAT_API = 'http://localhost:5000/api/v1/create-id'
const Chat = ({ person }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")).email)
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState("")
    const [id, setId] = useState("")
    useEffect(() => {
        const getChats = async()=>{
            const {data} = await axios.post(CREATE_CHAT_API,{
                user1:JSON.parse(localStorage.getItem("userInfo")).email,
                user2:person
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(data)
            console.log(data.people)
            setId(data.people)
            const starCountRef = ref(db, `chats/${data.people}`);
            onValue(starCountRef, (snapshot) => {
                let data = snapshot.val()
                if (data) {
                    const childrenValues = Object.values(data)
                    // console.log(childrenValues)
                    setChats([...childrenValues, ...chats])
                }
        });
        onChildAdded( ref(db, `chats/${data.people}`), (data) => {
            setChats(chats => [...chats, data.val()])
        });
        }

        getChats()
    }, [])


    const sendMessage = () => {
        if (message === "") return
        const newChatRef = push(ref(db, `chats/${id}`));
        set(newChatRef, {
            email: user, reciever: person, message: message,
        });
        setMessage("")
    }
    return (
        <>
            {/* {chats} */}
            {console.log(person)}
            <div>
                <div className='h-[250px] overflow-y-scroll mb-[20px]'>
                {
                    <div className=''>
                   { chats.map((c, i) =>
                        (c.email === user ? <div key={i} className='w-full flex justify-end'><div className='w-fit h-fit border border-white text-sm p-1 rounded-md mr-[4px] mt-[6px] mb-[6px] bg-green-400 text-black rounded-tr-xl'>{c.message}</div></div> : <div key={i} className=' flex justify-start w-fit h-fit border border-white text-sm p-1 rounded-md ml-[4px] mt-[6px] mb-[6px] bg-slate-300 text-black rounded-tl-xl'>{c.message}</div>)
                    )}
                    </div>
                    }
                    </div>
                    <div className='h-[100px]'>
                <div className=' flex justify-center'>
                    <input type="text" className='w-[350px] h-[35px] border border-white text-black mr-[2px]' value={message} onChange={(e) => setMessage(e.target.value)} />
                    <span><button type='submit' className='w-[70px] bg-green-600 h-[35px] font-light' onClick={() =>sendMessage()}>send</button></span>
                    </div>
                    </div>
           
            </div>

        </>
    )
}

export default Chat