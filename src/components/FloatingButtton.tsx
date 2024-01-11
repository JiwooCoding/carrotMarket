import Link from 'next/link'
import React from 'react'

interface FloatingButttonProps {
    children: React.ReactNode;
    href: string;
}

//여기서 children은 '+'
const FloatingButtton = ({children, href}:FloatingButttonProps) => {
  return (
    <Link href={href}
        className='fixed flex items-center justify-center text-white transition-colors font-semibold
        bg-orange-500 border-0 border-transparent rounded-full shadow-xl cursor-pointer
        hover:bg-orange-400 aspect-w-1 aspect-h-2 bottom-8 right-12 w-[120px] h-[55px]'
    >
        {children}
    </Link>
  )
}

export default FloatingButtton