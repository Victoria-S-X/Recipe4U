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
  <div class = "submit-review-btn">
        <button type="submit" class="submit-btn">Submit</button>
  </div>

</form>
</b-card>
</template>
<script>
import { Api } from '@/Api'
import user from '@/mixins/user'
export default {
  mixins: [user],
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
      try {
        if (this.rating === 0 || this.text === '') {
          const emptyReview = confirm('Review is empty, please enter something before submitting!')
          if (emptyReview) {
            window.location.reload()
          }
        } else {
          const retrivedUser = this.getUser().username
          Api.post(`/posts/${this.$route.params.id}/reviews`, {
            username: retrivedUser,
            rating: this.rating,
            text: this.text
          })
          window.location.reload()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

</script>
<style scoped>
@media only screen and (min-width:768px)
{
.review-container {
  align-items: center;
  margin-top:5%;
  margin-bottom:5;
  margin-left:37.5%;
  background-image: linear-gradient(to bottom right, #f8f6f5 , #277c7d6e);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
}
@media only screen and (max-width:768px) {
  .review-container {
  align-items: center;
  margin-top:5%;
  margin-bottom:5%;
  margin-left:20%;
  position: relative;
  background-image: linear-gradient(to bottom right, #f8f6f5 , #277c7d6e);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
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
</style>
