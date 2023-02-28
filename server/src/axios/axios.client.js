import axios from 'axios'

const get = async url => {
  const res = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'identity',
    },
  })
  return res.data
}

export default { get }
