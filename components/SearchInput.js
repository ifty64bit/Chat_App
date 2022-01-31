import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import Image from 'next/image';
import axios from 'axios';

function SearchInput(props) {
    const { data: session, status } = useSession();
    const [input, setInput] = useState("");
    const [userList, setUserList] = useState([]);
    const onInput = (e) => {
        setInput(e.target.value); 
    }

    //Clear input with delay
    const clear = () => {
        const tOut = setTimeout(() => setInput(""), 500);
    }

    useEffect(() => {
        if (input == "") {
            setUserList([]);
            return
        }
        const getData = async () => {
            try {
                let users = await axios.get(`/api/search/${input}`);
                setUserList(users.data)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [input]);
    
    return (
        <div className='relative hidden md:block'>
            <input className='w-full border-2 border-black rounded-md p-2 text-black'
                type="text"
                placeholder={props.placeholder}
                onChange={onInput}
                onBlur={clear}
                value={input} />
            
            <ul className='absolute bg-gray-500 w-full px-2 z-50'>
                {
                    userList.map((user) => {
                        if(user.name===session.user.name) return
                        return (
                            <li key={user._id} className='py-2 cursor-pointer' onClick={ ()=> props.getRoomId(user) }>
                                <div className='flex justify-start gap-x-4 items-center' >
                                    <Image className='rounded-full' src={user.image} alt='user' width='30px' height='30px' />
                                    {user.name}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        )
}

export default SearchInput
