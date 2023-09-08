const bcrypt = require('bcrypt')

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