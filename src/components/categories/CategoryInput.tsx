import React from 'react'
import { IconType } from 'react-icons';

interface CategoryInputProps{
    onClick: (value: string) => void;
    selected?: boolean;
    label: string;
    icon: IconType
    path: string;
}

const CategoryInput = ({onClick, selected, label, icon: Icon, path}:CategoryInputProps) => {
  return (
    <div
        onClick={() => onClick(path)}
        className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-orange-500 cursor-pointer transition
            ${selected ? 'border-orange-500' : 'border-neutral-200'}`}
    >
        <div className='font-semibold'>
            {label}
        </div>
    </div>
  )
}

export default CategoryInput