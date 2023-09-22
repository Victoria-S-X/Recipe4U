import { Api } from '@/Api'

export default {
  methods: {
    getVacantCourses(postID) {
      return Api.get(`/posts/${postID}/courses?filter=notFull&sort=start`)
    }
  }
}
