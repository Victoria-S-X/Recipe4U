const Post = require("./models/post")

exports.getPost = async (postID) => {
    return await Post.findById(postID)
}