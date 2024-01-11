'use client'
import Button from '@/components/Button';
import Container from '@/components/Container';
import { categories } from '@/components/categories/Categories';
import ProductHead from '@/components/products/ProductHead';
import ProductInfo from '@/components/products/ProductInfo';
import { Product, User } from '@prisma/client'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ProductClientProps {
    product:Product & {user: User};
    currentUser?: User | null;
}

const ProductClient = ({product, currentUser}:ProductClientProps) => {

    const KakaoMap = dynamic(() => import('../../../components/KakaoMap'),{
        ssr:false,
    })

    const router = useRouter();

    const category = categories.find((item) => item.path === product.category)

  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <ProductHead
                    title={product.title}
                    imageSrc={product.imageSrc}
                    id={product.id}
                    //HeartButton때문에 currentUser정보 필요함
                    currentUser={currentUser}
                />
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10'>
                    <ProductInfo
                        user={product.user}
                        category={category}
                        description={product.description}
                        address={product.address}
                        title={product.title}
                        price={product.price}
                        product={product}
                    />
                    <div>
                        {/* 이 컴포넌트의 카카오맵에서는 지도 클릭 불가능 detailPage때문에 */}
                        <KakaoMap detailPage latitude={product.latitude} longitude={product.longitude}/>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <Button label='채팅하기'
                        onClick={() => router.push('/chat')}/>
            </div>
        </div>
    </Container>
  )
}

export default ProductClient