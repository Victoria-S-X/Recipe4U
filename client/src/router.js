import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
<<<<<<< client/src/router.js

import Welcome from './views/Welcome.vue'
import Post from './views/Post.vue'
>>>>>>> client/src/router.js

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
<<<<<<< client/src/router.js
      path: '/Welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/api/v1/posts',
      name: 'post',
      component: Post
>>>>>>> client/src/router.js
    }

  ]
})
