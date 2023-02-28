import publicClient from '../client/public.client'

const genreEndpoints = {
  getList: ({ mediaType }) => `${mediaType}/genres`,
}

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const res = await publicClient.get(genreEndpoints.getList({ mediaType }))

      return { res }
    } catch (error) {
      return { error }
    }
  },
}

export default genreApi
