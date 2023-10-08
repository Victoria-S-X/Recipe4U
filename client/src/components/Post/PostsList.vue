<template>
  <div class="postList">
    <div v-for="(post, index) in posts" :key="index">
          <b-container class="post-container" @click="goToViewPost(post._id)">
            <post :post="post"/>
          </b-container>
    </div>
  </div>
</template>

<script>
import { errorHandler } from '@/Api'
import router from '@/router'
import Post from '@/components/Post/PostListItem.vue'
import userController from '@/controllers/user'
import postController from '@/controllers/post'

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
      const params = this.getFrom === 'userPosted' ? { user: this.getUser()._id } : {}

      this.getPosts(params)
        .then(posts => { this.posts = posts })
        .catch(error => { errorHandler(error) })
    },
    goToViewPost(index) {
      router.push({ path: `/posts/${index}` })
    }
  },
  props: { getFrom: String },
  mixins: [userController, postController]
})
</script>

<style scoped>

.postList {
  margin: 1% auto; /* add horisontal percentage margin */
  padding: 0 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(30em, 40vh), 1fr));
  width: auto;
  row-gap: 1em;
}

@media screen and (max-width: 30em) {
  .postList {
    grid-template-columns: auto;
    padding: 0;
  }

  .post-container {
    padding: 0.3em;
  }
}
</style>
