const mongoose = require("../db").mongoose
const helpers = require("./helpers")
const ResCode = helpers.ResCode


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
		$expr: { $lt: [{ $size: '$attendees' }, '$maxAttendees'] } //inspired by ChatGPT
	}
	const operation = {
		$push: { attendees: userID }
	}

	try{
		const success = await Course.findOneAndUpdate(criteria, operation, { new: true })

		if(success) return ResCode.SUCCESS
		else{
			if(Course.findById(courseID)) return ResCode.ALREADY_FULL
			else return ResCode.NOT_FOUND
		}

	} catch(err){
		console.error(err)
		return ResCode.ERROR
	}
}


exports.deleteCourses = async (strUserID) => {
	const userID = helpers.idToObj(strUserID)
    if(!userID) return

	return Course.deleteMany({userID: userID})
}
