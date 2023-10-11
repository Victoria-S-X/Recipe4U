const router = require('../routers').post

const { logError } = require('../helpers')
const auth = require('../authMiddleware')
const { ResCode, idToObj } = require('../db/helpers')
const multer = require('multer')
const links = require('../hateoasLinks')
const controller = require('../db/controllers/post')
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    callback(null, controller.isValidMimeType(file.mimetype))
  }
})

// Create a new post
router.post('/', upload.single('postImage'), auth, async (req, res) => {
  const result = await controller.create(
    req.body.postName,
    req.body.cookingTime,
    req.body.ingredients,
    req.body.description,
    req.body.recipe,
    req.userID,
    req.file
  )

  switch (result.resCode) {
    case ResCode.SUCCESS:
      res.status(201).json(result.data)
      break
    case ResCode.BAD_INPUT:
      res.status(400).json({
        message: 'Invalid input',
        error: result?.error
      })
      break

    default:
      res.status(500).json({
        message: 'Server error'
      })
      break
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

    let result = await controller.find(query)

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
router.get('/image/:id', async (req, res) => {
  try {
    const post = await controller.getImage(req.params.id)

    if (!post || !post.postImage) {
      res.redirect('http://localhost:8080/default-post.svg')
    } else {
      res.type(post.postImageType).send(post.postImage)
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one post with its id
router.get('/:id', getPost, (req, res) => {
  if (res.post) {
    const result = { ...res.post }._doc
    result._links = {
      self: links.getPost(req.params.id),
      selfPage: links.getPostPage(req.params.id),
      image: links.getPostImage(req.params.id)
    }
    res.status(200).json(result)
  } else {
    res.status(404).json({ message: 'Cannot find post' })
  }
})

// Update partially one post
router.patch('/:id', upload.single(), auth, async (req, res) => {
  const result = await controller.patch(
    req.params.id,
    req.body.postName,
    req.body.cookingTime,
    req.body.ingredients,
    req.body.description,
    req.body.recipe,
    req.userID
  )

  switch (result.resCode) {
    case ResCode.SUCCESS:
      res.status(200).json({ message: 'The post is updated.' })
      break
    case ResCode.UNAUTHORIZED:
      res.status(403).json({ message: 'Unauthorized' })
      break
    case ResCode.NOT_FOUND:
      res.status(404).json({ message: 'Cannot find post' })
      break

    default:
      res.status(500).json({
        message: 'Server error',
        error: result?.error
      })
      break
  }
})

// Delete all posts from the logged in user
router.delete('/', auth, async (req, res) => {
  const posts = await controller.findByUser(req.userID)
  const resultsResult = ResCode.SUCCESS
  for (const post of posts) {
    const result = await controller.delete(post)
    if (result !== ResCode.SUCCESS) resultsResult = result
  }

  switch (resultsResult) {
    case ResCode.SUCCESS:
      res.status(200).json({ message: 'Deleted' })
      break

    default:
      res.status(500).json({
        message: 'Server error',
        error: result?.error
      })
      break
  }
})

// Delete a post
router.delete('/:id', getPost, auth, async (req, res) => {
  if (!res.post.user.equals(req.userID)) return res.status(403).json({ message: 'Unauthorized' })

  const result = await controller.delete(res.post)
  console.error(result)

  switch (result.resCode) {
    case ResCode.SUCCESS:
      res.status(200).json({ message: 'The post is deleted.' })
      break

    default:
      res.status(500).json({
        message: 'Server error',
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
    if (!postID)
      return res.status(400).json({
        message: 'Invalid post ID',
        postID: req.params.id
      })

    post = await controller.get(postID)
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' })
    }
  } catch (err) {
    logError('post.js/getPost', err)
    return res.status(500).json({ message: err.message })
  }
  res.post = post
  next()
}
