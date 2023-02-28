import axios from 'axios'
import queryString from 'query-string'

const baseURL = 'https://fattyflix-client.vercel.app/api/v1/'

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params),
  },
})

privateClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      authorization: `Bearer ${localStorage.getItem('actkn')}`,
      'Content-Type': 'application/json',
    },
  }
})

privateClient.interceptors.response.use(
  res => {
    if (res && res.data) return res.data
    return res
  },
  err => {
    throw err.message
  }
)

export default privateClient
