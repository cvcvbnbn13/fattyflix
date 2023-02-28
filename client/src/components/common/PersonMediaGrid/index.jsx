import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import tmdbConfigs from '../../../api/configs/tmdb.configs'
import personApi from '../../../api/modules/person.api'
import MediaItem from '../MediaItem'
import { toast } from 'react-toastify'

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([])
  const [filteredMedias, setFilteredMedias] = useState([])
  const [page, setPage] = useState(1)
  const skip = 8

  const getReleaseDate = media => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date)

    return date.getTime()
  }

  const handleLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].slice(page * skip, skip),
    ])
    setPage(page + 1)
  }

  useEffect(() => {
    const getMedias = async () => {
      const { res, error } = await personApi.medias({ personId })

      if (error) toast.error(error)
      if (res) {
        const mediasSorted = res.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        )
        setMedias([...mediasSorted])
        setFilteredMedias(mediasSorted.slice(0, skip))
      }
    }
    getMedias()
  }, [personId])

  return (
    <React.Fragment>
      <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={handleLoadMore}>載入更多</Button>
      )}
    </React.Fragment>
  )
}

export default PersonMediaGrid
