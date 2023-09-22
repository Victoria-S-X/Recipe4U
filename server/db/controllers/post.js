const { ResCode, idToObj } = require("../helpers")

const Post = require("../models/post")
const Review = require("../models/review")



exports.get = async (postID) => {
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
    if(!post) return {
        resCode: ResCode.NOT_FOUND,
        error: `Post ${postID} not found`
    }

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


//DOESN'T AUTHENTICATE USER
exports.delete = async (post) => {

    try{
        await Review.deleteMany({ post: post.id })
        await post.deleteOne()

        return await require("./postsCourses").deleteCoursesFromPost(post.id)
    } catch(err) {
        return {
            resCode: ResCode.ERROR,
            error: err.message
        }
    }
}