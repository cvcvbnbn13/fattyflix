import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { SwiperSlide } from 'swiper/react'
import tmdbConfigs from '../../../api/configs/tmdb.configs'
import NavigationSwiper from '../NavigationSwiper'

const MediaVideo = ({ video }) => {
  const iframeRef = useRef()

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px'
    iframeRef.current.setAttribute('height', height)
  }, [video])

  return (
    <Box sx={{ height: 'max-content' }}>
      <iframe
        key={video.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  )
}

const MediaVideoSlide = ({ videos }) => {
  return (
    <React.Fragment>
      {videos.length > 0 ? (
        <NavigationSwiper>
          {videos.map(video => (
            <SwiperSlide key={video.id}>
              <MediaVideo video={video} />
            </SwiperSlide>
          ))}
        </NavigationSwiper>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '10vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography fontSize="2rem" fontWeight="700">
            無相關預告片
          </Typography>
        </Box>
      )}
    </React.Fragment>
  )
}

export default MediaVideoSlide
