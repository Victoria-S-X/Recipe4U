const helpers = require("./helpers")
const ResCode = helpers.ResCode
const getPost = require("./post").getPost
const Course = require("./models/course")


exports.create = async (userID, strPostID, meetingLink, start, duration, city, address, maxAttendees) => {

	//valid postID?
	const postID = helpers.idToObj(strPostID)
	if(!postID) return ResCode.BAD_INPUT

	//user owns post?
	const post = await getPost(postID)
	if(!post) return ResCode.NOT_FOUND
	if(!userID.equals(post.user)) return ResCode.UNAUTHORIZED


	const course = new Course({
		userID: userID,
		postID: postID,
		meetingLink: meetingLink,
		start: start,
		duration: duration,
		city: city,
		address: address,
		attendees: [],
		maxAttendees: maxAttendees
	})

	try{
		await course.save()

		return ResCode.SUCCESS
	} catch (err){
		if(err instanceof helpers.ValidationError){
			console.log(err)
			return ResCode.BAD_INPUT
		}

		console.log(err)
		return ResCode.ERROR
	}
}


exports.getFromPost = async (strPostID) => {
	const postID = helpers.idToObj(strPostID)
	if(!postID) return ResCode.BAD_INPUT

	return Course.find({postID: postID})
}