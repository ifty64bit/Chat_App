import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { IconContext } from "react-icons";

function ChatInput({ sendMsg }) {
    const [input, setInput] = useState("");

    const send = () => {
        sendMsg(input);
        setInput("");
    }

    return (
        <div className='px-6 flex gap-x-4 text-black absolute bottom-4 inset-x-4'>
            <input className='w-full rounded-lg px-2 drop-shadow-md' type="text" onChange={(e) => setInput(e.target.value)} value={ input } />
            <IconContext.Provider value={{ color: "black", size: '2rem' }}>
                <div className=' bg-green-400 p-3 rounded-full flex justify-center items-center shadow-md cursor-pointer' onClick={ send }>
                    <FiSend />
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default ChatInput
