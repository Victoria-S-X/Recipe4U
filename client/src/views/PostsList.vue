<template>
  <div class="row">
    <div class="col-md-4" v-for="(post, index) in posts" :key="index">
          <div class="card h-100" @click="goToEditPost(post._id)">
            <img class="card-img-top" width="200" height="400" :src="`http://localhost:3000/api/v1/posts/image/${post._id}`" alt="Food image">
            <div class="card-body">
              <h5 class="card-title">{{post.postName}}</h5>
              <p class="card-text">{{post.description}}</p>
            </div>
          </div>
     </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import router from '../router'

export default ({
  data() {
    return {
      posts: []
    }
  },
  created() {
    this.populatePosts()
  },
  methods: {
    populatePosts() {
      Api.get('/posts')
        .then(response => {
          this.posts = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    goToEditPost(index) {
      // ßconsole.log(index)
      router.push({ path: `/api/v1/posts/${index}` })
    }
  }
})
</script>

<style scoped>

</style>
