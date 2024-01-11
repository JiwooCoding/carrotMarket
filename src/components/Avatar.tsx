import Image from 'next/image'
import React from 'react'

interface AvatarProps {
    src:string | null;
}

const Avatar = ({src}:AvatarProps) => {
  return (
    <Image
        className='w-10 h-10 rounded-full'
        height={35}
        width={35}
        alt='Avatar'
        src={src || 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'}
    />
  )
}

export default Avatar