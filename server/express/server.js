
// THE ORDER OF REQUIRES IS VERY IMPORTANT
const app = require("./expressApp")
require("./routes/user")
//require("./routes/frontend")
require("./routes/error")

const port = process.env.PORT || 3000;
const env = app.get("env")

exports.start = () => {
    app.listen(port, function(err) {
        if (err) throw err;
        console.log(`Express server listening on port ${port}, in ${env} mode`);
        console.log(`Backend: http://localhost:${port}/api/`);
        console.log(`Frontend (production): http://localhost:${port}/`);
    })
}