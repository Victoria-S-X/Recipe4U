const router = require("../expressApp").Router("/api/v1/")

const auth = require("../auth")
const attendance = require("../../db/attendance")
const ResCode = require("../../db/helpers").ResCode


//UPDATES attendance status for logged in user to provided course
router.patch("/attend/:courseID", auth, async (req, res) => {
    const resCode = await attendance.attend(req.userID, req.params.courseID)

    switch(resCode) {
        case ResCode.SUCCESS: 
            res.status(200).json({message: `Attendance updated`})
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Bad input"})
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

//UPDATES attendance status for logged in user to leave provided course
router.patch("/leave/:courseID", auth, async (req, res) => {
    const resCode = await attendance.leave(req.userID, req.params.courseID)

    switch(resCode) {
        case ResCode.SUCCESS: 
            res.status(200).json({message: `Removed from course`})
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Bad input"})
            break
        case ResCode.NOT_FOUND:
            res.status(404).json({message: "Course not found"})
            break
        case ResCode.NOT_FOUND_1:
            res.status(200).json({message: "Already removed"})
            break

        default:
            res.status(500).json({message: `Server error. Code ${resCode}`})
            break
    }
})
