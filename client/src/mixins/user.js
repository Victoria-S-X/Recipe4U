import { Api, errorHandler } from '@/Api'

async function isAttendingAsync(course) {
  const user = this.getUser()
  if (!user) return false

  const isAttending = user?.attends.includes(course._id)

  return isAttending
}

function ownsCourse(course) {
  const user = this.getUser()
  if (!user) return false

  return user._id === course.userID
}

async function loadUser() {
  try {
    const response = await Api.get('/users')
    const userJson = JSON.stringify(response.data)
    localStorage.setItem('user', userJson)
  } catch (error) {
    errorHandler(error)
  }
}

function getUser() {
  const userJson = localStorage.getItem('user')
  const userObj = JSON.parse(userJson)

  return userObj
}

export default {
  methods: {
    isAttendingAsync,
    ownsCourse,
    loadUser,
    getUser
  }
}
