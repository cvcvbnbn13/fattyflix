import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import CircularRate from '../../components/common/CircularRate'
import Container from '../../components/common/Container'
import ImageHeader from '../../components/common/ImageHeader'
import CastSlide from '../../components/common/CastSlide'
import MediaVideoSlide from '../../components/common/MediaVideoSlide'
import BackdropSlide from '../../components/common/BackdropSlide'
import PosterSlide from '../../components/common/PosterSlide'
import RecommendedSlide from '../../components/common/RecommendSlide'
import MediaSlide from '../../components/common/MediaSlide'
import MediaReview from '../../components/common/MediaReview'

import uiConfigs from '../../configs/ui.configs'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import mediaApi from '../../api/modules/media.api'
import favoriteApi from '../../api/modules/favorite.api'

import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
import { setAuthModalOpen } from '../../redux/features/authModalSlice'
import { addFavorite, removeFavorite } from '../../redux/features/userSlice'

import { LoadingButton } from '@mui/lab'
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams()

  const { user, listFavorites } = useSelector(state => state.user)

  const [media, setMedia] = useState()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [genres, setGenres] = useState([])

  const dispatch = useDispatch()

  const videoRef = useRef(null)

  const handleScroll = () => {
    videoRef.current.scrollIntoView()
  }

  const handleAddFavorite = async () => {
    if (!user) return dispatch(setAuthModalOpen(true))

    if (isRequesting) return

    if (isFavorite) {
      handleRemoveFavorite()
      return
    }

    setIsRequesting(true)

    const requestBody = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    }

    const { res, error } = await favoriteApi.addFavorite(requestBody)

    setIsRequesting(false)

    if (error) toast.error(error)
    if (res) {
      dispatch(addFavorite(res))
      setIsFavorite(true)
      toast.success('加入我的片單成功')
    }
  }

  const handleRemoveFavorite = async () => {
    if (isRequesting) return
    setIsRequesting(true)

    const favorite = listFavorites.find(
      e => e.mediaId.toString() === media.id.toString()
    )

    const { res, error } = await favoriteApi.removeFavorite({
      favoriteId: favorite.id,
    })

    setIsRequesting(false)

    if (error) toast.error(error)
    if (res) {
      dispatch(removeFavorite(favorite))
      setIsFavorite(false)
      toast.success('已從我的片單移除')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const getMedia = async () => {
      dispatch(setGlobalLoading(true))
      const { res, error } = await mediaApi.getDetail({ mediaType, mediaId })
      dispatch(setGlobalLoading(false))

      if (res) {
        setMedia(res)
        setIsFavorite(res.isFavorite)
        setGenres(res.genres.splice(0, 3))
      }

      if (error) toast.error(error)
    }

    getMedia()
  }, [mediaType, mediaId, dispatch])

  return media ? (
    <React.Fragment>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <Box
        sx={{ color: 'primary.contrastText', ...uiConfigs.style.mainContent }}
      >
        <Box
          sx={{
            marginTop: { xs: '-10rem', md: '-15rem', lg: '-20rem' },
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' } }}
          >
            <Box
              sx={{
                width: { xs: '70%', sm: '50%', md: '40%' },
                margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
              }}
            >
              <Box
                sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            <Box
              sx={{ width: { xs: '100%', md: '60%' }, color: 'text.primary' }}
            >
              <Stack spacing={5}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
                >
                  {`${media.title || media.name}`}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularRate value={media.vote_average} />

                  <Divider orientation="vertical" />

                  {genres.map(genre => (
                    <Chip
                      label={genre.name}
                      variant="filled"
                      color="primary"
                      key={genre.id}
                    />
                  ))}
                  <Typography>
                    {`${
                      mediaType === tmdbConfigs.mediaType.movie
                        ? media.release_date.split('-')[0]
                        : media.first_air_date.split('-')[0]
                    }`}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: 'max-content',
                      '& .MuiButton-startIcon': { marginRight: '0' },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={isRequesting}
                    onClick={handleAddFavorite}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: 'max-content' }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleScroll}
                  >
                    立即看
                  </Button>
                </Stack>

                <Container header="演員名單">
                  <CastSlide casts={media.credits.cast.slice(0, 11)} />
                </Container>
              </Stack>
            </Box>
          </Box>
        </Box>
        <div ref={videoRef} style={{ paddingTop: '2rem' }}>
          <Container header="預告片">
            <MediaVideoSlide videos={media.videos.results.slice(0, 5)} />
          </Container>
        </div>

        {media.images.backdrops.length > 0 && (
          <Container header="宣傳照">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}

        {media.images.posters.length > 0 && (
          <Container header="海報">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}

        <MediaReview
          reviews={media.reviews}
          media={media}
          mediaType={mediaType}
        />

        <Container header="你可能也會喜歡...">
          {media.recommend.length > 0 && (
            <RecommendedSlide medias={media.recommend} mediaType={mediaType} />
          )}
          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container>
      </Box>
    </React.Fragment>
  ) : null
}

export default MediaDetail
