const app = require("../expressApp")
const courseData = require("../../db/course")
const ResCode = require("../../db/helpers").ResCode
const auth = require("../auth")



//CREATE course
app.post("/api/v1/posts/:id/courses", auth, async (req, res) => {

    

    //TODO: get post - verify user is owner of post

    const resCode = await courseData.create(
        req.strUserID,
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
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Bad input"})
            break
    
        default:
            res.status(500).json({message: "Failed to create course"})
            break
    }
})


//GET course
app.get("/api/v1/courses/:id", async (req, res) => {
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
app.get("/api/v1/courses", auth, async (req, res) => {

    //should not return null as req.strUserID is verified as valid in the authentication
    const courses = await courseData.getFromUser(req.strUserID)

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


//REMOVES all courses created by the logged in user
app.delete("/api/v1/courses", auth, async (req, res) => {
    const resCode = await courseData.deleteCourses(req.strUserID)

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
app.delete("/api/v1/courses/:id", auth, async (req, res) => {
    const resCode = await courseData.deleteCourse(req.params.id, req.strUserID)

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


