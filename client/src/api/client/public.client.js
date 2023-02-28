import axios from 'axios'
import queryString from 'query-string'

const baseURL = 'http://localhost:5000/api/v1/'

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params),
  },
})

publicClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  }
})

publicClient.interceptors.response.use(
  res => {
    if (res && res.data) return res.data
    return res
  },
  err => {
    throw err.message
  }
)

export default publicClient
