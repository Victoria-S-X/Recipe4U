const Post = require("./models/post")

exports.doesUserOwnPost = (userID, postID) => {
    const post = Post.findById(postID)
    if(!post) return false

    return userID.equals(post.user)
}