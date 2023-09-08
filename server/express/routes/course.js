const app = require("../expressApp")
const courseItem = require("../../items/course")
const auth = require("./auth")


app.get("/api/v1/courses", auth, (req, res) => {

})