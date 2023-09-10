const app = require("../expressApp")
const auth = require("../auth")
const attendanceModel = require("../../models/attendance")
const ResCode = require("../../models/helpers").ResCode


//UPDATES attendance status for logged in user to provided course
app.patch("/api/v1/attend/:courseID", auth, async (req, res) => {
    const resCode = await attendanceModel.attend(req.userID, req.params.courseID)

    switch(resCode) {
        case ResCode.SUCCESS: 
            res.status(200).json({message: `Attendance updated`})
            break
        case ResCode.MISSING_ARGUMENT:
            res.status(400).json({message: "Missing parameters"})
            break
        case ResCode.ALREADY_FULL:
            res.status(403).json({message: "Course is already full"})
            break
        case ResCode.NOT_FOUND:
            res.status(404).json({message: "Course not found"})
            break
        case ResCode.ITEM_ALREADY_EXISTS:
            res.status(403).json({message: "Already signed up to course"})
            break

        default:
            res.status(500).json({message: `Server error. Code ${resCode}`})
            break
    }
})