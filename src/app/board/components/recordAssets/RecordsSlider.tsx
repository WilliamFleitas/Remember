'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import { RecordType } from '@/src/globalTypes/globalTypes'
import RecordCard from '../RecordCard'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import './RecordsSlider.css'

interface RecordsSliderPropsType {
  recordData: RecordType[] | []
}
export default function RecordsSlider ({
  recordData
}: RecordsSliderPropsType): React.JSX.Element {
  const totalVisibleSlides = 3
  const missingSlides = totalVisibleSlides - recordData.length

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={18}
      freeMode={true}
      pagination={{
        clickable: true
      }}
      modules={[FreeMode, Pagination]}
      className='mySwiper'
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 18,
        },
        1040: {
          slidesPerView: 2,
          spaceBetween: 18,
        },
        1536: {
          slidesPerView: 3,
          spaceBetween: 18,
        },
      }}
    >
      {recordData.map(record => (
        <SwiperSlide key={record.id}>
          <RecordCard recordData={record} />
        </SwiperSlide>
      ))}
      {Array.from({ length: missingSlides }).map((_, index) => (
        <SwiperSlide key={`empty-${index}`}>
          <div
            className='flex flex-col grow w-1/4 h-full bg-tertiary-background rounded-md min-w-[28rem] border border-secondary-border/50 overflow-hidden isolate text-center items-center justify-center p-8'
            style={{
              boxShadow: '2px 10px 15px #0000008c'
            }}
          >
            {index === 0 ? (
              <span
                className='border border-inherit w-full h-full rounded-md flex items-center justify-center text-center text-primary-border'
                style={{
                  boxShadow: '2px 10px 15px #0000008c'
                }}
              >
                !Add more records!
              </span>
            ) : (
              <span
                className='border border-inherit w-full h-full rounded-md p-6 flex'
                style={{
                  boxShadow: '2px 10px 15px #0000008c'
                }}
              >
                <span
                  className='border border-inherit w-full h-full rounded-md flex'
                  style={{
                    boxShadow: 'inset 2px 10px 15px #0000008c'
                  }}
                ></span>
              </span>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
