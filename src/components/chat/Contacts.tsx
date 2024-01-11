import { TUserWithChat } from '@/types';
import React from 'react'
import User from './User';

interface ContactsProps {
    users: TUserWithChat[];
    currentUser: TUserWithChat;
    setLayout: (layout:boolean) => void;
    setRecevier: (receiver: {
        receiverId:string;
        receiverName: string;
        receiverImage: string;
    }) => void;
}

const Contacts = ({users, currentUser, setLayout, setRecevier}:ContactsProps) => {
  
  const filterMessages = (userId:string, userName:string | null, userImage: string | null) => {
    setRecevier({
        receiverId: userId,
        receiverName: userName || "",
        receiverImage: userImage || "",
    })
  }
  
    return (
    <div className='w-full overflow-auto h-[calc(100vh_-_56px)] border-[1px]'>
        <h1 className='m-4 text-xl font-semibold text-gray-800'>채팅</h1>
        <hr/>
        <div className='flex flex-col'>
            {users.length > 0 &&
                users.filter((user) => user.id !== currentUser.id)
                    .map((user) => {
                        return (
                            <div key={user.id} 
                                onClick={() => {setLayout(true)
                                    filterMessages(user.id, user.name, user.image)
                                }}>
                                <User
                                    user={user}
                                    currentUserId={currentUser?.id}
                                />
                            </div>
                        )
                    })
            }
        </div>
    </div>
  )
}

export default Contacts