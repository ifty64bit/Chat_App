import React from 'react'
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react"

function Header() {
    const { data: session, status } = useSession();
    console.log(session);
    return (
        <div className='bg-black w-full py-6 px-2 flex justify-between'>
            <div><h1>Chat App</h1></div>
            <div className='flex gap-2'>
                {session ?
                    (<><Image src={session.user.image} alt="user" width='50px' height='50px' className='rounded-full' />
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
