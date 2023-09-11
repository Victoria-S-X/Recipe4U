const express = require('express')
const router = express.Router()
const auth = require('../auth')
const helpers = require('../../models/helpers')

const Post = require('../../models/post')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const uploadPath = path.join('public', Post.postImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})
// Create a new post
router.post('/', upload.single('postImage'), auth, async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const post = new Post({
        postName: req.body.postName,
        cookTime: req.body.cookTime,
        ingredients: req.body.ingredients,
        description: req.body.description,
        recipe: req.body.recipe,
        postImageName: fileName,
        user: req.userID
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

// Delete all posts of a specific user
router.delete('/', auth, async (req, res) => {
    try {
        const query = { user: req.userID }
        await Post.deleteMany(query)
        return res.status(200).json({ message: 'Deleted' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})

// Get one post with its id
router.get('/:id', getPost, (req, res) => {
    res.send(res.post)
})

// Update partially one post
router.patch('/:id', getPost, auth, async (req, res) => {
    const userID = helpers.idToObj(req.userID)
    if(!res.post.user.equals(userID)) return res.status(403).json({message: "Unauthorized"})
    if (req.body.postName != null) {
        res.post.postName = req.body.postName
    }
    if (req.body.cookTime != null) {
        res.post.cookTime = req.body.cookTime
    }
    if (req.body.ingredients != null) {
        res.post.ingredients = req.body.ingredients
    }
    if (req.body.description != null) {
        res.post.description = req.body.description
    }
    if (req.body.recipe != null) {
        res.post.recipe = req.body.recipe
    }
    if (req.body.postImageName != null) {
        res.post.postImageName = req.body.postImageName
    }
    try {
        const updatedPost = await res.post.save()
        return res.status(200).json(updatedPost)
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Delete a post
router.delete('/:id', getPost, auth, async (req, res) => {
    const userID = helpers.idToObj(req.userID)
    if(!res.post.user.equals(userID)) return res.status(403).json({message: "Unauthorized"})
    try {
        await res.post.deleteOne()
        return res.status(200).json({ message: 'The post is deleted.' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// Function to get a specific post by Id
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