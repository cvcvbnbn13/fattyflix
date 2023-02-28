import React, { useState, useEffect, useCallback } from 'react'

import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'

import { toast } from 'react-toastify'

import mediaApi from '../../api/modules/media.api'
import MediaGrid from '../../components/common/MediaGrid'
import uiConfigs from '../../configs/ui.configs'

const mediaTypes = [
  { category: 'movie', name: '電影' },
  { category: 'tv', name: '節目' },
  { category: 'people', name: '演員' },
]
let timer
const timeout = 1000

const MeadiaSearch = () => {
  const [mediaType, setMediaType] = useState(mediaTypes[0])
  const [medias, setMedias] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const search = useCallback(async () => {
    setIsSearching(true)

    const { res, error } = await mediaApi.search({
      mediaType: mediaType.category,
      query,
      page,
    })

    setIsSearching(false)

    if (error) toast.error(error)
    if (res) {
      if (page > 1) setMedias(m => [...m, ...res.results])
      else setMedias([...res.results])
    }
  }, [mediaType, page, query])

  const handleCategorySwitch = selectedCategory =>
    setMediaType(selectedCategory)

  const handleQueryChange = e => {
    const newQuery = e.target.value
    // 清除前一次的timer
    clearTimeout(timer)

    timer = setTimeout(() => {
      setQuery(newQuery)
    }, timeout)
  }

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([])
      setPage(1)
    } else {
      search()
    }
  }, [query, search, mediaType.category, page])

  useEffect(() => {
    setMedias([])
    setPage(1)
  }, [mediaType.category])

  return (
    <React.Fragment>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                key={index}
                size="large"
                variant={
                  mediaType.category === item.category ? 'contained' : 'text'
                }
                sx={{
                  color:
                    mediaType.category === item.category
                      ? 'primary.contrastText'
                      : 'text.primary',
                }}
                onClick={() => handleCategorySwitch(item)}
              >
                {item.name}
              </Button>
            ))}
          </Stack>
          <TextField
            color="success"
            placeholder={`搜尋${mediaType.name}...`}
            sx={{ width: '100%' }}
            autoFocus
            onChange={handleQueryChange}
          />

          <MediaGrid medias={medias} mediaType={mediaType.category} />

          {medias.length > 8 && (
            <LoadingButton
              loading={isSearching}
              onClick={() => setPage(page + 1)}
            >
              載入更多
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </React.Fragment>
  )
}

export default MeadiaSearch
