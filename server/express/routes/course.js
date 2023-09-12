const router = require("../expressApp").Router("/api/v1/courses")
const courseData = require("../../db/course")
const ResCode = require("../../db/helpers").ResCode
const auth = require("../auth")



//GET course
router.get("/:id", async (req, res) => {
    const course = await courseData.get(req.params.id)
    if(!course) {
        res.status(404).json({message: "Course not found"})
        return
    }
    
    res.status(200).json(
        publicParams(course)
    )
})


//GET courses posted by logged in user
router.get("/", auth, async (req, res) => {

    const courses = await courseData.getFromUser(req.userID)

    if(!courses){
        res.status(500).json({message: "Something went wrong"})
        return
    }

    const result = []

    for(const course of courses){
        result.push(
            publicParams(course)
        )
    }

    res.status(200).json(result)
})


router.get("/", async (req, res) => {
    
})


function publicParams(course){
    return {
        meetingLink: course?.meetingLink,
        start: course?.start,
        duration: course?.duration,
        city: course?.city,
        address: course?.address,
        maxAttendees: course?.maxAttendees
    }
}


//UPDATES the specified course
router.put("/:id", auth, async (req, res) => {
    
})


//REMOVES all courses created by the logged in user
router.delete("/", auth, async (req, res) => {
    const resCode = await courseData.deleteCourses(req.userID)

    switch(resCode) {
        case ResCode.SUCCESS:
            res.status(200).json({message: `Successful deletion`})
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Bad input"})
            break
        case ResCode.NOT_FOUND:
            res.status(200).json({message: "No courses to delete"})
            break

        default:
            res.status(500).json({message: "Internal server error"})
            break
    }

})


//REMOVES course
router.delete("/:id", auth, async (req, res) => {
    const resCode = await courseData.deleteCourse(req.params.id, req.userID)

    switch(resCode) {
        case ResCode.SUCCESS:
            res.status(200).json({message: `Successful deletion`})
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Bad input"})
            break
        case ResCode.NOT_FOUND:
            res.status(404).json({message: "Course does not exist"})
            break
        case ResCode.UNAUTHORIZED:
            res.status(401).json({message: "User is not authorized to delete course"})
            break

        default:
            res.status(500).json({message: "Internal server error"})
            break
    }
})


