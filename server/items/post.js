const mongoose = require('mongoose')
const postImageBasePath = 'uploads/postImages'

const postSchema = new mongoose.Schema({
    postName: {
        type: String,
        required: true
    },
    cookingTime: {
        type: String,
    },
    ingredients: {
        type: [],
        required: true
    },
    description: {
        type: String,
    },
    recipe: {
        type: String,
        required: true
    },
    postImageName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Post', postSchema)
module.exports.postImageBasePath = postImageBasePath