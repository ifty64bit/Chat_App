import { useSession, getSession } from "next-auth/react"
import { useEffect, useState} from "react";
import Link from 'next/link';
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";
import dbConnect from '../lib/dbConnect';
import Rooms from "../models/rooms";
import { io } from "socket.io-client";

const socket=io(process.env.socketURL, { query: "roomID=room1", 'reconnectionAttempts': 5 });


export default function Home({rooms}) {
  const { data: session, status } = useSession();
  const [currentRoom, setCurrentRoom] = useState({});


  useEffect(() => {
    if (JSON.parse(rooms).length == 0)
    {
      setCurrentRoom(null);
    }
    else {
      setCurrentRoom(JSON.parse(rooms)[0]);
      socket.emit('join-room', JSON.parse(rooms)[0]._id);
    }
    
  }, [rooms]);
  
  const changeCurrentRoom = (_room) => {
    setCurrentRoom(_room);
    socket.emit('join-room', _room._id)
  }

  return (
    <div>
      {session ? (
        <div className="flex h-[calc(100vh-11.3vh)] overflow-hidden text-lg">
          <Sidebar rooms={ JSON.parse(rooms) } changeCurrentRoom={ changeCurrentRoom }/>
          <Chatbox currentRoom={currentRoom} socket={ socket }/>
        </div>
        )
        :
        (
          <>
            Not signed in <br /> <Link href="/login">Login Page</Link>
          </>
        )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/login', permanent: false, } }
  await dbConnect()
  const id = await session.user._id;
  const rooms = await Rooms.find({ 'participants': id }).populate('participants');
  return {
    props:
    {
      session, 'rooms':JSON.stringify(rooms)
    },
  }
}
