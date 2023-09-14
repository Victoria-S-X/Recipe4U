const auth = require("../auth")
const userData = require("../db/user")
const { idToObj } = require("../db/helpers")
const links = require("./routes/links")


module.exports = async (req, res, next) => {

	//provided token?
	const token = req.header("Authorization")?.split(' ')[1] //removes "Bearer " prefix
	if (!token) return res.status(401).json({ 
		message: "Authentication token missing",
		_links: {
			login: loginLink,
		}
	})

	try {
		//valid token?
		const data = auth.verifyJWT(token)

		//set user id
		req.strUserID = data.userID
		req.userID = idToObj(data.userID) 

		//valid userID?
		if(!req.userID){
			res.status(400).json({
				message: "Invalid userID",
				_links: {
					login: links.login,
				}
			})
			return
		}

		//valid user?
		if(!await userData.get(req.userID)){
			console.log(`Token payload: ${data.userID}`)
			res.status(401).json({ 
				message: "Can't authenticate, user does not exist",
				_links: {
					login: links.login,
					createUser: links.createUser
				}
			})
			return
		}

		next()
	} catch (error) {
		return res.status(401).json({
			message: "Invalid token",
			_links: {
				login: links.login,
			}
		});
	}
}