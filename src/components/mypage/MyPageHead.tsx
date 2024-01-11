'use client'
import { User } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar';

interface MyPageHeadProps{
    currentUser?:User | null;
}

const MyPageHead = ({currentUser}:MyPageHeadProps) => {

    const grade = ['브론즈', '실버', '골드'];
    const [randomGrade, setRandomGrade] = useState('');

    useEffect(() => {
        generateRandomGrade();
    },[])

    const generateRandomGrade = () => {
        const randomIndex = Math.floor(Math.random() * grade.length);
        setRandomGrade(grade[randomIndex]);
    }

  return (
    <div className='bg-orange-500 flex px-14 py-3 items-center gap-2 font-jua font-medium text-white text-xl rounded-md'>
        <Avatar src={currentUser?.image as string}/>
        {randomGrade}회원 · {currentUser?.name}님 반갑습니다
    </div>
  )
}

export default MyPageHead