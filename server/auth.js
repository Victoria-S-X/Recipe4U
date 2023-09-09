const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtSecret = "Ag66gcrZI4fdEQ5wQpWtadhFZfPwpi" //obviously a bad idea in production


exports.hash = async (password) => {
    const salt = await bcrypt.genSalt(15)
    
    const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
    })

    return hash
}

exports.match = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

exports.getJWT = (userID) => {
    return jwt.sign({ userID: userID }, jwtSecret)
}

exports.verifyJWT = (token) => {
    return jwt.verify(token, jwtSecret)
}