const app = require("../expressApp")
const userItem = require("../../items/user")
const auth = require("../../auth")


app.post("/api/users", async (req, res) => {
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


app.get("/api/users/:username", async (req, res) => {

    //provided password?
    if(!req.body?.password){
        res.status(400).json({message: "Password missing"})
        return
    }

    //user exists?
    const username = req.params.username
    const user = await userItem.find(username)
    if(!user){
        res.status(404).json({message: "User does not exist"})
        return
    }

    //right password?
    const authenticated = await auth.match(req.body.password, user.password)
    if(authenticated){
        //return data
        res.status(200).json({
            email: user.email,
            username: user.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            age: user?.age
        })
    } else {
        res.status(401).json({message: "Wrong password"})
    }
    
})


app.patch("/api/users/:username", async (req, res) => {

    const success = await userItem.update(
        req.body?.email, 
        req.params.username, 
        req.body?.password, 
        req.body?.firstName, 
        req.body?.lastName, 
        req.body?.age 
    )

    if(success){
        res.status(200).json({message: "User updated successfully"})
    } else {
        res.status(404).json({message: "User does not exist"})
    }
})
