const express = require('express')
const router = express.Router()
const Post = require('../../items/post')

// Create a new post
router.post('/', async (req, res) => {
    const post = new Post({
        postName: req.body.postName,
        cookTime: req.body.cookTime,
        ingredient: req.body.ingredient,
        description: req.body.description,
        recipe: req.body.recipe
    })
    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Get all posts
router.get('/', async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/', async (req, res) => {
    try {
        // TO DO
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})

// Get one post with its id
router.get('/:id', getPost, (req, res) => {
    res.send(res.post)
})

// Update partially one post
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.postName != null) {
        res.post.postName = req.body.postName
    }
    if (req.body.cookTime != null) {
        res.post.cookTime = req.body.cookTime
    }
    if (req.body.ingredient != null) {
        res.post.ingredient = req.body.ingredient
    }
    if (req.body.description != null) {
        res.post.description = req.body.description
    }
    if (req.body.recipe != null) {
        res.post.recipe = req.body.recipe
    }
    try {
        const updatedPost = await res.post.save()
        return res.status(200).json(updatedPost)
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Delete a post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.deleteOne()
        return res.status(200).json({ message: 'The post is deleted.' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

async function getPost(req, res, next) {
    let post
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.post = post
    next()
}

module.exports = router