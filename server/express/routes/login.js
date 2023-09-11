const router = require("../expressApp").Router("/api/v1/login")

const app = require("../expressApp")
const userData = require("../../db/user")
const auth = require("../../auth")


router.post("/", async (req, res) => {
    //provided password?
    const password = req.body?.password
    if(password === undefined){
        res.status(400).json({message: "Password missing"})
        return
    }

    //provided username?
    const username = req.body?.username
    if(username === undefined){
        res.status(400).json({message: "Username missing"})
        return
    }

    //does user exist?
    const user = await userData.find(username)
    if(!user){
        res.status(404).json({message: "User does not exist"})
        return
    }

    //right password?
    const authenticated = await auth.match(password, user.password)
    if(!authenticated){
        res.status(401).json({message: "Wrong password"})
        return
    }

    const jwt = auth.getJWT(user._id)
    res.status(200).json({
        jwt
    })
})
