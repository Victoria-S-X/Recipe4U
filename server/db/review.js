const { ResCode } = require('./helpers')
const Review = require('./models/review')

exports.deleteReviewsFromPost = async (postId) => {
    try {
        await Review.deleteMany({ postID: postID })
        return ResCode.SUCCESS
    } catch {
        return ResCode.ERROR
    }
}