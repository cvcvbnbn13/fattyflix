import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import GlobalLoading from '../../common/GlobalLoading'
import Footer from '../../common/Footer'
import Topbar from '../../common/Topbar'
import AuthModal from '../../common/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import userApi from '../../../api/modules/user.api'
import favoriteApi from '../../../api/modules/favorite.api'
import { setUser, setListFavorites } from '../../../redux/features/userSlice'

const MainLayout = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)

  useEffect(() => {
    const authUser = async () => {
      const { res, error } = await userApi.getInfo()

      if (res) dispatch(setUser(res))
      if (error) dispatch(setUser(null))
    }

    authUser()
  }, [dispatch])

  useEffect(() => {
    const getFavorites = async () => {
      const { res, error } = await favoriteApi.getList()

      if (res) dispatch(setListFavorites(res))
      if (error) toast.error(error)
    }

    if (user) getFavorites()
    if (!user) dispatch(setListFavorites([]))
  }, [user, dispatch])

  return (
    <React.Fragment>
      <GlobalLoading />

      <AuthModal />
      <Box display="flex" minHeight="100vh">
        <Topbar />
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

export default MainLayout
