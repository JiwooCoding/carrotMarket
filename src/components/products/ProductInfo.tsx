import { Product, User } from '@prisma/client';
import React from 'react'
import Avatar from '../Avatar';
import { fromNow } from '@/helpers/dayjs';

interface ProductInfoProps{
    user:User;
    product:Product;
    description: string;
    address:string;
    title:string;
    price:number;
    category: {
        label: string;
    } | undefined;
}

const ProductInfo = ({title, user, category, address, description, price,product}:ProductInfoProps) => {

    const renderDescription = (text: string) => {
        const newText = text.split('\n').map((str, index) => <React.Fragment key={index}>{str}<br /></React.Fragment>);
        return <div>{newText}</div>;
    };

  return (
    <div className=''>
        <div className='flex items-center gap-3 mb-4'>
            <Avatar
                src={user?.image}
            />
            <div className='inline-block'>
                <p className='text-md font-semibold'>{user?.name}</p>
                <p className='text-xs font-light'>{address}</p>
            </div>
        </div>
    <hr/>
        <div className='my-6'>
            <p className='text-lg font-semibold mb-1'>{title}</p>
            <div className='text-xs text-gray-400'>
                <p>{category?.label} · {fromNow(product?.createdAt)}</p>
            </div>
            <div className='mt-1 text-md font-semibold'>
                <p>{price.toLocaleString('en-US')}원</p>
            </div>
            <div className='mt-4'>
                {renderDescription(description)}
            </div>
        </div>
    <hr/>
</div>
    )
}

export default ProductInfo