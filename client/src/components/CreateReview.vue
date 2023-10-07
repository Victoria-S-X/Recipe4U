<template>
<b-card style="max-width: 20rem" class="review-container">
<form class="form-content" @submit.prevent="submitReview">
  <div class="review-text-input">
          <span class="input-tag">Leave a review</span>
          <input type="text" class="text-textbox" v-model="text">
  </div>
  <div class="rating-input">
          <span class="input-tag">Rate this receipe out of 5</span>
          <input type="number" class="rate-textbox" v-model="rating">
  </div>
  <div class = "submit-review-btn">
        <button type="submit">Submit</button>
  </div>

</form>
</b-card>
</template>
<script>
import { Api } from '@/Api'
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
      Api.post(`/posts/${this.$route.params.id}/reviews`, {
        rating: this.rating,
        text: this.text
      })
      window.location.reload()
    }
  }

}

</script>
<style scoped>
.review-container {
  align-items: center;
  margin-top:5%;
  margin-bottom:5;
  margin-left:35%;
  background-image: linear-gradient(to bottom right, #f8f6f5 , #277c7d6e);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.submit-review-btn{
margin-top:3%;
margin-left:35%;
}
.input-tag{
  margin-left: 10%;
}
.text-textbox{
  margin-left:10%;
  padding:10%;

}
.rate-textbox{
  margin-left:10%;
  padding-right:20%
}

</style>
