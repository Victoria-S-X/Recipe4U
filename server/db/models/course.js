const mongoose = require("../db").mongoose

const schema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    postID: mongoose.Schema.Types.ObjectId,
    meetingLink: String,
    start: Date,
    duration: Number,
    city: String,
    address: String,
	attendees: [mongoose.Schema.Types.ObjectId],
	maxAttendees: Number
})

module.exports = mongoose.model("Course", schema)