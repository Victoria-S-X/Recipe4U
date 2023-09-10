const mongoose = require("../db").mongoose
const helpers = require("./helpers")
const ResCode = helpers.ResCode
const removeAttendance = require("./user").removeAttendance


const schema = new mongoose.Schema({
    userID: String,
    postID: String,
    meetingLink: String,
    start: Date,
    duration: Number,
    city: String,
    address: String,
	attendees: [mongoose.Schema.Types.ObjectId],
	maxAttendees: Number
})

const Course = mongoose.model("Course", schema)



exports.create = async (userID, postID, meetingLink, start, duration, city, address, maxAttendees) => {
	if(!userID || !postID || !maxAttendees) return ResCode.MISSING_ARGUMENT

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

exports.getFromUser = async (strUserID) => {
	const userID = helpers.idToObj(strUserID)
    if(!userID) return

	return Course.find({userID: userID})
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
		else return ResCode.NOT_FOUND_1
	}
	else return ResCode.NOT_FOUND
}


exports.update = async (strID, meetingLink, start, duration, city, address, maxAttendees) => {
	const id = helpers.idToObj(strID)
    if(!id) return ResCode.MISSING_ARGUMENT

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


exports.deleteCourses = async (strUserID) => {
	const userID = helpers.idToObj(strUserID)
    if(!userID) return ResCode.BAD_INPUT

	const courses = await Course.find({userID: userID})
	if(!courses) return ResCode.NOT_FOUND

	let resCode = ResCode.SUCCESS
	for(const course of courses){

		//complete deletion FIRST so that ALL users will be removed AFTER course it deleted
		//response code does not need to be saved, if it is fails, the course has already been deleted
		await Course.findByIdAndDelete(course._id)

		//removes attendance from the users´ profiles
		for(const attendee of course.attendees){
			const attendanceRmResCode = await removeAttendance(attendee, course._id)
			if(attendanceRmResCode != ResCode.SUCCESS) resCode = attendanceRmResCode
		}
	}

	return resCode
}
