import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import reviewApi from '../../../api/modules/review.api'

import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { Box, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import DeleteIcon from '@mui/icons-material/Delete'

import TextAvatar from '../TextAvatar'

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector(state => state.user)

  const [isRequesting, setIsRequesting] = useState(false)

  const handleRemove = async () => {
    if (isRequesting) return
    setIsRequesting(true)

    const { res, error } = await reviewApi.removeReview({ reviewId: review.id })

    if (error) toast.error(error)
    if (res) onRemoved(review.id)
  }

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: '5px',
        position: 'relative',
        opacity: isRequesting ? 0.6 : 1,
        '&:hover': { backgroundColor: 'background.paper' },
      }}
    >
      <Stack direction="row" spacing={2} position="relative">
        <TextAvatar text={review.user.displayName} />
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.user.displayName}
            </Typography>
            <Typography variant="h6" fontSize=".5rem">
              @{review.user.username}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format('YYYY-MM-DD')}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={isRequesting}
              onClick={handleRemove}
              sx={{
                width: 'max-content',
                position: { xs: 'relative', md: 'absolute' },
                right: { md: 0 },
                bottom: { md: 0 },
              }}
            >
              刪除
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default ReviewItem
