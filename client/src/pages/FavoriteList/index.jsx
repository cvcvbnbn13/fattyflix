import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Grid } from '@mui/material'

import { toast } from 'react-toastify'

import FavoriteItem from '../../components/common/FavoriteItem'
import Container from '../../components/common/Container'
import uiConfigs from '../../configs/ui.configs'
import favoriteApi from '../../api/modules/favorite.api'
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'

const FavoriteList = () => {
  const [medias, setMedias] = useState([])
  const [filteredMedias, setFilteredMedias] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const dispatch = useDispatch()

  const skip = 8

  const handleLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ])
    setPage(page + 1)
  }

  const handleRemoved = id => {
    const newMedias = [...medias].filter(e => e.id !== id)
    setMedias(newMedias)
    setFilteredMedias([...newMedias].slice(0, page * skip))
    setCount(count - 1)
  }

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true))

      const { res, error } = await favoriteApi.getList()

      dispatch(setGlobalLoading(false))

      if (error) toast.error(error)
      if (res) {
        setCount(res.length)
        setMedias([...res])
        setFilteredMedias(res.slice(0, skip))
      }
    }

    getFavorites()
  }, [dispatch])

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`你的片單 (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
          {filteredMedias.map(media => (
            <Grid item xs={6} sm={4} md={3} key={media.id}>
              <FavoriteItem media={media} onRemoved={handleRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={handleLoadMore}>載入更多</Button>
        )}
      </Container>
    </Box>
  )
}

export default FavoriteList
