const mongoose = require("../db").mongoose
const helpers = require("./helpers")
const ResCode = helpers.ResCode


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

const User = mongoose.model('User', schema)



exports.create = async (email, username, password, firstName, lastName, age) => {
	if(!email || !username || !password) return ResCode.MISSING_ARGUMENT

	const user = new User({
		email: email,
		username: username,
		password: password, 
		firstName: firstName,
		lastName: lastName,
		age: age,
		attends: []
	})

	try{
		await user.save()

		return ResCode.SUCCESS
	} catch (err){
		if(err.code == 11000) return ResCode.ITEM_ALREADY_EXISTS
		return ResCode.ERROR
	}
	}


	exports.find = async (username) => {
	return await User.findOne({ username:username })
}

exports.get = async (strID) => {
	const id = helpers.idToObj(strID)
	if(!id) return

	return User.findById(id)
}


exports.patch = async (strID, email, password, firstName, lastName, age) => {
	const id = idToObj(strID)
	const update = {}

	if(email !== undefined) update["email"] = email
	if(password !== undefined) update["password"] = password
	if(firstName !== undefined) update["firstName"] = firstName
	if(lastName !== undefined) update["lastName"] = lastName
	if(age !== undefined) update["age"] = age


	try{
		const item = await User.findOneAndUpdate(id, update, { new: true })

		if(item) return ResCode.SUCCESS
		else return ResCode.NOT_FOUND

	} catch(_){
		return ResCode.ERROR
	}
}

exports.addAttendance = async (userID, courseID) => {
	const success = await User.findByIdAndUpdate(userID, {
		$push: { attends: courseID }
	})

	if(success) return ResCode.SUCCESS
	else return ResCode.ERROR //TODO: remove item from course list
}