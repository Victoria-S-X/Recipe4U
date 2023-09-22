const {idToObj, ResCode} = require("./helpers")
const {removeAttendance} = require("./attendance/user")
const {postValidation} = require("./post")
const Course = require("./models/course")
const createCourse = require("./postsCourses").create


exports.get = async (strID) => {
    const id = idToObj(strID)
    if(!id) return

    return Course.findById(id)
}


//posted by user
exports.getFromUser = async (userID) => {
	return Course.find({userID: userID})
}


exports.put = async ({strCourseID, userID, strPostID, meetingLink, start, duration, city, address, maxAttendees}) => {

	//valid courseID?
	const courseID = idToObj(strCourseID)
    if(strCourseID && !courseID) return {
		resCode: ResCode.BAD_INPUT,
		data: "Invalid course ID"
	}

	//valid post?
	const postResponse = await postValidation(userID, strPostID)
	if(postResponse.resCode !== ResCode.SUCCESS) return postResponse


	//create course if it does not exist
	const course = await Course.findById(courseID)
	if(!course) return createCourse(userID, strPostID, meetingLink, start, duration, city, address, maxAttendees, courseID)

	try{
		course.meetingLink = meetingLink
		course.start = start
		course.duration = duration
		course.city = city
		course.address = address
		course.maxAttendees = maxAttendees
		course.postID = postResponse.postID

		await course.save()

		return {
			resCode: ResCode.SUCCESS,
			data: course
		}
	} catch(err){
		const badVariables = Object.keys(err?.errors)
		return {
			resCode: ResCode.BAD_INPUT,
			data: err,
			badProperties: badVariables
		}
	}
}


//deletes all courses from a user
exports.deleteCourses = async (userID) => {

	//has courses?
	const courses = await Course.find({userID: userID})
	if(!courses || courses.length === 0) return {
		resCode: ResCode.NOT_FOUND,
		amtDeleted: 0
	}

	let resCodeResult = {
		resCode: ResCode.SUCCESS,
		amtDeleted: 0
	}
	for(const course of courses){
		const resCode = await exports.deleteCourseObjID(course._id)
		if(resCode != ResCode.SUCCESS && resCode != ResCode.NOT_FOUND) //ResCode.NOT_FOUND does not indicate error
			resCodeResult.resCode = resCode.resCode 
		else
			resCodeResult.amtDeleted++
	}

	return resCodeResult
}


exports.deleteCourse = async (strCourseID, userID) => {

	//valid courseID?
	const courseID = idToObj(strCourseID)
	if(!courseID) return {
		resCode: ResCode.BAD_INPUT,
		error: "Invalid course ID"
	}

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
	var resCodeResult = ResCode.SUCCESS
	for(const attendee of course.attendees){
		const resCode = await removeAttendance(attendee, course._id)
		if(resCode != ResCode.SUCCESS) {
			resCodeResult = {
				resCode: resCode,
				data: "Failed to remove attendance from user(s)"
			}

		}	
	}

	return resCodeResult
}
