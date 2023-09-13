const { ResCode, idToObj } = require("./helpers")
const Post = require("./models/post")

exports.getPost = async (postID) => {
    return await Post.findById(postID)
}


exports.postValidation = async (userID, strPostID) => {
    //valid postID?
    const postID = idToObj(strPostID)
    if(!postID) return {
        resCode: ResCode.BAD_INPUT,
        error: "Invalid postID"
    }

    //post exists?
    const post = await Post.findById(postID)
    if(!post) return ResCode.NOT_FOUND

    //user owns post?
    if(!userID.equals(post.user)) return {
        resCode: ResCode.UNAUTHORIZED,
        error: "User does not own post"
    }

    return {
        resCode: ResCode.SUCCESS,
        postID: postID
    }
}