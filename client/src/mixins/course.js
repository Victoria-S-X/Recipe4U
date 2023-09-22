import { Api } from '@/Api'

export default {
  methods: {
    putCourse(course) {
      return Api.put(`/courses/${course._id}`, course, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTBjNmFhNzdmNzNmNzA2ZTRkNDgwNTkiLCJpYXQiOjE2OTUzMTI5NzF9.ylIiwyTcG_nq5uej5yW8q2vEkcG1f_MG_9rMwHMBM_s'
        }
      })
    },
    postCourse(course) {
      console.error(course, course?.postID, 'charge')
      return Api.post(`/posts/${course.postID}/courses`, course, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTBjNmFhNzdmNzNmNzA2ZTRkNDgwNTkiLCJpYXQiOjE2OTUzMTI5NzF9.ylIiwyTcG_nq5uej5yW8q2vEkcG1f_MG_9rMwHMBM_s'
        }
      })
    },
    deleteCourse(course) {
      return Api.delete(`/courses/${course._id}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTBjNmFhNzdmNzNmNzA2ZTRkNDgwNTkiLCJpYXQiOjE2OTUzMTI5NzF9.ylIiwyTcG_nq5uej5yW8q2vEkcG1f_MG_9rMwHMBM_s'
        }
      })
    }
  }
}
