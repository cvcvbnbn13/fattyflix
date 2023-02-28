import React from 'react'
import { SwiperSlide } from 'swiper/react'
import AutoSwiper from '../AutoSwiper'
import MediaItem from '../MediaItem'

const RecommendedSlide = ({ medias, mediaType }) => {
  return (
    <AutoSwiper>
      {medias.map(item => (
        <SwiperSlide key={item.id}>
          <MediaItem media={item} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  )
}

export default RecommendedSlide
