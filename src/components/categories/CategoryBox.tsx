import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons';
import Image from 'next/image';

interface CategoryBoxProps {
  label: string;
  path: string;
  icon: string;
  selected?: boolean;
}

const CategoryBox = ({label, path, icon, selected}:CategoryBoxProps) => {
  return (
    <Link href={`/?category=${path}`}
      className={`flex flex-col items-center justify-center gap-2 p-3 hover:text-neutral-800 
      transition cursor-pointer ${selected ? 'text-neutral-600 font-semibold ' : 'text-neutral-500' }`}>
      <div className={`bg-gray-100 p-5 aspect-square rounded-full ${selected ? 'border-[2px] border-solid border-[#f89955]' : ''}`}>
        <Image src={icon} alt={label} width={25} height={25} />
      </div>
      <div className='text-xs'>
        {label}
      </div>
    </Link>
  )
}

export default CategoryBox