const helpers = require("./helpers")
const ResCode = helpers.ResCode
const userModel = require("./models/user")
const courseModel = require("./models/course")



exports.attend = async (userID, strCourseID) => {

    //valid IDs?
    const courseID = helpers.idToObj(strCourseID)
    if(!courseID) return ResCode.BAD_INPUT

    //adds to attendance list in course
    let resCode = await courseModel.addAttendee(courseID, userID)
    if(resCode !== ResCode.SUCCESS) return resCode

    //adds to attendance list in user
    resCode = await userModel.addAttendance(userID, courseID)
    //prevents half-attending user if an issue occurs
    if(resCode === ResCode.ERROR) return courseModel.removeAttendee(courseID, userID)

    return resCode
}


exports.leave = async (userID, strCourseID) => {

    //valid IDs?
    const courseID = helpers.idToObj(strCourseID)
    if(!userID) return ResCode.BAD_INPUT

    return await exports.leaveObjID(userID, courseID)
}


exports.leaveObjID = async (userID, courseID) => {
    
    //removes from course attendance list
    const resCodeCourse = await courseModel.removeAttendee(courseID, userID)
    if(resCodeCourse === ResCode.ERROR) return ResCode.ERROR //not used now but safest to keep

    //removes from user attendance list
    const resCodeUser = await userModel.removeAttendance(userID, courseID)

    //returns error no matter which part it occurs in
    if(resCodeUser === ResCode.SUCCESS) return resCodeCourse
    else return resCodeUser
}