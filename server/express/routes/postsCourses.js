const router = require("./post")
const auth = require("../auth")
const ResCode = require("../../db/helpers").ResCode
const postsCourses = require("../../db/postsCourses")


//CREATE course
router.post("/:id/courses", auth, async (req, res) => {

    const resCode = await postsCourses.create(
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
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Bad input"})
            break
        case ResCode.UNAUTHORIZED:
            res.status(401).json({message: "User does not own post"})
            break
        case ResCode.NOT_FOUND:
            res.status(404).json({message: "Post not found"})
            break
    
        default:
            res.status(500).json({message: "Failed to create course"})
            break
    }
})


router.get("/:id/courses", auth, async (req, res) => {
    const response = await postsCourses.getFromPost(req.params.id)

    switch(response){
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Post ID is invalid"})
            break
        case ResCode.ERROR:
            res.status(500).json({message: "Internal server error"})
            break

        default:
            res.status(200).json(response)
            break
    }
})