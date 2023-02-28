import privateClient from '../client/private.client'

const reviewEndpoints = {
  listReviews: 'reviews',
  addReview: 'reviews',
  removeReview: ({ reviewId }) => `reviews/${reviewId}`,
}

const reviewApi = {
  addReview: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    content,
  }) => {
    try {
      const res = await privateClient.post(reviewEndpoints.addReview, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      })

      return { res }
    } catch (error) {
      return { error }
    }
  },

  removeReview: async ({ reviewId }) => {
    try {
      const res = await privateClient.delete(
        reviewEndpoints.removeReview({ reviewId })
      )

      return { res }
    } catch (error) {
      return { error }
    }
  },

  getList: async () => {
    try {
      const res = await privateClient.get(reviewEndpoints.listReviews)

      return { res }
    } catch (error) {
      return { error }
    }
  },
}

export default reviewApi
