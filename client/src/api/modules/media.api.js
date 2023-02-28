import privateClient from '../client/private.client'
import publicClient from '../client/public.client'

const mediaEndpoints = {
  getList: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
}

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const res = await publicClient.get(
        mediaEndpoints.getList({ mediaType, mediaCategory, page })
      )

      return { res }
    } catch (error) {
      return { error }
    }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const res = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      )

      return { res }
    } catch (error) {
      return { error }
    }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const res = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      )

      return { res }
    } catch (error) {
      return { error }
    }
  },
}

export default mediaApi
