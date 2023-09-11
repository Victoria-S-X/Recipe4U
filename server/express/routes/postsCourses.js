const router = require("../expressApp").Router("/api/v1/posts")
const ResCode = require("../../db/helpers").ResCode


//CREATE course
router.post("/:id/courses", auth, async (req, res) => {

    const resCode = await courseData.create(
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
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Bad input"})
            break
        case ResCode.UNAUTHORIZED:
            res.status(403).json({message: "User does not own post"})
    
        default:
            res.status(500).json({message: "Failed to create course"})
            break
    }
})