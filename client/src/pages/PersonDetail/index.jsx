import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import PersonMediaGrid from '../../components/common/PersonMediaGrid'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import uiConfigs from '../../configs/ui.configs'
import Container from '../../components/common/Container'
import personApi from '../../api/modules/person.api'
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'

import { toast } from 'react-toastify'
import { Box, Toolbar, Typography, Stack } from '@mui/material'

const PersonDetail = () => {
  const { personId } = useParams()
  const [person, setPerson] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true))
      const { res, error } = await personApi.detail({ personId })
      dispatch(setGlobalLoading(false))

      console.log(error)
      if (error) toast.error(error)
      if (res) setPerson(res)
    }

    getPerson()
  }, [dispatch, personId])

  return (
    <React.Fragment>
      <Toolbar />
      {person && (
        <React.Fragment>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box sx={{ width: { xs: '50%', md: '20%' } }}>
                <Box
                  sx={{
                    paddingTop: '160%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'darkgrey',
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      person.profile_path
                    )})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: '100%', md: '80%' },
                  padding: { xs: '1rem 0', md: '1rem 2rem' },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${person.birthday.split('-')[0]}`}
                    {person.deathday && ` - ${person.deathday.split('-')[0]}`}
                    {')'}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="作品列表">
              <PersonMediaGrid personId={personId} />
            </Container>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default PersonDetail
