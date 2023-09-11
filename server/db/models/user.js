const mongoose = require("../db").mongoose


const schema = new mongoose.Schema({
	email: String,
	username: {
		type: String,
		unique: true
	},
	password: String, 
	firstName: String,
	lastName: String,
	age: Number,
	attends: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model('User', schema)
