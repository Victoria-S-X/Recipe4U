const router = require("../expressApp").Router("/api/v1/users")

const userData = require("../../db/user")
const auth = require("../../auth")
const authMiddleware = require("../auth")
const { ResCode, getResCode } = require("../../db/helpers")


// CREATE user
router.post("/", async (req, res) => {

    //hashes password
    const password = req.body?.password
    if(!password){
        res.status(422).json({message: "Missing password"})
        return
    }
    const hash = await auth.hash(password)


    const result = await userData.create(
        req.body?.email, 
        req.body?.username, 
        hash, 
        req.body?.firstName, 
        req.body?.lastName, 
        req.body?.age 
    )
    
    const resCode = getResCode(result)
    switch (resCode) {
        case ResCode.SUCCESS:
            res.status(201).json(result?.data)
            break
        case ResCode.ITEM_ALREADY_EXISTS:
            res.status(403).json({message: "Username is already taken"})
            break
        case ResCode.MISSING_ARGUMENT:
            res.status(422).json({message: "Missing parameters"})
            break
    
        default:
            res.status(500).json({message: "Failed to create account"})
            break
    }
})


// READ user info (for the logged in user)
router.get("/", authMiddleware, async (req, res) => {

    const user = await userData.get(req.userID)
    if(!user) {
        res.status(404).json({message: "User not found"})
        return
    }
    
    res.status(200).json({
        email: user.email,
        username: user.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        age: user?.age,
        _id: user._id
    })
})


// UPDATE user info (for the logged in user)
router.patch("/", authMiddleware, async (req, res) => {

    const resCode = await userData.patch(
        req.userID,
        req.body?.email, 
        req.body?.password, 
        req.body?.firstName, 
        req.body?.lastName, 
        req.body?.age 
    )

    switch(resCode){
        case ResCode.SUCCESS:
            res.status(200).json({message: "User updated successfully"})
            break
        case ResCode.NOT_FOUND:
            res.status(404).json({message: "User does not exist"})
            break
        default:
            res.status(500).json({message: "Internal server error"})
            break
    }
})
