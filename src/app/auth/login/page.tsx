'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form'

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        // 각 입력 필드의 초기값 설정
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async(body) => {
        setIsLoading(true);
        try {
            const data = signIn('credentials', body);
            console.log(data);
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <section className='grid h-[calc(100vh_-_56px)] place-items-center'>
        <form onSubmit={handleSubmit(onSubmit)} 
            className='flex flex-col justify-center gap-4 min-w-[350px]'>
            <h1 className='text-2xl font-semibold'>로그인</h1>
            <Input
                id="email"
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Button label="로그인"/>
            <div className='text-center'>
                <p className='text-gray-400'>
                    아직 회원이 아닌가요?{" "}
                    <Link href={"/auth/register"} className='text-black hover:underline'>
                        회원가입
                    </Link>
                </p>
            </div>
        </form>
    </section>
  )
}

export default LoginPage