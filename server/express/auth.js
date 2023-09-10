const auth = require("../auth")
const userModel = require("../models/user")


module.exports = async (req, res, next) => {

    //provided token?
    const token = req.header("Authorization")?.split(' ')[1] //removes "Bearer " prefix
    if (!token) return res.status(401).json({ message: "Authentication token missing" })
  
    try {
        //valid token?
        const data = auth.verifyJWT(token)

        //valid user?
        if(!await userModel.get(data.userID)) return res.status(401).json({ message: "Can't authenticate, user has been deleted" })

        req.userID = data.userID
        next()
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
}