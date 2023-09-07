const app = require("../expressApp")
const userItem = require("../../items/user")
const auth = require("../../auth")

app.post("/api/users", async (req, res) => {
    const email = req.body?.email
    const username = req.body?.username
    const password = req.body?.password
    const firstName = req.body?.firstName
    const lastName = req.body?.lastName
    const age = req.body?.age

    if(username && password && email){
        const hash = await auth.hash(password)

        const resCode = await userItem.create(
            email, username, hash, firstName, lastName, age 
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

//obviously a bad idea in production
app.get("/api/users/:username", async (req, res) => {
    const username = req.params.username
    const user = await userItem.find(username)

    const authenticated = await auth.match(req.body.password, user.password)

    if(authenticated){
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

//also a bad idea in production
app.patch("/api/users/:username", async (req, res) => {
    const username = req.params.username

    const email = req.body?.email
    const password = req.body?.password
    const firstName = req.body?.firstName
    const lastName = req.body?.lastName
    const age = req.body?.age

    const success = await userItem.update(
        email, username, password, firstName, lastName, age 
    )

    if(success){
        res.status(200).json({message: "User updated successfully"})
    } else {
        res.status(400).json({message: "Failed to update user"}) //TODO: more specific
    }

})
