<template>

<b-card style="max-width: 20rem" class="review-container">
<form class="form-content" @submit.prevent="submitReview">
  <div class="review-text-input">
          <span class="input-tag" style="color:rgb(36,124,125)">Leave a review</span>
          <input type="text" class="text-textbox" v-model="text">
  </div>
  <div class="rating-input">
          <span class="input-tag" style="color:rgb(36,124,125)">Rate this receipe out of 5</span>
          <input type="number" class="rate-textbox" v-model="rating" @input="isRatingValid">
  </div>
  <div class = "Error-Message">
          <div v-if="errorMessage" class="error-text">{{this.errorMessage}}*</div>
  </div>
  <div class = "submit-review-btn">
        <button type="submit" class="submit-btn">Submit</button>
  </div>

</form>
</b-card>
</template>
<script>
import { errorHandler } from '@/Api'
import userController from '@/controllers/user'
import reviewController from '@/controllers/review'

export default {
  mixins: [userController, reviewController],
  name: 'CreateReview',
  data() {
    return {
      rating: 1,
      text: '',
      errorMessage: ''
    }
  },
  methods: {
    isRatingValid() {
      // Ensures that the rating input is between 0 and 5
      const inputRating = parseFloat(this.rating)
      if (inputRating < 1 || inputRating > 5) {
        this.rating = 1
      }
    },

    async submitReview() {
      if (this.text === '') {
        this.errorMessage = 'Missing parameters'
      } else {
        const username = this.getUser().username
        this.createReview(this.$route.params.id, username, this.rating, this.text).then(() => {
          window.location.reload() // TODO: fix this
        }).catch(errorHandler)
      }
    }
  }
}
</script>

<style scoped>
.review-container {
  align-items: center;
  margin: 5% auto;
  background-image: linear-gradient(to bottom right, #f8f6f5 , #277c7d6e);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.submit-review-btn{
margin-top:3%;
margin-left:30%;
margin-right: 70%;
}
.submit-btn{
  background-color: rgb(121,209,210);
  border-radius: 20%;
}
.input-tag{
  margin-left: 10%;
}
.text-textbox{
  margin-left:10%;
}
.rate-textbox{
  margin-left:10%;
}
.form-content{
margin-left:5%;
}
.error-text{
color:red;
}
</style>
