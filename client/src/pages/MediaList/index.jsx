import React, { useEffect, useState, useMemo } from 'react'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import uiConfigs from '../../configs/ui.configs'
import mediaApi from '../../api/modules/media.api'
import HeroSlide from '../../components/common/HeroSlide'
import MediaGrid from '../../components/common/MediaGrid'
import { setAppState } from '../../redux/features/appStateSlice'
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
import { toast } from 'react-toastify'

const MediaList = () => {
  const { mediaType } = useParams()

  const [medias, setMedias] = useState([])
  const [mediaLoading, setMediaLoading] = useState(false)
  const [currCategory, setCurrCategory] = useState(0)
  const [currPage, setCurrPage] = useState(1)

  const dispatch = useDispatch()

  const mediaCategories = useMemo(() => ['popular', 'top_rated'], [])
  const category = ['熱門', '備受讚譽']

  useEffect(() => {
    dispatch(setAppState(mediaType))
    window.scrollTo(0, 0)
  }, [mediaType, dispatch])

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true))
      setMediaLoading(true)

      const { res, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      })

      setMediaLoading(false)
      dispatch(setGlobalLoading(false))

      if (error) toast.error(error)
      if (res) {
        if (currPage !== 1) setMedias(m => [...m, ...res.results])
        else setMedias([...res.results])
      }
    }

    getMedias()
  }, [currCategory, currPage, dispatch, mediaCategories, mediaType])

  const handleCategoryChange = categoryIndex => {
    if (currCategory === categoryIndex) return
    setMedias([])
    setCurrPage(1)
    setCurrCategory(categoryIndex)
  }

  const handleLoadMore = () => setCurrPage(currPage + 1)

  return (
    <React.Fragment>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie ? '電影' : '節目'}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={cate}
                size="large"
                variant={currCategory === index ? 'contained' : 'text.primary'}
                sx={{
                  color:
                    currCategory === index
                      ? 'primary.contrastText'
                      : 'text.primary',
                }}
                onClick={() => handleCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={handleLoadMore}
        >
          載入更多
        </LoadingButton>
      </Box>
    </React.Fragment>
  )
}

export default MediaList
