import { useState,useEffect } from 'react'
import { useSession } from "next-auth/react"
import axios from 'axios';
import SearchInput from './SearchInput'

function Sidebar() {
    const { data: session, status } = useSession();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get(`/api/getrooms/${session.user.email}`)
            .then((res) => {
                console.log(res);
                setRooms([...res.data]);
            })
            .catch((err) => console.log(err));
    },[session.user.email])

    return (
        <div className='bg-slate-700 col-span-3 px-2'>
            <SearchInput placeholder="Search" />
            {
                rooms.map((room) => {
                    return (
                        <div key={room.id} className=' text-lg px-2 py-2 bg-slate-400 rounded-md'>
                            {session.user.email===room.participants[0]?room.participants[1]:room.participants[0]}
                        </div>
                    )
                })
            }
            <div>user1</div>
            <div>user2</div>
        </div>
    )
}

export default Sidebar
