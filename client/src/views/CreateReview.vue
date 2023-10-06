<template>
    <div class="background">
      <div class = "container">
      <div class="review-box"></div>

      <div class="review-boxheading">Leave a comment</div>
      <textarea type = "text" class="text-box" v-model="text"></textarea>
      <div class="rate">Rate this out of 5</div>
      <input type = "number" class="rate-box" v-model="rating" @input="isRatingValid">
      <button class="submit-button" @click="submitReview">submit</button>
    </div>
    </div>

</template>
<script>
import { Api } from '@/Api'
import user from '@/mixins/user'

export default {
  name: 'CreateReview',
  data() {
    return {
      rating: 0,
      text: ''
    }
  },
  methods: {
    isRatingValid() {
      // Ensures that the rating input is between 0 and 5
      const inputRating = parseFloat(this.rating)
      if (inputRating <= -1 || inputRating > 5) {
        this.rating = 0
      }
    },
    async submitReview() {
      const username = this.getUser().username
      Api.post(`/posts/${this.$route.params.id}/reviews`, {
        username: username,
        rating: this.rating,
        text: this.text
      }
      )
    }
  },
  mixins: [user]

}

</script>
<style scoped>
.container{
display: flex;
width: 500px;
flex-direction: column;
align-items: left;
}
.background{
padding:10px;
}
</style>
