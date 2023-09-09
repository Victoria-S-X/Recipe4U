const app = require("../expressApp")
const courseItem = require("../../items/course")
const auth = require("./auth")


//CREATE course
app.post("/api/v1/posts/:id/courses", auth, async (req, res) => {

    //TODO: get post - verify user is owner of post

    const resCode = await courseItem.create(
        req.userID,
        req.params.id,
        req.body?.meetingLink,
        req.body?.start,
        req.body?.duration,
        req.body?.city,
        req.body?.address
    )

    switch(resCode){
        case courseItem.SUCCESS:
            res.status(201).json({message: "Course created"})
            break
        case courseItem.MISSING_ARGUMENT:
            res.status(400).json({message: "Missing parameters"})
            break
    
        default:
            res.status(500).json({message: "Failed to create course"})
            break
    }
})


//GET course
app.get("/api/v1/courses/:id", async (req, res) => {
    const course = await courseItem.get(req.params.id)
    if(!course) {
        res.status(404).json({message: "Course not found"})
        return
    }
    
    res.status(200).json({
        meetingLink: course?.meetingLink,
        start: course?.start,
        duration: course?.duration,
        city: course?.city,
        address: course?.address 
    })
})


//GET courses posted by logged in user
app.get("/api/v1/courses", auth, async (req, res) => {
    const courses = await courseItem.getFromUser(req.userID)

    const result = []

    for(let course of courses){
        result.push({
            meetingLink: course?.meetingLink,
            start: course?.start,
            duration: course?.duration,
            city: course?.city,
            address: course?.address 
        })
    }

    res.status(200).json(result)
})


//REMOVES all courses created by the logged in user
app.delete("/api/v1/courses", auth, async (req, res) => {
    const result = await courseItem.deleteCourses(req.userID)

    res.status(200).json({message: `Success. ${result.deletedCount} courses deleted`})
})