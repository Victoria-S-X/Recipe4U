const mongoose = require("../db").mongoose

const SUCCESS = 0
const ERROR = 1
const DUPLICATE_USER = 2

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



/**
 * @returns {number} Result code indicating success or type of error
 */
const create = async (email, username, password, firstName, lastName, age) => {
  const user = new User({
    email: email,
    username: username,
    password: password, 
    firstName: firstName,
    lastName: lastName,
    age: age
  })

  try{
    await user.save()

    return SUCCESS
  } catch (err){
    if(err.code == 11000) return DUPLICATE_USER
    return ERROR
  }
}


const find = async (username) => {
  return await User.findOne({ username:username })
}

const get = async (strID) => {
  const id = new mongoose.Types.ObjectId(strID)

  return User.findById(id)
}


const update = async (email, username, password, firstName, lastName, age) => {
  const update = {}

  if(email !== undefined) update["email"] = email
  if(password !== undefined) update["password"] = password
  if(firstName !== undefined) update["firstName"] = firstName
  if(lastName !== undefined) update["lastName"] = lastName
  if(age !== undefined) update["age"] = age

  const filter = {username: username}
  const result = await User.updateOne(filter, { $set: update })

  return result.modifiedCount === 1
}



module.exports = {
  SUCCESS,
  ERROR,
  DUPLICATE_USER,
  create,
  find,
  get,
  update
}