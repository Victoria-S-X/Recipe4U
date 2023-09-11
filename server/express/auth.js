const auth = require("../auth")
const userData = require("../db/user")
const idToObj = require("../db/helpers").idToObj


module.exports = async (req, res, next) => {

    //provided token?
    const token = req.header("Authorization")?.split(' ')[1] //removes "Bearer " prefix
    if (!token) return res.status(401).json({ message: "Authentication token missing" })
  
    try {
        //valid token?
        const data = auth.verifyJWT(token)

        //valid user?
        if(!await userData.get(data.userID)) return res.status(401).json({ message: "Can't authenticate, user has been deleted" })

        //set user id
        req.strUserID = data.userID
        req.userID = idToObj(data.userID) 

        //valid userID?
        if(!req.userID){
          res.status(400).json({message: "Invalid username"})
          return
        }

        next()
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
}