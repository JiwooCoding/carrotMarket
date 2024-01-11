import { TUserWithChat } from '@/types'
import React, { useEffect, useRef } from 'react'
import Input from './Input';
import ChatHead from './ChatHead';
import Message from './Message';

interface ChatProps {
    currentUser: TUserWithChat;
    receiver:{
        receiverId:string;
        receiverName: string;
        receiverImage: string;
    }, 
    setLayout: (layout:boolean) => void;
}

const Chat = ({currentUser, receiver, setLayout}:ChatProps) => {

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        //current는 현재 참조(<div>요소)하고 있는 DOM 요소를 나타냅니다.
        messagesEndRef?.current?.scrollIntoView({
            behavior:'smooth'
        });
    }

    useEffect(() => {
      scrollToBottom();
    })
    

    const conversation = currentUser?.conversations.find((conversation) => 
        conversation.users.find((user) => user.id === receiver.receiverId))

    if(!receiver.receiverName || !currentUser){
        return <div className='w-full h-full'></div>
    }


  return (
    <div className='w-full'>
        <div>
            {/* chat Header */}
            <ChatHead
                setLayout={setLayout}
                receiverName={receiver.receiverName}
                receiverImage={receiver.receiverImage}
                lastMessageTime={
                    conversation?.message
                        .filter((message) => message.receiverId === currentUser.id)
                        .slice(-1)[0]?.createdAt
                }
            />
        </div>
        <div className='flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px_-_70px_-_80px)]'>
            {conversation && 
                conversation.message
                    .map((message) => {
                        return (
                            <Message
                                key={message.id}
                                isSender={message.senderId === currentUser.id}
                                messageText={message.text}
                                messageImage={message.image}
                                receiverName={receiver.receiverName}
                                receiverImage={receiver.receiverImage}
                                senderImage={currentUser?.image}
                                time={message.createdAt}
                            />
                        )
                    })
            }
            <div ref={messagesEndRef}>
            </div>
        </div>
        <div className='flex items-center p-3'>
            <Input
                receiverId={receiver?.receiverId}
                currentUserId={currentUser?.id}
            />
        </div>
    </div>
  )
}

export default Chat