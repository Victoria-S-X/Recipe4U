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

    for(let course of courses){
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



//REMOVES all courses created by the logged in user
app.delete("/api/v1/courses", auth, async (req, res) => {
    const courses = await courseModel.getFromUser(req.userID)

    for(let course of courses){
        for(let attendee of course.attendees){

        }
    }

    const result = await courseModel.deleteCourses(req.userID + "REMOVE ME AFTER TESTING")

    res.status(200).json({message: `Success. ${result.deletedCount} courses deleted`})
})