import Vue from 'vue'
import Router from 'vue-router'

import Welcome from './views/Welcome.vue'
import CreatePost from './views/CreatePost.vue'
import Register from './views/Register.vue'
import PostedCourses from './views/PostedCourses.vue'
import PostList from './views/PostsList.vue'
import EditPost from './views/EditPost.vue'
import ViewPost from './views/ViewPost.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/posts/creation',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: '/Welcome/Register',
      name: 'register',
      component: Register
    },
    {
      path: '/posted-courses',
      name: 'Posted Courses',
      component: PostedCourses
    },
    {
      path: '/posts',
      name: 'post',
      component: PostList
    },
    {
      path: '/posts/:id',
      name: 'editPost',
      component: EditPost
    },
    {
      path: '/posts/:id/view',
      name: 'viewPost',
      component: ViewPost
    }
  ]
})
