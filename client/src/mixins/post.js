import { Api } from '@/Api'

export default {
  methods: {
    getPost: async (postID) => {
      const post = await Api.get(`/posts/${postID}`)
      return post.data
    }
  }
}
