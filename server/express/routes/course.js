const router = require("../expressApp").Router("/api/v1/courses")
const courseData = require("../../db/course")
const {ResCode} = require("../../db/helpers")
const auth = require("../auth")



//GET courses posted by logged in user
router.get("/posted", auth, async (req, res) => {

    const courses = await courseData.getFromUser(req.userID)

    if(!courses){
        res.status(500).json({message: "Something went wrong"})
        return
    }

    const result = []

    for(const course of courses){
        result.push(
            course
        )
    }

    res.status(200).json(result)
})


//GET course
router.get("/:id", async (req, res) => {
    const course = await courseData.get(req.params.id)
    if(!course) {
        res.status(404).json({message: "Course not found"})
        return
    }
    
    res.status(200).json(
        course
    )
})


//UPDATES the specified course
router.put("/:id", auth, async (req, res) => {
    const response = await courseData.put({
        strCourseID: req.params.id,
        userID: req.userID,
        strPostID: req.body?.postID,
        meetingLink: req.body?.meetingLink,
        start: req.body?.start,
        duration: req.body?.duration,
        city: req.body?.city,
        address: req.body?.address,
        maxAttendees: req.body?.maxAttendees
    })

    switch(response.resCode){
        case ResCode.SUCCESS:
            res.status(200).json(response?.data)
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({
                message: "Bad input",
                error: response?.data
            })
            break
        case ResCode.UNAUTHORIZED:
            res.status(401).json({message: "User does not own post"})
            break
        case ResCode.NOT_FOUND_1:
            res.status(404).json({message: `Post '${response.data}' not found`})
            break

        default:
            res.status(500).json({message: `Internal server error. Code ${response.resCode.number}}`})
    }
})


//REMOVES all courses created by the logged in user
router.delete("/", auth, async (req, res) => {
    const response = await courseData.deleteCourses(req.userID)

    switch(response.resCode) {
        case ResCode.SUCCESS:
            res.status(200).json({
                message: "Successful deletion",
                amtDeleted: response?.amtDeleted
            })
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({
                message: "Bad input",
                error: response?.error
            })
            break
        case ResCode.NOT_FOUND:
            res.status(200).json({
                message: "No courses to delete",
                amtDeleted: response?.amtDeleted
            })
            break

        default:
            res.status(500).json({
                message: "Internal server error",
                error: response?.error
            })
            break
    }

})


//REMOVES course
router.delete("/:id", auth, async (req, res) => {
    const response = await courseData.deleteCourse(req.params.id, req.userID)

    switch(response.resCode) {
        case ResCode.SUCCESS:
            res.status(200).json({message: `Successful deletion`})
            break
        case ResCode.BAD_INPUT:
            res.status(400).json({
                message: "Bad input",
                error: response?.error
            })
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


