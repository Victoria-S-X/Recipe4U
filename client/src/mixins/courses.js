import { Api } from '@/Api'

export default {
  methods: {
    getVacantCourses(postID) {
      return Api.get('/posts/6509d455374dd370988806dc/courses?filter=notFull', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTA5ZDQ1MzM3NGRkMzcwOTg4ODA2YzMiLCJpYXQiOjE2OTUxNDI5OTZ9.dOJ6CMBgcYb7Q0eRGtbpkxo8DyuE-8SLxUsYHQe0MRE'
        }
      })
    }
  }
}
