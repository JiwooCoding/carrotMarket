import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react'
import {IoImageOutline} from 'react-icons/io5'
import {RiSendPlaneLine} from 'react-icons/ri'
import useSWRMutation from 'swr/mutation';
import {CgClose} from 'react-icons/cg'
import previewImage from '@/helpers/previewImage';
import uploadImage from '@/helpers/uploadImage';

interface InputProps {
    receiverId: string;
    currentUserId: string;
}

const sendRequest = (url: string, {arg}:{
    arg:{
        texg:string;
        image: string;
        receiverId: string;
        senderId: string;
    }
}) => {
    return fetch(url, {method:'POST', body:JSON.stringify(arg)})
    .then(res => res.json());
}

const Input = ({receiverId, currentUserId}:InputProps) => {

    const [message, setMessage] = useState('');
    //크라우디너리에 업로드 하기 위해서
    const [image, setImage] = useState<File | null>(null);
    //프리뷰 보여주기 위해서
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    //이미지 업로드 useRef
    const imageRef = useRef<HTMLInputElement>(null);

    const {trigger} = useSWRMutation('/api/chat', sendRequest);

    const chooseImage = () => {
        imageRef.current?.click();
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imageUrl = image ? await uploadImage(image as File) : null;

        if(message || imageUrl) {
            try {
                trigger({
                    text: message,
                    image: imageUrl,
                    receiverId: receiverId,
                    senderId: currentUserId
                })
                // await axios.post('/api/chat',{
                //     text: message,
                //     image: imageUrl,
                //     receiverId: receiverId,
                //     senderId: currentUserId
                // })
            } catch (error) {
                console.log(error);
            }
        }
        //전송 버튼 누르면 input 빈 상태로 만들어줌 
        setMessage('');
        //사진 전송 버튼 누르면 빈 상태로 만들어줌
        setImagePreview(null);
        setImage(null);
    }

    const removeImage = () => {
        setImagePreview(null);
        setImage(null);
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className='relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] border-gray-300 rounded-md shadow-sm'>
        
        {imagePreview && 
            <div className='absolute right-0 w-full overflow-hidden rounded-md bottom-[4.2rem] max-w-[300px] shadow-md'>
                <img src={imagePreview} alt=""/>
                <span 
                    onClick={removeImage}
                    className='absolute flex items-center justify-center p-2 text-xl text-white bg-gray-900 cursor-pointer top-[0.4rem] right-[0.4rem] rounded-full opacity-60 hover:opacity-100'>
                    <CgClose/>
                </span>
            </div>
        }

        <input
            className='w-full text-base outline-none'
            type='text'
            placeholder='메세지를 작성해주세요'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        {/* Photo */}
        <input type='file' className='hidden' 
            ref={imageRef} accept='image/*' multiple={false}
            onClick={(e) => previewImage(e, setImagePreview, setImage)}
        />
        <div onClick={chooseImage} className='text-2xl text-gray-200 cursor-pointer'>
            <IoImageOutline/>
        </div>
        <button
            type='submit'
            className='flex items-center justify-center p-2 text-gray-900 bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600 disabled:opacity-60'
        >
            <RiSendPlaneLine className='text-white'/>
        </button>
    </form>
  )
}

export default Input