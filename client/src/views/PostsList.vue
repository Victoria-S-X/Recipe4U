<template>
  <div class="postList">
    <div v-for="(post, index) in posts" :key="index">
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
      router.push({ path: `/posts/${index}` })
    }
  }
})
</script>

<style scoped>

.postList {
  margin: 1% auto;
  padding: 0 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30em, 1fr));
  width: auto;
  row-gap: 1em;
}

@media screen and (max-width: 30em) {
  .postList {
    grid-template-columns: auto;
    padding: 0;
  }
}
</style>
