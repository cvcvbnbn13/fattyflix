import publicClient from '../client/public.client'

const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
}

const personApi = {
  detail: async ({ personId }) => {
    try {
      const res = await publicClient.get(personEndpoints.detail)

      return { res }
    } catch (error) {
      return { error }
    }
  },

  medias: async ({ personId }) => {
    try {
      const res = await publicClient.get(personEndpoints.medias)

      return { res }
    } catch (error) {
      return { error }
    }
  },
}

export default personApi
