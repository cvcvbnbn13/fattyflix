import privateClient from '../client/private.client'

const favoriteEndpoints = {
  getList: 'user/favorites',
  addFavorite: 'user/favorites',
  removeFavorite: ({ favoriteId }) => `user/favorites/${favoriteId}`,
}

const favoriteApi = {
  getList: async () => {
    try {
      const res = await privateClient.get(favoriteEndpoints.getList)

      return { res }
    } catch (error) {
      return { error }
    }
  },
  addFavorite: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate,
  }) => {
    try {
      const res = await privateClient.post(favoriteEndpoints.addFavorite, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      })

      return { res }
    } catch (error) {
      return { error }
    }
  },
  removeFavorite: async ({ favoriteId }) => {
    try {
      const res = await privateClient.delete(
        favoriteEndpoints.removeFavorite({ favoriteId })
      )

      return { res }
    } catch (error) {
      return { error }
    }
  },
}

export default favoriteApi
