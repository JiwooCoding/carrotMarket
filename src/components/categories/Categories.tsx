'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import digital from '../../assets/free-icon-computer-2004699.png'
import appliance from '../../assets/free-icon-refrigerator-3793415.png'
import interior from '../../assets/free-icon-furniture-5540319.png'
import woman from '../../assets/free-icon-woman-clothes-6114779.png'
import man from '../../assets/free-icon-male-clothes-6114809.png'
import beauty from '../../assets/free-icon-makeup-5732023.png'
import sport from '../../assets/free-icon-sports-2158416.png'
import car from '../../assets/free-icon-car-3034250.png'
import CategoryBox from './CategoryBox'

export const categories = [
    {
        label: '디지털기기',
        path: 'digital',
        icon: digital,
        description: '디지털 카테고리입니다.'
    },
    {
        label: '생활가전',
        path: 'appliance',
        icon: appliance,
        description: '생활가전 카테고리입니다.'
    },
    {
        label: '가구/인테리어',
        path: 'interior',
        icon: interior,
        description: '가구/인테리어 카테고리입니다.'
    },
    {
        label: '여성의류',
        path: 'woman-clothing',
        icon: woman,
        description: '여성의류 카테고리입니다.'
    },
    {
        label: '남성패션/잡화',
        path: 'man-fashion',
        icon: man,
        description: '남성패션/잡화 카테고리입니다.'
    },
    {
        label: '뷰티/미용',
        path: 'beauty',
        icon: beauty,
        description: '디지털 카테고리입니다.'
    },
    {
        label: '스포츠/레저',
        path: 'sports',
        icon: sport,
        description: '스포츠/레저 카테고리입니다.'
    },
    {
        label: '중고차',
        path: 'used-car',
        icon: car,
        description: '중고차 카테고리입니다.'
    },
]

const Categories = () => {
    
    const params = useSearchParams();
    const category = params?.get('category');

  return (
    <div className='flex flex-row items-center justify-between pt-4 overflow-x-auto mt-9'>
        {categories.map((item) => (
            <CategoryBox
                key={item.label}
                label={item.label}
                path={item.path}
                icon={item.icon}
                //예)category가 beauty라면, item.path의 beauty랑 같을 경우에만 
                //selected가 true가 되어서 해당 category bar가 진해지는 효과
                selected={category === item.path}
            />
        ))}
    </div>
  )
}

export default Categories