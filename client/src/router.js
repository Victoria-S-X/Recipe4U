import Vue from 'vue'
import Router from 'vue-router'

import Welcome from './views/Welcome.vue'
import CreatePost from './views/CreatePost.vue'
import Register from './views/Register.vue'
import PostedCourses from './views/PostedCourses.vue'
import PostList from './views/PostsList.vue'
import CreateReview from './components/CreateReview.vue'
import PostManager from './views/PostManager.vue'

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
      path: '/register',
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
      name: 'postManager',
      component: PostManager
    },
    {
      path: '/posts/:id/CreateReview',
      name: 'CreateReview',
      component: CreateReview
    }
  ]
})
