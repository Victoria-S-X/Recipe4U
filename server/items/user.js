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
exports.create = (email, username, password, firstName, lastName, age) => {
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

exports.update = async (email, username, password, firstName, lastName, age) => {
  const update = {}

  if(email !== undefined) update["email"] = email
  if(password !== undefined) update["password"] = password
  if(firstName !== undefined) update["firstName"] = firstName
  if(lastName !== undefined) update["lastName"] = lastName
  if(age !== undefined) update["age"] = age

  const filter = {username: username}
  const result = await User.updateOne(filter, { $set: update })

  console.log(result.modifiedCount + " " + result.matchedCount)

  return result.modifiedCount === 1
}