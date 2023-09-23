const postRouter = require("../routers").post
const reviewRouter = require("../routers").review

const reviewData = require("../db/controllers/review")
const auth = require('../authMiddleware')
const { ResCode } = require("../db/helpers")

const Review = require('../db/models/review')
const Post = require('../db/models/post')


postRouter.post('/:postId/reviews', auth, async (req, res) => {

    const result = await reviewData.create({
        text: req.body.text,
        strPostID: req.params.postId,
        rating: req.body.rating,
        userID: req.userID
    })

    switch (result.resCode) {
        case ResCode.SUCCESS:
            res.status(201).json(result?.data)
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({ message: result?.error })
            break
        case ResCode.NOT_FOUND:
            res.status(404).json({ message: result?.error })

        default:
            res.status(500).json({ 
                message: "Failed to create review",
                resCode: result?.resCode.number,
            })
            break
    }
})

postRouter.get('/:postId/reviews', async (req, res) => {
    try {
        let reviews = await Review.find()
        if (reviews != null) {
            reviews = reviews.filter((re) => re.post.equals(req.params.postId))
        }
        res.status(200).json(reviews)
    } catch (err){
        res.status(500).json({ message: err.message })

    }
})

postRouter.get('/:postId/reviews/:reviewId', getReview, async (req, res) => {
    res.send(res.review)
})

postRouter.delete('/:postId/reviews/:reviewId', auth, getReview, async (req, res) => {
    if (!res.review.user.equals(req.userID)) return res.status(403).json({ message: 'Unauthorized' })
    try {
        const post = await Post.findById(req.params.postId)
        const newReviews = await post.reviews.filter((re) => !re.equals(req.params.reviewId))
        console.log(newReviews)
        post.reviews = newReviews
        await post.save()
        await res.review.deleteOne()
        res.status(200).json({ message: 'The review is deleted.' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})



reviewRouter.put("/:id", auth, async (req, res) => {

    const result = await reviewData.put({
        strPostID: req.body.postID,
        userID: req.userID,
        text: req.body.text,
        rating: req.body.rating,
        id: req.params.id
    })

    switch (result.resCode) {
        case ResCode.SUCCESS:
            res.status(200).json(result?.data)
            break
        case ResCode.MISSING_ARGUMENT:
            res.status(422).json({ message: result?.error })
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({ message: result?.error })
            break
        case ResCode.NOT_FOUND:
            res.status(404).json({ message: result?.error })
            break
        case ResCode.UNAUTHORIZED:
            res.status(403).json({ message: result?.error })
            break
        
        default:
            res.status(500).json({ message: "Failed to update review" })
            break
    }
})

async function getReview(req, res, next) {
    let review
    try {
        review = await Review.findById(req.params.reviewId)
        if (review == null) {
            return res.status(404).json({ message: 'Cannot find review' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.review = review
    next()
}

module.exports = reviewRouter