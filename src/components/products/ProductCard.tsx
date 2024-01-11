'use client'
import { Product, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import HeartButton from '../HeartButton';
import { fromNow } from '@/helpers/dayjs';


interface ProductCardProps {
    //로그인 안하면 currentUser 없기 때문에 optional
    currentUser?:User | null;
    data:Product;
}

const ProductCard = ({currentUser, data}:ProductCardProps) => {

    const router = useRouter();

  return (
    <div onClick={() => router.push(`/products/${data.id}`)}
        className='col-span-1 cursor-pointer group mb-8'
    >
        <div className='flex flex-col w-full gap-[2px]'>
            <div className='relative w-full overflow-hidden aspect-square rounded-lg'>
                <Image
                    src={data.imageSrc}
                    fill
                    sizes='auto'
                    className='object-cover w-full h-full transition group-hover:scale-110'
                    alt='product'
                />
                <div className='absolute top-3 right-3'>
                    <HeartButton
                        //어떤 상품을 like했는지 알기 위해서
                        productId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className='text-md'>
                {data.title}
            </div>
            <div className='font-light text-xs'>
                {data.address}
            </div>
            <div className='flex flex-row items-center justify-between gap-1'>
                <div className='text-sm font-semibold'>
                    {(data.price).toLocaleString('en-US')}<span>원</span>
                </div>
                <div className='text-xs text-gray-500'>
                    {fromNow(data.createdAt)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard