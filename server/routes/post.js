const router = require("../routers").post
const auth = require('../authMiddleware')
const {ResCode, idToObj} = require("../db/helpers")
const Post = require('../db/models/post')
const multer = require('multer')
const links = require("../hateoasLinks")
const path = require('path')
<<<<<<< HEAD:server/express/routes/post.js
const postHandler = require("../../db/post")

=======
const postHandler = require("../db/controllers/post")
const uploadPath = path.join('public', Post.postImageBasePath)
>>>>>>> master:server/routes/post.js
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage, 
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// Create a new post
router.post('/', upload.single('postImage'), auth, async (req, res) => {
    const post = new Post({
        postName: req.body.postName,
        cookingTime: req.body.cookingTime,
        ingredients: req.body.ingredients,
        description: req.body.description,
        recipe: req.body.recipe,
        postImage: req.file.buffer,
        postImageType: req.file.mimetype,
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
        let { postName, user, reviews, offset, limit } = req.query
        // Filtering the searching post results
        let query = {}
        if (user != null) query.user = user
        if (postName != null) query.postName = postName
        if (reviews != null) query.reviews = reviews
        
        let result = await Post.find(query)

        // Paging with offset and limit
        let currentOffset = 0
        if (limit != null) {
            if (offset != null) {
                currentOffset = offset                
            }
           result = result.slice(currentOffset, Number(currentOffset) + Number(req.query.limit))
        }
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get a particular post's image
router.get("/image/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.setHeader("Expires", "-1");
        res.setHeader("Cache-Control", "must-revalidate, private");
        res.type(post.postImageType).send(post.postImage);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Delete all posts from the logged in user
router.delete('/', auth, async (req, res) => {
    const posts = await Post.find({ user: req.userID })
    const resultsResult = ResCode.SUCCESS
    for(const post of posts) {
        const result = await postHandler.delete(post)
        if(result !== ResCode.SUCCESS) resultsResult = result
    }

    switch(resultsResult) {
        case ResCode.SUCCESS:
            res.status(200).json({ message: 'Deleted' })
            break

        default:
            res.status(500).json({
                message: "Server error",
                error: result?.error
            })
            break
    }
})

// Get one post with its id
router.get('/:id', getPost, (req, res) => {
    if (res.post) {
        const result = {...res.post}._doc
        result._links = {
            self: links.getPost(req.params.id)
        }
        res.status(200).json(result)
    } else {
        res.status(404).json({ message: 'Cannot find post' })
    }
})

// Update partially one post
router.patch('/:id', getPost, upload.single(), auth, async (req, res) => {
    if(!res.post.user.equals(req.userID)) return res.status(403).json({message: "Unauthorized"})

    if (req.body.postName != null) {
        res.post.postName = req.body.postName
    }
    if (req.body.cookingTime != null) {
        res.post.cookingTime = req.body.cookingTime
    }
    if (req.body.ingredients != null) {
        res.post.ingredients = req.body.ingredients
        console.log(res.post.ingredients)
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
router.delete('/:id', getPost, auth, async (req, res) => {
    if(!res.post.user.equals(req.userID)) return res.status(403).json({message: "Unauthorized"})

    const result = await postHandler.delete(res.post)

    switch(result) {
        case ResCode.SUCCESS:
            res.status(200).json({ message: 'The post is deleted.' })
            break

        default:
            res.status(500).json({
                message: "Server error",
                error: result?.error
            })
            break
    }
})

// Function to get a specific post by Id
async function getPost(req, res, next) {
    let post
    try {
        const postID = idToObj(req.params.id)
        if(!postID) return res.status(400).json({
            message: "Invalid post ID",
            postID: req.params.id
        })

        post = await Post.findById(postID)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.post = post
    next()
}
