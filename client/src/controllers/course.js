import { Api } from '@/Api'
import user from '@/controllers/user'
import post from '@/controllers/post'

/* --------------------------------- COURSE --------------------------------- */

function postCourse(course) {
  return Api.post(`/posts/${course.postID}/courses`, course)
}

function putCourse(course) {
  return Api.put(`/courses/${course._id}`, course)
}

function deleteCourse(course) {
  return Api.delete(`/courses/${course._id}`)
}

async function getPostLink(course) {
  const post = await this.getPost(course.postID)
  return {
    name: post.postName,
    url: post._links.selfPage.href
  }
}

export default {
  methods: {
    postCourse,
    putCourse,
    deleteCourse,
    getPostLink
  },
  mixins: [user, post]
}
