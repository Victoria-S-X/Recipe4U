
require("./db/DBhandler")

const port = process.env.PORT || 3000
const baseUrl = `http://localhost:${port}`
const backendUrl = `${baseUrl}/api/v1`

require("./express/routes/links").setBackendUrl(backendUrl)

const {app} = require("./express/expressApp")
const env = app.get("env")


// THE ORDER OF REQUIRES IS VERY IMPORTANT
require("./express/routes/login")
require("./express/routes/course")
require("./express/routes/user")
require("./express/routes/post")
require("./express/routes/postsCourses")
require("./express/routes/attendance")
require("./express/routes/review")
require("./express/routes/frontend")
require("./express/routes/error")



app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: ${backendUrl}}`);
    console.log(`Frontend (production): ${baseUrl}/`);
})

