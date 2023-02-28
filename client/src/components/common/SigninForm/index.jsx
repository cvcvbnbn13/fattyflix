import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import userApi from '../../../api/modules/user.api'
import { setAuthModalOpen } from '../../../redux/features/authModalSlice'
import { setUser } from '../../../redux/features/userSlice'

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch()

  const [isLogining, setIsLogining] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const signinForm = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, '使用者名稱長度不得短於8位')
        .required('使用者名稱為必填'),
      password: Yup.string()
        .min(8, '使用者密碼長度不得短於8位')
        .required('使用者密碼為必填'),
    }),
    onSubmit: async values => {
      setErrorMessage(undefined)
      setIsLogining(true)
      const { res, error } = await userApi.signin(values)
      setIsLogining(false)

      if (res) {
        signinForm.resetForm()
        dispatch(setUser(res))
        dispatch(setAuthModalOpen(false))
        toast.success('登入成功')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }

      if (error) {
        setErrorMessage(error.message)
      }
    },
  })

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="使用者名稱"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />

        <TextField
          type="password"
          placeholder="使用者密碼"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLogining}
      >
        登入
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        創建帳戶
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  )
}

export default SigninForm
