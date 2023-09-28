<template>
  <div class="row">
    <div class="col-md-4" v-for="(post, index) in posts" :key="index">
          <b-container @click="goToViewPost(post._id)">
            <post :post="post"/>
          </b-container>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import router from '../router'
import Post from '../components/Post.vue'

export default ({
  components: {
    Post
  },
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.populatePosts()
  },
  methods: {
    populatePosts() {
      Api.get('/posts', {
        cashe: false
      })
        .then(response => {
          this.posts = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    goToViewPost(index) {
      router.push({ path: `/posts/${index}/view` })
    },
    goToEditPost(index) {
      router.push({ path: `/posts/${index}` })
    }
  }
})
</script>

<style scoped>
  .row {
    margin-top: 5%;
    margin-right: 3%;
    margin-left: 3%;
  }
</style>
