const router = require("../expressApp").Router("/api/v1/posts")

const auth = require('../auth')

const Review = require('../../db/models/review')
const Post = require('../../db/models/post')

router.post('/:postId/reviews', auth, async (req, res) => {
    console.log(req.body)
    const review = new Review({
        text: req.body.text, 
        post: req.params.postId,
        rating: req.params.rating,
        user: req.userID,
    })
    try {
        await review.save()
        const post = await Post.findById(req.params.postId)
        await post.reviews.push(review)
        await post.save()
        console.log(review.text)
        res.status(201).send(review)
    } catch (err){
        res.status(400).json({ message: err })
    }
})

router.get('/:postId/reviews', async (req, res) => {
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

router.get('/:postId/reviews/:reviewId', getReview, async (req, res) => {
    res.send(res.review)
})

router.delete('/:postId/reviews/:reviewId', auth, getReview, async (req, res) => {
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

module.exports = router