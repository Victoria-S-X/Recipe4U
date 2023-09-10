const mongoose = require("../db").mongoose
const helpers = require("./helpers")
const user = require("./user")
const course = require("./course")

//add attendee amt > max attendee as criteria
modeul.attend = async (strUserID, strCourseID) => {
	const userID = helpers.idToObj(strUserID)
    const courseID = helpers.idToObj(strCourseID)
    

}
