const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post",
    },
    meetingLink: String,
    start: {
        type: Date,
        required: true,
    },
    duration: Number,
    city: String,
    address: String,
	attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
	maxAttendees: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Course", schema)