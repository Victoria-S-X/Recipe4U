const User = require("../models/user")
const helpers = require("../helpers")
const ResCode = helpers.ResCode


exports.addAttendance = async (userID, courseID) => {
	const affected = await User.findByIdAndUpdate(userID, {
		$push: { attends: courseID }
	})

	if(affected) return ResCode.SUCCESS
	else return ResCode.ERROR
}


exports.removeAttendance = async (userID, courseID) => {
	const affected = await User.findByIdAndUpdate(userID, {
		$pull: { attends: courseID }
	})

	if(affected) return ResCode.SUCCESS
	else return ResCode.ERROR
}