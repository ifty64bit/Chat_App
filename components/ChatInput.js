import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { IconContext } from "react-icons";

function ChatInput({ sendMsg }) {
    const [input, setInput] = useState("");

    const send = (e) => {
        e.preventDefault();
        sendMsg(input);
        setInput("");
    }

    return (
        <div className='px-6 grow fixed bottom-4 w-[80%] lg:w-[75%] 2xl:w-[70%]'>
            <form className='flex gap-x-4 text-black' action="" onSubmit={send}>
                <input className='w-full rounded-lg px-2 drop-shadow-md' type="text" onChange={(e) => setInput(e.target.value)} value={ input } />
                <IconContext.Provider value={{ color: "black", size: '2rem' }}>
                    <div className=' bg-green-400 p-3 rounded-full flex justify-center items-center shadow-md cursor-pointer' onClick={ send }>
                        <FiSend />
                    </div>
                </IconContext.Provider>
            </form>
        </div>
    )
}

export default ChatInput
