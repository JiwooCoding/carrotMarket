'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ToastProvider = () => {
  return (
    <ToastContainer
    //2초 뒤에 자동으로 close 될 수 있게 
      autoClose={2000}
      hideProgressBar={true}
      position='bottom-center'
      pauseOnHover={false}
      closeOnClick={true}
    />
  )
}

export default ToastProvider