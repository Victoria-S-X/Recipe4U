import { Api } from '@/Api'

export default {
  methods: {
    putCourse(course) {
      return Api.put(`/courses/${course._id}`, course)
    },
    postCourse(course) {
      return Api.post(`/posts/${course.postID}/courses`, course)
    },
    deleteCourse(course) {
      return Api.delete(`/courses/${course._id}`)
    }
  }
}
