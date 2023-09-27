import { Api, errorHandler } from '@/Api'

let user = null

async function isAttendingAsync(course) {
  const user = await this.getUser()
  if (!user) return false

  const isAttending = user?.attends.includes(course._id)

  return isAttending
}

function ownsCourse(course) {
  const user = this.getUser()
  if (!user) return false

  return user._id === course.userID
}

function loadUser() {
  Api.get('/users')
    .then((response) => {
      user = response.data
    }).catch(errorHandler)
}

function getUser() {
  return user
}

export default {
  methods: {
    isAttendingAsync,
    ownsCourse,
    loadUser,
    getUser
  }
}
