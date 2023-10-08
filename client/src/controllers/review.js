const { Api } = require('@/Api')

const createReview = (postID, username, rating, text) =>
  Api.post(`/posts/${postID}/reviews`, {
    username,
    rating,
    text
  })

export default { methods: { createReview } }
