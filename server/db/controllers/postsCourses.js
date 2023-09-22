const {ResCode, idToObj, ValidationError} = require("../helpers")
const Course = require("../models/course")


exports.create = async (userID, strPostID, meetingLink, start, duration, city, address, maxAttendees, courseID=null) => {

	//valid post?
	const postResponse = await require("./post").postValidation(userID, strPostID)
	if(postResponse.resCode !== ResCode.SUCCESS) return postResponse

	const course = new Course({
		userID: userID,
		postID: postResponse.postID,
		meetingLink: meetingLink,
		start: start,
		duration: duration,
		city: city,
		address: address,
		attendees: [],
		maxAttendees: maxAttendees
	})

	
	try{
		if(courseID) course._id = courseID

		const data = await course.save()
		
		return {
			resCode: ResCode.SUCCESS,
			data: data
		}
	} catch (err){
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


exports.getFromPost = async (strPostID, requestedFilter) => {
	const postID = idToObj(strPostID)
	if(!postID) return ResCode.BAD_INPUT

	const filter = {
		postID: postID
	}

	if(requestedFilter === "notFull") filter.$expr = { $lt: [{ $size: '$attendees' }, '$maxAttendees'] } //inspired by ChatGPT

	const courses = await Course.find(filter)
	if(!courses) return ResCode.NOT_FOUND

	return {
		resCode: ResCode.SUCCESS,
		data: courses
	}
}


//DOES NOT AUTHENTICATE USER
exports.deleteCoursesFromPost = async (postID) => {
	try{
		await Course.deleteMany({postID: postID})
		return ResCode.SUCCESS
	} catch(err){
		return {
			resCode: ResCode.ERROR,
			error: "Failed to delete course from post"
		}
	}
}