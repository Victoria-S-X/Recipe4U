
let backendUrl = ""
exports.setBackendUrl = (url) => {
    backendUrl = url
}



exports.login = () => {
    return {
        description: "login",
        href: `${backendUrl}/login`,
        method: "POST"
    }
}

exports.createUser = () => {
    return {
        description: "Create user",
        href: `${backendUrl}/users`,
        method: "POST"
    }
}

exports.getCourse = (courseID) => {
    return {
        description: "Get course",
        href: `${backendUrl}/courses/${courseID}`,
        method: "GET"
    }
}

exports.getPost = (postID) => {
    return {
        description: "Get post",
        href: `${backendUrl}/posts/${postID}`,
        method: "GET"
    }
}