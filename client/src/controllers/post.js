import { Api } from '@/Api'

const getPosts = async (filter) => {
  const posts = await Api.get('/posts', { params: filter, cashe: false })
  return posts.data
}

const getPost = async (postID) => {
  const post = await Api.get(`/posts/${postID}`)
  return post.data
}

export default {
  methods: {
    getPosts,
    getPost
  }
}
