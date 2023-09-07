

require("./db")
const userHandler = require("./items/user")
const server = require("./express/server")

server.start()

//userHandler.createUser("john@example.com", "john_the_smith", "Passwd123", "John", "Smith", 378)
userHandler.findUser("john_the_smith").then((user) => {
    console.log(user)
})
