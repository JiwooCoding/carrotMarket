'use client'
import Chat from '@/components/chat/Chat';
import Contacts from '@/components/chat/Contacts';
import { TUserWithChat } from '@/types';
import { User } from '@prisma/client'
import axios from 'axios';
import React, { useState } from 'react'
import useSWR from 'swr';

interface ChatClientProps {
    currentUser?: User | null;
}

const ChatClient = ({currentUser}:ChatClientProps) => {

    //대화하는 상대방의 정보
    const [receiver, setRecevier] = useState({
        receiverId: "",
        receiverName: "",
        receiverImage: ""
    });

    //반응형 layout
    const [layout, setLayout] = useState(false);

    //여기서 url은 '/api/chat'
    //res는 서버에서 받은 응답객체이며, 여기서는 응답객체의 data속성을 반환한다.
    const fetcher = (url: string) => axios.get(url).then((res) => res.data)
    const {data:users, error, isLoading} = useSWR('/api/chat', fetcher, {
        refreshInterval:1000 //1초마다 요청 보내서 데이터 받아오는 옵션
    })
    
    console.log(users);

    const currentUserWithMessage = users?.find((user:TUserWithChat) => user.email === currentUser?.email);
    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;


  return (
    <main>
        <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]'>
            <section className={`md:flex ${layout && 'hidden'}`}>
                <Contacts
                    users={users}
                    currentUser={currentUserWithMessage}
                    setLayout={setLayout}
                    setRecevier={setRecevier}
                />
            </section>
            <section className={`md:flex ${!layout && 'hidden'}`}>
                <Chat
                    currentUser={currentUserWithMessage}
                    receiver={receiver}
                    setLayout={setLayout}
                    
                />
            </section>
        </div>
    </main>
  )
}

export default ChatClient