import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import favoriteApi from '../../../api/modules/favorite.api'

import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import MediaItem from '../MediaItem'

import { toast } from 'react-toastify'
import { removeFavorite } from '../../../redux/features/userSlice'

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch()

  const [isRequesting, setIsRequesting] = useState(false)

  const handleRemove = async () => {
    if (isRequesting) return

    setIsRequesting(true)

    const { res, error } = await favoriteApi.removeFavorite({
      favoriteId: media.id,
    })

    setIsRequesting(false)

    if (error) toast.error(error.message)
    if (res) {
      toast.success('從片單移除成功')
      dispatch(removeFavorite({ mediaId: media.mediaId }))
      onRemoved(media.id)
    }
  }

  return (
    <React.Fragment>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={isRequesting}
        onClick={handleRemove}
      >
        移除
      </LoadingButton>
    </React.Fragment>
  )
}

export default FavoriteItem
