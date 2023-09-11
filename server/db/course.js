const helpers = require("./helpers")
const ResCode = helpers.ResCode
const removeAttendance = require("./models/user").removeAttendance
const getPost = require("./post").getPost
const Course = require("./models/course")



function missingField(userID, strPostID, maxAttendees, start){
	return !userID || !strPostID || !maxAttendees //TODO: || !start
}


exports.create = async (userID, strPostID, meetingLink, start, duration, city, address, maxAttendees) => {

	//has needed data?
	if(missingField(userID, strPostID, maxAttendees, start)) return ResCode.MISSING_ARGUMENT

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
		console.log(err)
		return ResCode.ERROR
	}
}


exports.get = async (strID) => {
    const id = helpers.idToObj(strID)
    if(!id) return

    return Course.findById(id)
}


//posted by user
exports.getFromUser = async (userID) => {
	return Course.find({userID: userID})
}


exports.getFromPost = async (strPostID) => {
	const postID = helpers.idToObj(strPostID)
	if(!postID) return ResCode.BAD_INPUT

	return Course.find({postID: postID})
}


exports.addAttendee = async (courseID, userID) => {
	const criteria = {
		_id: courseID,
		$expr: { $lt: [{ $size: '$attendees' }, '$maxAttendees'] }, //attendees not full (inspired by ChatGPT)
		attendees: { $not: { $elemMatch: { $eq: userID } } } //user has not already signed up to course (inspired by ChatGPT)
	}
	const operation = {
		$push: { attendees: userID }
	}

	try{
		const success = await Course.findOneAndUpdate(criteria, operation, { new: true })

		if(success) return ResCode.SUCCESS
		else {
			const course = await Course.findById(courseID)

			if(course) {
				if(course.attendees.length == course.maxAttendees) return ResCode.ALREADY_FULL
				else if(course.attendees.includes(userID)) return ResCode.ITEM_ALREADY_EXISTS
				else return ResCode.ERROR
			}
			else return ResCode.NOT_FOUND
		}

	} catch(err){
		console.error(err)
		return ResCode.ERROR
	}
}


exports.removeAttendee = async (courseID, userID) => {
	const course = await Course.findByIdAndUpdate(
		courseID, 
		{ $pull: { attendees: userID } }
	)

	if(course){
		if(course.attendees.includes(userID)) return ResCode.SUCCESS
		else return ResCode.NOT_FOUND_1 //user was never attending the course
	}
	else return ResCode.NOT_FOUND //course not found
}


exports.update = async (strCourseID, userID, strPostID, meetingLink, start, duration, city, address, maxAttendees) => {

	//has mandatory fields?
	if(missingField(userID, strPostID, maxAttendees, start)) return ResCode.MISSING_ARGUMENT

	//valid IDs?
	const [courseID, postID] = helpers.idsToObjs([strCourseID, strPostID])
    if(!courseID) return ResCode.BAD_INPUT

	const update = {
        meetingLink: meetingLink,
        start: start,
        duration: duration,
        city: city,
        address: address,
        maxAttendees: maxAttendees
    }

	try{
		const item = await Course.findOneAndUpdate(id, update, { new: true })

		if(item) return ResCode.SUCCESS
		else return ResCode.NOT_FOUND

	} catch(err){
		console.error(err)
		return ResCode.ERROR
	}
}


//deletes all courses from a user
exports.deleteCourses = async (userID) => {

	//has courses?
	const courses = await Course.find({userID: userID})
	if(!courses) return ResCode.NOT_FOUND


	let resCodeResult = ResCode.SUCCESS
	for(const course of courses){
		const resCode = exports.deleteCourseObjID(course._id)
		if(resCode != ResCode.SUCCESS && resCode != ResCode.NOT_FOUND) //ResCode.NOT_FOUND does not indicate error
			resCode = resCode 
	}

	return resCodeResult
}


//DOES NOT AUTHENTICATE USER
exports.deleteCoursesFromPost = async (postID) => {
	try{
		await Course.deleteMany({postID: postID})
		return ResCode.SUCCESS
	} catch(err){
		console.error(err)
		return ResCode.ERROR
	}
}


exports.deleteCourse = async (strCourseID, userID) => {

	//valid courseID?
	const courseID = helpers.idToObj(strCourseID)
	if(!courseID) return ResCode.BAD_INPUT

	//course exists?
	const course = await Course.findById(courseID)
	if(!course) return ResCode.NOT_FOUND
	
	//course belongs to user?
	if(!userID.equals(course.userID)) return ResCode.UNAUTHORIZED

	return exports.deleteCourseObjID(courseID)
}


exports.deleteCourseObjID = async (courseID) => {

	//complete deletion FIRST so that ALL users will be removed AFTER course it deleted
	//response code does not need to be saved, if it is fails, the course has already been deleted
	const course = await Course.findByIdAndDelete(courseID)
	if(!course) return ResCode.NOT_FOUND


	//removes attendance from the users´ profiles
	let resCodeResult = ResCode.SUCCESS
	for(const attendee of course.attendees){
		const resCode = await removeAttendance(attendee, course._id)
		if(resCode != ResCode.SUCCESS) resCode = resCode
	}

	return resCodeResult
}
