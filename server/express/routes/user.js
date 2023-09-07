const app = require("../expressApp")
const userItem = require("../../items/user")

app.post("/api/user", (req, res) => {
    const data = req.body

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
