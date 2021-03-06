import React from 'react'
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react"

function Header() {
    const { data: session, status } = useSession();
    return (
        <div className='bg-black w-full py-6 px-2 flex justify-between items-center' id='header'>
            <div><h1 className='md:text-5xl text-4xl'>Chat App</h1></div>
            <div className='flex justify-center items-center gap-2'>
                {session ?
                    (<><div className='flex'><Image src={session.user.image} alt="user" width='50px' height='50px' className='rounded-full' /></div>
                    <div>
                        <p>{session.user.name}</p>
                        <button className='px-2 py-1 bg-red-600' onClick={signOut}>Logout</button>
                    </div></>)
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default Header
