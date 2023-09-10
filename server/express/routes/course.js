const app = require("../expressApp")
const courseModel = require("../../models/course")
const ResCode = require("../../models/helpers").ResCode
const auth = require("../auth")


//CREATE course
app.post("/api/v1/posts/:id/courses", auth, async (req, res) => {

    //TODO: get post - verify user is owner of post

    const resCode = await courseModel.create(
        req.userID,
        req.params.id,
        req.body?.meetingLink,
        req.body?.start,
        req.body?.duration,
        req.body?.city,
        req.body?.address,
        req.body?.maxAttendees
    )

    switch(resCode){
        case ResCode.SUCCESS:
            res.status(201).json({message: "Course created"})
            break
        case ResCode.MISSING_ARGUMENT:
            res.status(400).json({message: "Missing parameters"})
            break
    
        default:
            res.status(500).json({message: "Failed to create course"})
            break
    }
})


//GET course
app.get("/api/v1/courses/:id", async (req, res) => {
    const course = await courseModel.get(req.params.id)
    if(!course) {
        res.status(404).json({message: "Course not found"})
        return
    }
    
    res.status(200).json(
        publicParams(course)
    )
})


//GET courses posted by logged in user
app.get("/api/v1/courses", auth, async (req, res) => {
    const courses = await courseModel.getFromUser(req.userID)

    const result = []

    for(const course of courses){
        result.push(
            publicParams(course)
        )
    }

    res.status(200).json(result)
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
app.put("/api/v1/courses/:id", auth, async (req, res) => {
    
})

//REMOVES courses
app.delete("/api/v1/courses/:id", auth, async (req, res) => {
    const resCode = await courseModel.deleteCourse(req.params.id, req.userID)

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
            res.status(403).json({message: "User is not authorized to delete course"})
            break

        default:
            res.status(500).json({message: "Internal server error"})
            break
    }
})



//REMOVES all courses created by the logged in user
app.delete("/api/v1/courses", auth, async (req, res) => {
    const resCode = await courseModel.deleteCourses(req.userID)

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