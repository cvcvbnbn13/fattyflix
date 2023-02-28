import privateClient from '../client/private.client.js'
import publicClient from '../client/public.client.js'

const userEndpoints = {
  signin: 'user/signin',
  signup: 'user/signup',
  getinfo: 'user/info',
  passwordupdate: 'user/update-password',
}

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const res = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      })

      return { res }
    } catch (error) {
      return { error }
    }
  },

  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const res = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      })

      return { res }
    } catch (error) {
      return { error }
    }
  },

  getInfo: async () => {
    try {
      const res = await privateClient.get(userEndpoints.getinfo)

      return { res }
    } catch (error) {
      return { error }
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const res = await privateClient.put(userEndpoints.passwordupdate, {
        password,
        newPassword,
        confirmNewPassword,
      })

      return { res }
    } catch (error) {
      return { error }
    }
  },
}

export default userApi
