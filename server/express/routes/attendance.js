const app = require("../expressApp")
const auth = require("./auth")


//UPDATES attendance status for logged in user to provided course
app.patch("/api/v1/attend/:courseID", auth, async (req, res) => {
    const resCode = courseItem.attend(req.userID, req.params.courseID)
    res.status(200).json({message: `Attendance updated`})
})