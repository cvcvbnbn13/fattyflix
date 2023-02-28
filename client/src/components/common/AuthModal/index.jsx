import React, { useEffect, useState } from 'react'
import { Box, Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthModalOpen } from '../../../redux/features/authModalSlice'

import Logo from '../Logo'
import SigninForm from '../SigninForm'
import SignupForm from '../SignupForm'

const actionState = {
  signin: 'signin',
  signup: 'signup',
}

const AuthModal = () => {
  const { authModalOpen } = useSelector(state => state.authModal)

  const dispatch = useDispatch()

  const [action, setAction] = useState(actionState.signin)

  const handleClose = () => dispatch(setAuthModalOpen(false))

  const handleSwitchAuthState = state => setAction(state)

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin)
  }, [authModalOpen])

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '600px',
          padding: 4,
          outline: 'none',
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo />
          </Box>
          {action === actionState.signin && (
            <SigninForm
              switchAuthState={() => handleSwitchAuthState(actionState.signup)}
            />
          )}

          {action === actionState.signup && (
            <SignupForm
              switchAuthState={() => handleSwitchAuthState(actionState.signin)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default AuthModal
