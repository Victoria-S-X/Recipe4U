import { Api, errorHandler } from '@/Api'

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

// TODO: don't get from server every time
async function getUser() {
  try {
    const user = await Api.get('/users')
    return user.data
  } catch (error) {
    errorHandler(error)
  }
}

export default {
  methods: {
    isAttendingAsync,
    ownsCourse,
    getUser
  }
}
