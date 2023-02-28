import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField } from '@mui/material'

import Container from '../../components/common/Container'
import uiConfigs from '../../configs/ui.configs'
import userApi from '../../api/modules/user.api'

import { setUser } from '../../redux/features/userSlice'
import { setAuthModalOpen } from '../../redux/features/authModalSlice'

import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const PasswordUpdate = () => {
  const [isRequesting, setIsRequesting] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, '舊密碼長度不得短於8位')
        .required('舊密碼為必填'),
      newPassword: Yup.string()
        .min(8, '新密碼長度不得短於8位')
        .notOneOf([Yup.ref('password')], '新舊密碼不得相同')
        .required('新密碼為必填'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], '確認新密碼與新密碼並不相符')
        .required('確認密碼為必填'),
    }),
    onSubmit: async values => handleUpdate(values),
  })

  const handleUpdate = async values => {
    if (isRequesting) return

    setIsRequesting(true)

    const { res, error } = await userApi.passwordUpdate(values)

    setIsRequesting(false)

    if (error) toast.error(error)
    if (res) {
      form.resetForm()
      navigate('/')
      dispatch(setUser(null))
      dispatch(setAuthModalOpen(true))
      toast.success('更改密碼成功 請重新登入')
    }
  }

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="更改密碼">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="使用者密碼"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.password && form.errors.password !== undefined
              }
              helperText={form.touched.password && form.errors.password}
            />

            <TextField
              type="password"
              placeholder="新使用者密碼"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.newPassword &&
                form.errors.newPassword !== undefined
              }
              helperText={form.touched.newPassword && form.errors.newPassword}
            />

            <TextField
              type="password"
              placeholder="確認新使用者密碼"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword !== undefined
              }
              helperText={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={isRequesting}
            >
              確認更改密碼
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default PasswordUpdate
