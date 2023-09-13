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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    }
})

module.exports = mongoose.model('Post', postSchema)
module.exports.postImageBasePath = postImageBasePath