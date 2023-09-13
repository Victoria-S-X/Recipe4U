const { ResCode, idToObj } = require("./helpers")
const Post = require("./models/post")

exports.getPost = async (postID) => {
    return await Post.findById(postID)
}


exports.postValidation = async (userID, strPostID) => {
    //valid postID?
    const postID = idToObj(strPostID)
    if(!postID) return ResCode.BAD_INPUT

    //post exists?
    const post = await Post.findById(postID)
    if(!post) return ResCode.NOT_FOUND

    //user owns post?
    if(!userID.equals(post.user)) return ResCode.UNAUTHORIZED

    return {
        resCode: ResCode.SUCCESS,
        postID: postID
    }
}