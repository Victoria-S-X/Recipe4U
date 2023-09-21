import { Api } from '@/Api'

export default {
  methods: {
    getVacantCourses(postID) {
      return Api.get(`/posts/${postID}/courses?filter=notFull`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTBjNmFhNzdmNzNmNzA2ZTRkNDgwNTkiLCJpYXQiOjE2OTUzMTI5NzF9.ylIiwyTcG_nq5uej5yW8q2vEkcG1f_MG_9rMwHMBM_s'
        }
      })
    }
  }
}
