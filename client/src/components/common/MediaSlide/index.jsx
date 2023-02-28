import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import mediaApi from '../../../api/modules/media.api'
import AutoSwiper from '../AutoSwiper'
import { toast } from 'react-toastify'

import MediaItem from '../MediaItem'

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([])

  useEffect(() => {
    const getMedias = async () => {
      const { res, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      })

      if (res) setMedias(res.results)
      if (error) toast.error(error)
    }

    getMedias()
  }, [mediaType, mediaCategory])

  return (
    <AutoSwiper>
      {medias.map(media => (
        <SwiperSlide key={media.id}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  )
}

export default MediaSlide
