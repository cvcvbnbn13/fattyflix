import { Typography, useTheme, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  const theme = useTheme()

  return (
    <Button component={Link} to="/" sx={{ color: 'text.primary' }}>
      <Typography fontWeight="700" fontSize="1.7rem">
        FATTY
        <span style={{ color: theme.palette.primary.main }}>FLIX</span>
      </Typography>
    </Button>
  )
}

export default Logo
