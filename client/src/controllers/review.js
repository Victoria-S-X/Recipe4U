const { Api } = require('@/Api')

const createReview = (postID, username, rating, text) =>
  Api.post(`/posts/${postID}/reviews`, {
    username,
    rating,
    text
  })

const getReviews = async (postID) => Api.get(`/posts/${postID}/reviews`).data

export default { methods: { createReview, getReviews } }
