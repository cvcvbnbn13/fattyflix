import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'

import { toast } from 'react-toastify'

import Container from '../Container'
import TextAvatar from '../TextAvatar'
import ReviewItem from '../ReviewItem'

import reviewApi from '../../../api/modules/review.api'

const MediaReview = ({ reviews, media, mediaType }) => {
  const { user } = useSelector(state => state.user)

  const [listReviews, setListReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [page, setPage] = useState(1)
  const [isRequesting, setIsRequesting] = useState(false)
  const [content, setContent] = useState('')
  const [reviewCount, setReviewCount] = useState(0)

  const skip = 4

  useEffect(() => {
    setListReviews([...reviews])
    setFilteredReviews([...reviews].slice(0, skip))
    setReviewCount(reviews.length)
  }, [reviews])

  const handleAddReview = async () => {
    if (isRequesting) return

    setIsRequesting(true)

    const requestBody = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    }

    const { res, error } = await reviewApi.addReview(requestBody)

    setIsRequesting(false)
    if (error) toast.error(error)

    if (res) {
      toast.success('新增留言成功')

      setFilteredReviews([...filteredReviews, res])
      setReviewCount(reviewCount + 1)
      setContent('')
    }
  }

  const handleLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ])
    setPage(page + 1)
  }

  const handleRemoveReview = id => {
    if (listReviews.findIndex(e => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter(e => e.id !== id)
      setListReviews(newListReviews)
      setFilteredReviews([...newListReviews].splice(0, page * skip))
    } else {
      setFilteredReviews([...filteredReviews].filter(e => e.id !== id))
    }

    setReviewCount(reviewCount - 1)

    toast.success('刪除留言成功')
  }

  return (
    <React.Fragment>
      <Container header={`${reviewCount}則留言`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map(item => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={handleRemoveReview} />
              <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
            </Box>
          ))}
          {filteredReviews.length < reviewCount && (
            <Button onClick={handleLoadMore}>載入更多</Button>
          )}
        </Stack>
        {user && (
          <React.Fragment>
            <Divider />
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextAvatar text={user.displayName} />
                <Stack spacing={1} direction="column">
                  <Typography variant="h6" fontWeight="700">
                    {user.displayName}
                  </Typography>
                  <Typography variant="h6" fontWeight="500" fontSize=".5rem">
                    @{user.username}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={2} flexGrow={1}>
                <TextField
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="留下你的評論"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: 'max-content' }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={isRequesting}
                  onClick={handleAddReview}
                >
                  留言
                </LoadingButton>
              </Stack>
            </Stack>
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  )
}

export default MediaReview
