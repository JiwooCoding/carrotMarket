import Link from 'next/link'
import React, { useState } from 'react'
import { User } from '@prisma/client';


interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null;
}

const NavItem = ({mobile,currentUser}:NavItemProps) => {

  return (
    <ul className={`text-[18px] justify-center flex w-full items-center ${mobile && "flex-col h-full"}`}>
      <li className={`py-2 text-center mr-11 cursor-pointer font-semibold transition font-nanum hover:text-gray-500 `}><Link href={"/admin"}>중고거래</Link></li>
      <li className={`py-2 text-center mr-11 cursor-pointer font-semibold transition font-nanum hover:text-gray-500 `}><Link href={"/user"}>동네업체</Link></li>
      <li className={`py-2 text-center mr-11 cursor-pointer font-semibold transition font-nanum hover:text-gray-500 `}><Link href={"/user"}>알바</Link></li>
      <li className={`py-2 text-center mr-11 cursor-pointer font-semibold transition font-nanum hover:text-gray-500 `}><Link href={"/user"}>부동산 직거래</Link></li>
      <li className={`py-2 text-center mr-11 cursor-pointer font-semibold transition font-nanum hover:text-gray-500 `}><Link href={"/user"}>중고차 직거래</Link></li>
      {/* {currentUser ? <li className=''><Link className='hover:font-semibold' href={"/userDetail"}>{currentUser.name}</Link> 님</li> : ""} */}
    </ul>
  )
}

export default NavItem