import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Welcome from './views/Welcome.vue'
import Post from './views/Post.vue'
import Register from './views/Register.vue'
import PostedCourses from './views/PostedCourses.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/api/v1/posts',
      name: 'post',
      component: Post
    },
    {
      path: '/Welcome/Register',
      name: 'register',
      component: Register
    },
    {
      path: '/postedCourses',
      name: 'postedCourses',
      component: PostedCourses
    }
  ]
})
