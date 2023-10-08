import { Api } from '@/Api'

export default {
  methods: {
    getVacantCourses: (postID) =>
      Api.get(`/posts/${postID}/courses?filter=notFull&sort=start`),
    getMyCourses: () => Api.get('/courses/posted-courses'),
    deleteCourses: () => Api.delete('/courses'),
    getAttendingCourses: () => Api.get('/courses/attending-courses')
  }
}
