import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import menuConfigs from '../../../configs/menu.configs'
import { setUser } from '../../../redux/features/userSlice'

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material'

const UserMenu = () => {
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleToggleMenu = e => setAnchorEl(e.currentTarget)

  const handleDeleteAnchorEl = () => {
    setAnchorEl(null)
  }

  const handleDeleteUser = () => {
    dispatch(setUser(null))
  }

  return (
    <React.Fragment>
      {user && (
        <React.Fragment>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={handleToggleMenu}
          >
            {user.displayName}
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleDeleteAnchorEl}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={item.display}
                onClick={handleDeleteAnchorEl}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography>{item.display}</Typography>}
                />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ borderRadius: '10px' }}
              onClick={handleDeleteUser}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography>登出</Typography>}
              />
            </ListItemButton>
          </Menu>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default UserMenu
