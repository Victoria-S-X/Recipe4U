const app = require("../expressApp")
const userItem = require("../../items/user")

app.post("/api/user", (req, res) => {
    const email = req.body?.email
    const username = req.body?.username
    const password = req.body?.password
    const firstName = req.body?.firstName
    const lastName = req.body?.lastName
    const age = req.body?.age

    if(username && password && email){
        userItem.createUser(
            email, username, password, firstName, lastName, age 
        )

        res.status(201).json({message: "User created"})
    } else {
        res.status(400).json({message: "Missing parameters"})
    }
})

//obviously a bad idea in production
app.get("/api/user/:username", async (req, res) => {
    const username = req.params.username
    const user = await userItem.findUser(username)
    
    res.status(200).json({
        email: user.email,
        username: user.username,
        password: user.password,
        firstName: user?.firstName,
        lastName: user?.lastName,
        age: user?.age
    })
})
