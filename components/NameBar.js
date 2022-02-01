import React from 'react';

function NameBar({ currentRoom }) {
    
    const element = () => {
        
        if (currentRoom == null) {
            console.log(currentRoom);
            console.log(currentRoom == null);
            return <></>;
        }
        else {
            console.log(currentRoom);
            console.log(currentRoom == null);
            return (
                <div className='py-2 px-4 flex items-center bg-slate-800'>
                    {
                        currentRoom.participants[0].email === session.user.email ?
                        <>
                            <Image className=' rounded-full' src={currentRoom.participants[1].image} width="50" height="50" alt="user" />
                            <div className='ml-4'>{ currentRoom.participants[1].name }</div>
                        </>
                            :
                        <>
                            <Image className=' rounded-full' src={currentRoom.participants[0].image} width="50" height="50" alt="user" />
                            <div className='ml-4'>{ currentRoom.participants[0].name }</div>
                        </>
                    }
                </div>
            )
        }
    }

    return element();
    
}

export default NameBar;
