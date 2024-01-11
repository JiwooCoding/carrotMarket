'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import Image from 'next/image'
import swpImg from '../assets/a58d23772ae53d2c54cf15ba5210ad41.png'
import swpImg2 from '../assets/daangn-1536x768.png'
import swpImg3 from '../assets/pasted image 0.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function Banner() {
    SwiperCore.use([Navigation,Pagination, Autoplay]);
  return (
    <>
    <Swiper
        slidesPerView={1}
        pagination = {true}
        autoplay={{delay:7000}}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        loop
        modules={[Pagination, Navigation]}
        className="mySwiper"
    >
        <SwiperSlide>
            <Image src={swpImg} alt='swpImg' style={{width:'990px', height:'550px'}}/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={swpImg2} alt='swpImg2' style={{width:'990px', height:'550px'}}/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={swpImg3} alt='swpImg3' style={{width:'990px', height:'550px'}}/>
        </SwiperSlide>
        {/* 커스텀 화살표 */}
        <div className='swiper-button-prev bg-gray-400 rounded-full opacity-70 hover:opacity-40' style={{color:'white', width:'30px', height:'30px'}}/>
        <div className='swiper-button-next bg-gray-400 rounded-full opacity-70 hover:opacity-40' style={{color:'white', width:'30px', height:'30px'}}/>
        <span className='swiper-pagination-bullet-active'/>
    </Swiper>
    <style jsx>
        {`
            .swiper-button-next::after {
                content: "next";
                font-size: 15px;
                font-weight:bold;
            }
            .swiper-button-prev::after{
                content:"prev";
                font-size: 15px;
                font-weight:bold;
            }
            .swiper-pagination-bullet-active{
                background:red !important;
            }
        `}
    </style>
    </>
  );
}
