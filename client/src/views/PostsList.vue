<template>
  <div class="row">
    <div class="col-md-4" v-for="(post, index) in posts" :key="index">
          <b-container @click="goToEditPost(post._id)">
            <post :post="post"/>
            </b-container>>
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
