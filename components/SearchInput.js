import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import Image from 'next/image';
import axios from 'axios';

function SearchInput(props) {
    const { data: session, status } = useSession();
    const [input, setInput] = useState("");
    const [userList, setUserList] = useState([]);
    console.log(session.user);
    const onInput = (e) => {
        setInput(e.target.value); 
    }

    const getRoomId = async (user) => {    //get buddy's email as parm
        console.log(user);
        try {
            let room = await axios.post(`/api/getroomid`, {
                'user1' : user,
                'user2' : session.user
            });
            console.log(room);
        } catch (error) {
            console.log(error);
        }
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
                console.log(users);
                setUserList(users.data)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [input]);
    
    return (
        <div className='relative'>
            <input className='w-full border-2 border-black rounded-md p-2 text-black'
                type="text"
                placeholder={props.placeholder}
                onChange={onInput}
                onBlur={clear}
                value={input} />
            
            <ul className='absolute bg-gray-500 w-full px-2'>
                {
                    userList.map((user) => {
                        if(user.name===session.user.name) return
                        return (
                            <li key={user.id} className='py-2 cursor-pointer' onClick={ ()=> getRoomId(user) }>
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
