const router = require("../routers").post
const auth = require("../authMiddleware")
const {ResCode, sort} = require("../db/helpers")
const postsCourses = require("../db/controllers/postsCourses")


//CREATE course
router.post("/:id/courses", auth, async (req, res) => {

    const start = new Date(req.body?.start)

    const response = await postsCourses.create(
        req.userID,
        req.params.id,
        req.body?.meetingLink,
        start,
        req.body?.duration,
        req.body?.city,
        req.body?.address,
        req.body?.maxAttendees
    )

    switch(response.resCode){
        case ResCode.SUCCESS:
            res.status(201).json(response.data)
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
            res.status(500).json({
                message: "Failed to create course",
                code: response?.resCode,
                error: response?.data
            })
            break
    }
})


router.get("/:id/courses", auth, async (req, res) => {
    const response = await postsCourses.getAllFromPost(req.params.id, req.query.filter)

    sort(req.query.sort, response.data)

    switch(response.resCode){
        case ResCode.BAD_INPUT:
            res.status(400).json({message: "Post ID is invalid"})
            break
        case ResCode.NOT_FOUND:
            res.status(404).json({message: "Course not found"})
            break
        case ResCode.SUCCESS:
            res.status(200).json(response.data)
            break

        default:
            res.status(500).json({message: "Internal server error"})
            break

    }
})