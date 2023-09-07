const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postName: {
        type: String,
        required: true
    },
    cookingTime: String,
    ingredient: {
        type: [],
        required: true
    },
    description: String,
    recipe: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)