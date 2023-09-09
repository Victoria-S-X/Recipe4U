const app = require("../expressApp")
const userItem = require("../../items/user")
const auth = require("../../auth")
const authMiddleware = require("./auth")


// CREATE user
app.post("/api/v1/users", async (req, res) => {
    const email = req.body?.email
    const username = req.body?.username
    const password = req.body?.password

    if(username && password && email){
        const hash = await auth.hash(password)

        const resCode = await userItem.create(
            email, 
            username, 
            hash, 
            req.body?.firstName, 
            req.body?.lastName, 
            req.body?.age 
        )

        switch (resCode) {
            case userItem.SUCCESS:
                res.status(201).json({message: "User created"})
                break
            case userItem.DUPLICATE_USER:
                res.status(400).json({message: "Username is already taken"})
                break
        
            default:
                res.status(500).json({message: "Failed to create account"})
                break
        }

    } else {
        res.status(400).json({message: "Missing parameters"})
    }
})


// READ user info (for the logged in user)
app.get("/api/v1/users/", authMiddleware, async (req, res) => {

    const user = await userItem.get(req.userID)
    if(!user) {
        res.status(404).json({message: "User not found"})
        return
    }
    
    res.status(200).json({
        email: user.email,
        username: user.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        age: user?.age
    })
})


// UPDATE user info (for the logged in user)
app.patch("/api/v1/users/", authMiddleware, async (req, res) => {

    const resCode = await userItem.update(
        req.userID,
        req.body?.email, 
        req.body?.password, 
        req.body?.firstName, 
        req.body?.lastName, 
        req.body?.age 
    )

    switch(resCode){
        case userItem.SUCCESS:
            res.status(200).json({message: "User updated successfully"})
            break
        case userItem.USER_NOT_FOUND:
            res.status(404).json({message: "User does not exist"})
            break
        default:
            res.status(500).json({message: "Internal server error"})
            break
    }
})
