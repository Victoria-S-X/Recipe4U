
let backendUrl = ""
exports.setBackendUrl = (url) => {
    backendUrl = url
}



exports.login = {
    rel: "login",
    href: `${backendUrl}/login`,
    method: "POST"
}

exports.createUser = {
    rel: "createUser",
    href: `${backendUrl}/users`,
    method: "POST"
}

exports.getCourse = (courseID) => {
    return {
        rel: "getCourse",
        href: `${backendUrl}/courses/${courseID}`,
        method: "GET"
    }
}