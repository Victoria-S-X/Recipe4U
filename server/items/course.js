const mongoose = require("../db").mongoose

const schema = new mongoose.Schema({
    meetingLink: String,
    start: Date,
    duration: Number,
    city: String,
    address: String
})

const Course = mongoose.model("Course", schema)

