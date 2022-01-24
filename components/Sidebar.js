import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSession, getSession } from "next-auth/react"
import SearchInput from './SearchInput'
import axios from 'axios';

function Sidebar(props) {
    const { data: session, status } = useSession();
    const [rooms, setRooms] = useState([...props.rooms]);

    const getRoomId = async (user) => {    //get buddy's email as parm
        try {
            console.log(user);
            const hasRoom = rooms.find(_r => {
                if ((_r.participants[0]._id == user._id) || (_r.participants[1]._id == user._id)) return _r;
            })
            if (hasRoom == undefined)
            {
                let room = await axios.post(`/api/getroomid`, {
                    'user1' : user,
                    'user2' : session.user
                });
                props.changeCurrentRoom(room.data);
                setRooms([room.data, ...rooms]);
            }
            else {
                const temp = rooms.splice(rooms.indexOf(hasRoom),1);
                props.changeCurrentRoom(temp[0]);
                setRooms([temp[0],...rooms]);
            } 
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='bg-slate-700 col-span-3 px-2'>
            <SearchInput placeholder="Search" getRoomId={ getRoomId } />
            {
                rooms.length == 0 ? "" :
                rooms.map((room) => {
                    return (
                        <div key={room._id} onClick={ ()=> props.changeCurrentRoom(room)}  className='text-lg px-2 py-2 bg-slate-400 rounded-md flex gap-3 items-center cursor-pointer transition-colors hover:bg-slate-800'>
                            {
                                session.user.email === room.participants[0].email ?
                                    (
                                        <>
                                            <Image className=' rounded-full' src={room.participants[1].image} width="50" height="50" alt="user" />
                                            <div>{room.participants[1].name}</div>
                                        </>
                                    )
                                :
                                (
                                    <>
                                        <Image className=' rounded-full' src={room.participants[0].image} width="50" height="50" alt="user" />
                                        <div>{room.participants[0].name}</div>
                                    </>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar
