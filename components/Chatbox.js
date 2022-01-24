import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import ChatInput from './ChatInput';

function Chatbox({ currentRoom }) {
    const { data: session, status } = useSession();
    const [chats, setChats] = useState([]);
    
    const sendMsg = async (text) => {
        const message = {
            'id': session.user._id,
            'text': text,
            'img': null,
            'roomID': currentRoom._id
        }
        const res = await axios.post(`/api/messages`, message)
        setChats([...chats, { ...message, sender:{'email': session.user.email}, _id: res.data._id }])    //destracuring message obj and push sender , id proparty
    }

    useEffect(() => {
        const fetchMessage = async () => {
            if (currentRoom._id == undefined) return;
            const response = await axios.get(`/api/messages/${currentRoom._id}`)
            const messages = response.data;
            setChats([...messages]);
        }
        fetchMessage();

    },[currentRoom])

    return (
        <div className=' bg-slate-400 col-span-9 relative chatbox-bg px-4 py-2 overflow-scroll'>
            <div className='flex flex-col gap-y-4'>
                {
                    chats.length == 0 ?
                        <div className='w-full flex justify-center' >No Messages</div>
                        :
                        chats.map((chat) => {
                            return (
                                <div key={chat._id} className={chat.sender.email==session.user.email?'max-w-[75%] self-end' : 'max-w-[75%]'}>
                                    <div className={chat.sender.email==session.user.email? "bg-green-400 text-black w-fit px-2 py-1 rounded-md drop-shadow-md" : "bg-green-600 w-fit px-2 py-1 rounded-md drop-shadow-md"}>{chat.text}</div>
                                </div>
                            )
                        })
                }
            </div>
            <ChatInput sendMsg={ sendMsg }/>
        </div>
    )
}

export default Chatbox
