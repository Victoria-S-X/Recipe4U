const app = require("../expressApp")
const course = require("../../items/course")
const auth = require("./auth")


//GET courses posted by logged in user
app.get("/api/v1/courses", auth, (req, res) => {

})


app.post("/api/v1/posts/:id/courses", auth, async (req, res) => {

    //TODO: get post - verify user is owner of post

    const resCode = await course.create(
        req.params.id,
        req.body?.meetingLink,
        req.body?.start,
        req.body?.duration,
        req.body?.city,
        req.body?.address
    )

    switch(resCode){
        case course.SUCCESS:
            res.status(201).json({message: "Course created"})
            break
        case course.MISSING_ARGUMENT:
            res.status(400).json({message: "Missing parameters"})
            break
    
        default:
            res.status(500).json({message: "Failed to create course"})
            break
    }
})