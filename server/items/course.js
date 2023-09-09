const mongoose = require("../db").mongoose
const helpers = require("./helpers")


const SUCCESS = 0
const ERROR = 1
const MISSING_ARGUMENT = 2


const schema = new mongoose.Schema({
    userID: String,
    postID: String,
    meetingLink: String,
    start: Date,
    duration: Number,
    city: String,
    address: String
})

const Course = mongoose.model("Course", schema)



const create = async (userID, postID, meetingLink, start, duration, city, address) => {
	if(!userID || !postID) return MISSING_ARGUMENT

	const course = new Course({
		userID: userID,
		postID: postID,
		meetingLink: meetingLink,
		start: start,
		duration: duration,
		city: city,
		address: address
	})

	try{
		await course.save()

		return SUCCESS
	} catch (err){
		console.log(err)
		return ERROR
	}
}


const get = async (strID) => {
    const id = helpers.idToObj(strID)
    if(!id) return

    return Course.findById(id)
}

const getFromUser = async (strUserID) => {
	const userID = helpers.idToObj(strUserID)
    if(!userID) return

	return Course.find({userID: userID})
}


module.exports = {
    SUCCESS,
    ERROR,
    MISSING_ARGUMENT,
    create,
    get,
	getFromUser
}