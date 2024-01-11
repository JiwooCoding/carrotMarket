'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from '@/components/NavItem'
import { User } from '@prisma/client';
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { signIn,signOut } from "next-auth/react"
import Image from 'next/image';
import logoSvg from '../assets/0dWzO0siwtBTASC4BqPkeW2c0ZUE2Ftu5qYU9apbkbh85Y4SGjQPzhRZE8QhbJbBH52emjmvkj4aEfSSuNdQng.svg'
import { useMediaQuery } from '@react-hook/media-query';


interface NavbarProps {
    //유저가 로그인 되어있으면 User고 안되어있으면 null
    currentUser?: User | null;
}

const Navbar = ({currentUser}:NavbarProps) => {
    //useState훅은 client component에서만 사용가능!
    const [menu, setMenu] = useState(false);
    const handleMenu = () => {
        setMenu(!menu);
    }
    
    const isSmallScreen = useMediaQuery('(max-width: 640px)');

  return (
    <nav className='fixed top-0 left-0 bg-white z-10 w-full text-black'>
        <div className='flex items-center mx-5 sm:mx-10 lg:mx-20 justify-around'>
            <div className='flex items-center gap-[6px] text-[28px] h-14 font-extrabold text-orange-500 cursor-pointer font-jua'>
            {/* 화면 크기에 따라 로고를 조건부로 렌더링합니다. */}
            {isSmallScreen ? (
                <Image src={logoSvg} alt='logo' width={18} height={18} className='relative bottom-[3px]' />
            ) : (
                <>
                <Image src={logoSvg} alt='logo' width={18} height={18} className='relative bottom-[3px]' />
                <Link href={"/"}>당근마켓</Link>
                </>
            )}
            </div>
            <div className='text-2xl sm:hidden'>
                {menu === false ? 
                <button onClick={handleMenu}><AiOutlineMenu/></button> : 
                <button onClick={handleMenu}><IoCloseOutline size={30}/></button>}
            </div>
            <div className='hidden sm:block'>
                <NavItem currentUser={currentUser}/>
            </div>
            <div className='flex gap-6 items-center'>
                {/* currentUser가 있으면 signOut 보여주고 없으면 signIn보여준다. */}
                {currentUser
                ?
                <>
                <div className='text-[17px] text-orange-500 font-jua'>
                    <Link href={'/mypage'}>
                        {currentUser.name} 님
                    </Link>
                </div>
                <div className='py-2 text-center cursor-pointer font-semibold transition hover:text-gray-500 text-[17px]'><button onClick={() => signOut()}>로그아웃</button></div>
                </>
                :
                <div className='py-2 text-center cursor-pointer font-semibold transition hover:text-gray-500 text-[17px]'><button onClick={() => signIn()}>로그인</button></div>
                }
                <div className='mr-3 rounded-md text-center cursor-pointer font-semibold hover:bg-gray-300 hover:bg-opacity-25 hover:text-opacity-25 transition border border-solid border-gray-300 py-[8px] px-6'>
                    <Link href={`/chat`}>채팅하기</Link>
                </div>
            </div>
        </div>
        <div className='block sm:hidden'>
            {menu === false ? null : <NavItem mobile currentUser={currentUser}/>}
        </div>
    </nav>
  )
}

export default Navbar