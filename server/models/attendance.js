const mongoose = require("../db").mongoose
const helpers = require("./helpers")
const ResCode = helpers.ResCode
const userModel = require("./user")
const courseModel = require("./course")

//add attendee amt > max attendee as criteria
exports.attend = async (strUserID, strCourseID) => {

	const userID = helpers.idToObj(strUserID)
    const courseID = helpers.idToObj(strCourseID)
    if(!userID || !courseID) return ResCode.MISSING_ARGUMENT

    const resCode = await courseModel.addAttendee(courseID, userID)
    if(resCode != ResCode.SUCCESS) return resCode



    return ResCode.SUCCESS
}
