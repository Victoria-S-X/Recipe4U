import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Welcome from './views/Welcome.vue'
import CreatePost from './views/CreatePost.vue'
import Register from './views/Register.vue'
import Reviews from './views/Reviews.vue'
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
      name: 'home',
      component: Home
    },
    {
      path: '/Welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/api/v1/posts/creation',
      name: 'createPost',
      component: CreatePost
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
    },
    {
      path: '/api/v1/posts',
      name: 'post',
      component: PostList
    },
    {
      path: '/api/v1/posts/:id',
      name: 'editPost',
      component: EditPost
    },
    {
      path: '/api/v1/posts/:id/view',
      name: 'viewPost',
      component: ViewPost
    },
    {
      path: '/api/v1/posts/:id/reviews',
      name: 'Reviews',
      component: Reviews
    }
  ]
})
