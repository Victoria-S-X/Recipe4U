const helpers = require("./helpers")
const ResCode = helpers.ResCode
const userModel = require("./user")
const courseModel = require("./course")



exports.attend = async (strUserID, strCourseID) => {

	const userID = helpers.idToObj(strUserID)
    const courseID = helpers.idToObj(strCourseID)
    if(!userID || !courseID) return ResCode.MISSING_ARGUMENT

    let resCode = await courseModel.addAttendee(courseID, userID)
    if(resCode !== ResCode.SUCCESS) return resCode

    resCode = await userModel.addAttendance(userID, courseID)
    if(resCode === ResCode.ERROR) return courseModel.removeAttendee(courseID, userID)

    return resCode
}




exports.leave = async (strUserID, strCourseID) => {
    const userID = helpers.idToObj(strUserID)
    const courseID = helpers.idToObj(strCourseID)
    if(!userID || !courseID) return ResCode.MISSING_ARGUMENT

    return await exports.leave(userID, courseID)
}

exports.leaveObjID = async (userID, courseID) => {
    const resCodeCourse = await courseModel.removeAttendee(courseID, userID)
    if(resCodeCourse === ResCode.ERROR) return resCodeCourse

    const resCodeUser = await userModel.removeAttendance(userID, courseID)
    if(resCodeUser === ResCode.SUCCESS) return resCodeCourse
    else return resCodeUser
}