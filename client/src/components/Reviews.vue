<template>
    <div class="Background" >
        <div  class="comment-box" v-for="(review, index) in reviews" :key="index">
          <span  class="User">{{ review.user.username }}</span>
          <span  class="Rate">{{review.rating}}</span>
          <span  class="Comment">{{review.text}}</span> </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
export default ({
  name: 'Reviews',
  data() {
    return {
      reviews: []
    }
  },
  created() {
    this.populateReviews()
  },
  methods: {
    populateReviews() {
      Api.get(`/posts/${this.postID}/reviews`)
        .then(response => { this.reviews = response.data })
        .catch(error => {
          console.log(error)
        })
    }
  },
  props: {
    postID: {
      type: String,
      required: true
    }
  }
})
</script>
<style scoped>
</style>
