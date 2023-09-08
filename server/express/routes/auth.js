const app = require("../expressApp")
const userItem = require("../../items/user")
const auth = require("../../auth")



module.exports = (req, res, next) => {

    //provided token?
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Authentication token missing' })
  
    try {
        //valid token?
        const data = auth.verifyJWT(token)

        req.userID = data.userID
        next()
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
}