const {ResCode, idToObj} = require("../helpers")
const attendanceUser = require("./user")
const attendanceCourse = require("./course")



exports.attend = async (userID, strCourseID) => {

    //valid IDs?
    const courseID = idToObj(strCourseID)
    if(!courseID) return {
        resCode: ResCode.BAD_INPUT,
        error: "Invalid course ID"
    }

    //adds to attendance list in course
    let resCode = await attendanceCourse.addAttendee(courseID, userID)
    if(resCode !== ResCode.SUCCESS) return resCode

    //adds to attendance list in user
    resCode = await attendanceUser.addAttendance(userID, courseID)
    //prevents half-attending user if an issue occurs
    if(resCode === ResCode.ERROR) return attendanceCourse.removeAttendee(courseID, userID)

    return resCode
}


exports.leave = async (userID, strCourseID) => {

    //valid courseID?
    const courseID = idToObj(strCourseID)
    if(!courseID) return {
        resCode: ResCode.BAD_INPUT,
        error: "Invalid course ID"
    }

    return await exports.leaveObjID(userID, courseID)
}


exports.leaveObjID = async (userID, courseID) => {
    
    //removes from course attendance list
    const resCodeCourse = await attendanceCourse.removeAttendee(courseID, userID)
    if(resCodeCourse === ResCode.ERROR) return ResCode.ERROR //not used now but safest to keep

    //removes from user attendance list
    const resCodeUser = await attendanceUser.removeAttendance(userID, courseID)

    //returns error no matter which part it occurs in
    if(resCodeUser === ResCode.SUCCESS) return resCodeCourse
    else return resCodeUser
}