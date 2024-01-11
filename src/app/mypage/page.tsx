import React from 'react'
import MyPageClient from './MyPageClient'
import getCurrentUser from '../actions/getCurrentUser'

const mypage = async() => {
    
  const currentUser = await getCurrentUser();

  return (
    <MyPageClient currentUser={currentUser}/>
  )
}

export default mypage