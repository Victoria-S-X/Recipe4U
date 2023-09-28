const { idToObj, ResCode } = require("../helpers")
const Review = require("../models/review")
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError


exports.create = async ({text, strPostID, rating, userID, reviewID=null}) => {

    //valid postID?
    const postID = idToObj(strPostID)
    if(!postID) return {
        resCode: ResCode.BAD_INPUT,
        error: "Invalid post ID"
    }

    //post exists?
    const post = await require("./post").get(postID)
    if(!post) return {
        resCode: ResCode.NOT_FOUND,
        error: "Post not found"
    }
    
    const review = new Review({
        text: text, 
        post: postID,
        rating: rating,
        user: userID,
    })

    try{
        if(reviewID) review._id = reviewID

        await review.save()
        await post.reviews.push(review)
        await post.save()

        return {
            resCode: ResCode.SUCCESS,
            data: review
        }
    } catch(err){
        if(err instanceof ValidationError){
			return {
				resCode: ResCode.BAD_INPUT,
				data: err
			}
		} else {
            console.log(err)
            return ResCode.ERROR
        }
    }
}


exports.put = async ({text, strPostID, rating, userID, id}) => {

    //has postID?
    if(!strPostID) return {
        resCode: ResCode.MISSING_ARGUMENT,
        error: "Missing post ID"
    }

    //valid postID?
    const postID = idToObj(strPostID)
    if(!postID) return {
        resCode: ResCode.BAD_INPUT,
        error: "Invalid post ID"
    }

    //valid reviewID?
    const reviewID = idToObj(id)
    if(!reviewID) return {
        resCode: ResCode.BAD_INPUT,
        error: "Invalid review ID"
    }

    //review exists?
    const review = await Review.findById(reviewID)
    if(!review) return await exports.create({text, strPostID, rating, userID, reviewID})

    //user owns review?
    if(!userID.equals(review.user)) return {
        resCode: ResCode.UNAUTHORIZED,
        error: "User does not own review"
    }

    console.log(postID, review.post, "mfaeeaoigboae")
    //postID matches review?
    if(!postID.equals(review.post)) return {
        resCode: ResCode.BAD_INPUT,
        error: "Post ID does not match review"
    }

    //update review
    try {
        review.text = text
        review.rating = rating
        await review.save()

        return {
            resCode: ResCode.SUCCESS,
            data: review
        }
    } catch(err){
        if(err instanceof ValidationError){
            return {
                resCode: ResCode.BAD_INPUT,
                data: err
            }
        } else {
            console.log(err)
            return ResCode.ERROR
        }
    }
}