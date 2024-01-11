import Avatar from '@/components/Avatar';
import Container from '@/components/Container';
import MyPageHead from '@/components/mypage/MyPageHead';
import MyPageLikeInfo from '@/components/mypage/MyPageLikeInfo';
import { User } from '@prisma/client';
import React from 'react'

interface MyPageClientProps {
    currentUser?:User | null;
}

const MyPageClient = ({currentUser}:MyPageClientProps) => {

    console.log('이름===============>',currentUser?.name);
  return (
    <Container>
      <MyPageHead currentUser={currentUser}/>
      <MyPageLikeInfo/>
    </Container>
  )
}

export default MyPageClient