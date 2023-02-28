import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'

import tmdbConfigs from '../../api/configs/tmdb.configs'
import reviewApi from '../../api/modules/review.api'
import uiConfigs from '../../configs/ui.configs'

import Container from '../../components/common/Container'

import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
import { routesGen } from '../../routes/routes'

import dayjs from 'dayjs'
import { toast } from 'react-toastify'

const ReviewItem = ({ review, onRemoved }) => {
  const [isRequesting, setIsRequesting] = useState(false)

  const handleRemove = async () => {
    if (isRequesting) return

    setIsRequesting(true)

    const { res, error } = await reviewApi.removeReview({
      reviewId: review.id,
    })

    setIsRequesting(false)

    if (error) toast.error(error.message)
    if (res) {
      toast.success('評論移除成功')
      onRemoved(review.id)
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: 1,
        opacity: isRequesting ? 0.6 : 1,
        '&:hover': { backgroundColor: 'Background.paper' },
      }}
    >
      <Box sx={{ width: { xs: 0, md: '10%' } }}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: 'unset', textDecoration: 'none' }}
        >
          <Box
            sx={{
              paddingTop: '160%',
              ...uiConfigs.style.backgroundImage(
                tmdbConfigs.posterPath(review.mediaPoster)
              ),
            }}
          />
        </Link>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: { xs: 0, md: '0 2rem' },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: 'unset', textDecoration: 'none' }}
          >
            <Typography
              variant="h6"
              sx={{ ...uiConfigs.style.typoLines(1, 'left') }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">
            {dayjs(review.createdAt).format('YYYY-MM-DD')}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>
      <LoadingButton
        variant="contained"
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          right: { xs: 0, md: '10px' },
          marginTop: { xs: 2, md: 0 },
          width: 'max-content',
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={isRequesting}
        onClick={handleRemove}
      >
        刪除
      </LoadingButton>
    </Box>
  )
}

const ReviewList = () => {
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const dispatch = useDispatch()

  const skip = 2

  const handleLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page * skip, skip),
    ])
    setPage(page + 1)
  }

  const handleRemoved = id => {
    const newReviews = [...reviews].filter(e => e.id !== id)
    setReviews(newReviews)
    setFilteredReviews([...newReviews].slice(0, page * skip))
    setCount(count - 1)
  }

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true))

      const { res, error } = await reviewApi.getList()

      dispatch(setGlobalLoading(false))

      if (error) toast.error(error)
      if (res) {
        setCount(res.length)
        setReviews([...res])
        setFilteredReviews(res.slice(0, skip))
      }
    }

    getReviews()
  }, [dispatch])

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`你發表過的評論 (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map(item => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={handleRemoved} />
              <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && (
            <Button onClick={handleLoadMore}>載入更多</Button>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default ReviewList
