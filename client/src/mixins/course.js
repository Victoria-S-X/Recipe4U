import { Api } from '@/Api'
import user from '@/mixins/user'

// ============== COURSE ==================

function postCourse(course) {
  return Api.post(`/posts/${course.postID}/courses`, course)
}

function putCourse(course) {
  return Api.put(`/courses/${course._id}`, course)
}

function deleteCourse(course) {
  return Api.delete(`/courses/${course._id}`)
}

// ============== COURSE ATTENDANCE ==================

async function attend(course) {
  if (!course) throw new Error('No course provided')

  await Api.patch(`/attendance/${course._id}`, {}, {})
  const user = this.getUser()
  course.attendees.push(user._id)
  this.loadUser()
}

async function unattend(course) {
  if (!course) throw new Error('No course provided')

  await Api.delete(`/attendance/${course._id}`, {}, {})
  const user = this.getUser()

  course.attendees.splice(course.attendees.indexOf(user._id), 1)
  this.loadUser()
}

export default {
  methods: {
    postCourse,
    putCourse,
    deleteCourse,
    attend,
    unattend
  },
  mixins: [user]
}
