'use client';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input'
import { categories } from '@/components/categories/Categories';
import CategoryInput from '@/components/categories/CategoryInput';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const ProductUploadPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {register, handleSubmit, setValue, watch, formState:{errors}, reset} = useForm<FieldValues>({
        defaultValues:{
            title:'',
            description:'',
            category:'',
            latitude:33.5563,
            longitude: 126.79581,
            imageSrc:'', //이미지 경로 저장하는 필드
            price:1000,
            address:''
        }
    });


    const imageSrc = watch('imageSrc');
    const category = watch('category');
    const latitude = watch('latitude');
    const longitude = watch('longitude');

    //카카오맵 Dynamic으로 가져오기
    const KakaoMap = dynamic(() => import('../../../components/KakaoMap'),{
        ssr:false,
    })

    //여기서 props에 data는 input에 입력한 데이터를 의미한다.
    const handleRequestError = (error:any) => {
        console.error("API 요청 중 오류 발생:", error);
        // 사용자에게 에러 메시지 표시 또는 다른 처리 방법을 추가할 수 있습니다.
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/products', data)
            .then(response => {
                router.push(`/products/${response.data.id}`)
            })
            .catch(handleRequestError)  // 에러 처리 함수 호출
            .finally(() => {
                setIsLoading(false)
            });
    }

    const setCustomValue = (id: string, value: any) => {
        //id가 imageSrc, value가 이미지 경로 (http://~~)
        setValue(id, value);
    }

  return (
    <Container>
        <div className='max-w-sreen-lg mx-auto'>
            <form 
                className='flex flex-col gap-8'
                onSubmit={handleSubmit(onSubmit)}    
            >
                <Heading
                    title="내 물건 팔기"
                    subtitle="업로드 할 물건의 정보를 적어주세요"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
                <Input
                    id="title"
                    label='제목'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label='자세한 설명'
                    type="textarea"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="price"
                    label='가격'
                    formatPrice
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="address"
                    label='거래 희망 장소'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h[50vh] overflow-y-auto'>
                    {categories.map((item) => (
                        <div key={item.label} className='col-span-1'>
                            <CategoryInput
                                //category는 클릭된 카테고리의 정보를 나타내는 변수
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.path}
                                label={item.label}
                                icon={item.icon}
                                path={item.path}
                            />
                        </div>
                    ))}
                </div>
                <hr/>
                <KakaoMap 
                    setCustomValue={setCustomValue}
                    latitude={latitude}
                    longitude={longitude}
                />
                <Button label='작성완료'/>
            </form>
        </div>
    </Container>
  )
}

export default ProductUploadPage