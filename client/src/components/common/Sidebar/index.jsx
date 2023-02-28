import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setThemeMode } from '../../../redux/features/themeModeSlice'

import menuConfigs from '../../../configs/menu.configs'
import uiConfigs from '../../../configs/ui.configs'
import { themeModes } from '../../../configs/theme.configs'

import Logo from '../Logo'

import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)
  const { appState } = useSelector(state => state.appState)
  const { themeMode } = useSelector(state => state.themeMode)

  const sidebarWidth = uiConfigs.style.size.sidebarWidth

  const handleSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark
    dispatch(setThemeMode(theme))
  }

  const drawer = (
    <React.Fragment>
      <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: '30px' }}>
        <Typography variant="h6" marginBottom="20px">
          列表
        </Typography>
        {menuConfigs.main.map(item => (
          <ListItemButton
            key={item.display}
            sx={{
              borderRadius: '10px',
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? 'primary.main'
                : 'unset',
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography>{item.display}</Typography>}
            />
          </ListItemButton>
        ))}

        {user && (
          <React.Fragment>
            <Typography variant="h6" marginBottom="20px">
              個人資訊
            </Typography>
            {menuConfigs.user.map(item => (
              <ListItemButton
                key={item.display}
                sx={{
                  borderRadius: '10px',
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? 'primary.main'
                    : 'unset',
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography>{item.display}</Typography>}
                />
              </ListItemButton>
            ))}
          </React.Fragment>
        )}

        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>
        <ListItemButton onClick={handleSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {themeMode === themeModes.dark ? 'dark mode' : 'light mode'}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </React.Fragment>
  )

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        '& .MuiDrawer-Paper': {
          boxSizing: 'border-box',
          width: sidebarWidth,
          borderRight: '0px',
        },
      }}
    >
      {drawer}
    </Drawer>
  )
}

export default Sidebar
