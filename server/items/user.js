const mongoose = require("../db").mongoose


// ====== OBS! TEMPORARY, NO SECURITY ETC =======

const schema = new mongoose.Schema({
    email: String,
    username: {
      type: String,
      unique: true
    },
    password: String, 
    firstName: String,
    lastName: String,
    age: Number
  });
  
const User = mongoose.model('User', schema);


//throws when dupplicate username
exports.createUser = (email, username, password, firstName, lastName, age) => {
  new User({
    email: email,
    username: username,
    password: password, 
    firstName: firstName,
    lastName: lastName,
    age: age
  }).save()
}

exports.findUser = async (username) => {
  return await User.findOne({ username:username })
}