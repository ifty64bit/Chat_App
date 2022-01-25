import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';

function Chatbox({ currentRoom, socket }) {
    const { data: session, status } = useSession();
    const [chats, setChats] = useState([]);
    const lastMsg= useRef(null)
    
    
    const sendMsg = async (text) => {
        const message = {
            'id': session.user._id,
            'text': text,
            'img': null,
            'roomID': currentRoom._id
        }
        const res = await axios.post(`/api/messages`, message)
        socket.emit('message', {
            ...message, sender: { 'email': session.user.email }, _id: res.data._id
        });
        setChats([...chats, { ...message, sender:{'email': session.user.email}, _id: res.data._id }])    //destracuring message obj and push sender , id proparty
    }

    useEffect(() => {
        lastMsg.current == null ? "" : lastMsg.current.scrollIntoView({ behavior: "smooth" });
    },[chats])

    useEffect(() => {
        const fetchMessage = async () => {
            if (currentRoom._id == undefined) return;
            const response = await axios.get(`/api/messages/${currentRoom._id}`)
            const messages = response.data;
            setChats([...messages]);
        }
        fetchMessage();
        //reg socket for event
        socket.on('message', (_message) => {
            setChats(prev => [...prev, _message]);
        });
        
        return function cleanup() {
            socket.off('message');
        };

    },[currentRoom,socket])

    return (
        <>
        <div className=' flex flex-col bg-slate-400 chatbox-bg pl-4 py-2  grow h-full'>
            <div className='flex flex-col mt-auto gap-y-4 overflow-y-scroll scroll-smooth h-full pb-2 pr-4 mb-[4.5rem]'>
                {
                    chats.length == 0 ?
                        <div className='w-full flex justify-center' >No Messages</div>
                        :
                        chats.map((chat) => {
                            return (
                                <div key={chat._id} ref={chat._id==chats[chats.length-1]._id? lastMsg : null} className={chat.sender.email==session.user.email?'max-w-[75%] self-end' : 'max-w-[75%]'}>
                                    <div className={chat.sender.email==session.user.email? "bg-green-400 text-black w-fit px-2 py-1 rounded-md drop-shadow-md break-all" : " break-all bg-green-600 w-fit px-2 py-1 rounded-md drop-shadow-md"}>{chat.text}</div>
                                </div>
                            )
                        })
                }
            </div>
            <ChatInput sendMsg={ sendMsg }/>
        </div>
            
        </>
    )
}

export default Chatbox
