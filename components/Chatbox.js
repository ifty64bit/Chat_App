import { useState } from 'react';
import ChatInput from './ChatInput';

function Chatbox() {
    const [chats, setChats] = useState(["Hello", "Hi", "GGGGG GGGGGGGGGGGGGGGGGG GGGGGGGGGGG GGGGGGGGGGG GGGGGGG", "hello", "hunter", "bravo"]);
    
    const sendMsg = (text) => {
        setChats([...chats, text])
    }

    return (
        <div className=' bg-slate-400 col-span-9 relative chatbox-bg px-4 py-2 overflow-scroll'>
            <div className='space-y-2'>
                {
                    chats.map((chat, index) => {
                        return (
                            <div key={index} className='max-w-[75%]'>
                                <div className='bg-green-600 w-fit px-2 py-1 rounded-md drop-shadow-md'>{chat}</div>
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
