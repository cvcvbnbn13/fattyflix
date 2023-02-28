import React from 'react'
import HereSlide from '../../components/common/HeroSlide'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import { Box } from '@mui/material'
import uiConfigs from '../../configs/ui.configs'
import Container from '../../components/common/Container'
import MediaSlide from '../../components/common/MediaSlide'

const HomePage = () => {
  return (
    <React.Fragment>
      <HereSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="熱門電影">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="熱門節目">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="備受讚譽的電影">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>

        <Container header="備受讚譽的節目">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>
      </Box>
    </React.Fragment>
  )
}

export default HomePage
