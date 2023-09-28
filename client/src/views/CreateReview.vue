<template>
    <div class="background">
      <div class="review-box"></div>

      <div class="review-boxheading">Leave a comment</div>
      <textarea type = "text" class="text-box" v-model="text"></textarea>
      <button class="submit-button" @click="submitReview">submit</button>

      <div class="rate">Rate this </div>
      <div class = "rate-tagtext">out of 5</div>
      <input type = "number" class="rate-box" v-model="rating" @input="isRatingValid">
    </div>

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
        review: this.review,
        text: this.text
      }
      )
    }
  }

}

</script>
<style scoped>
.background { overflow:hidden;}
.background {
width: 100%;
height:100%;
position:absolute
}
.review-boxheading {
  color: #000000;
  text-align: left;
  font: 400 32px "Inter", sans-serif;
  position: absolute;
  left: 307px;
  top: 189px;
}
.text-box {
  background: #f8f5f5;
  border-style: solid;
  border-color: #000000;
  border-width: 1px;
  width: 619px;
  height: 263px;
  position: absolute;
  left: 319px;
  top: 285px;
  white-space: pre-line;
  word-break: break-word;

}
.submit-button {
  background: #efdb6f;
  border-radius: 90px;
  width: 201px;
  height: 45px;
  position: absolute;
  left: 535px;
  top: 568px;
}
.submit {
  color: #000000;
  text-align: left;
  font: 400 20px "Inter", sans-serif;
  position: absolute;
  left: 600px;
  top: 579px;
}
.rate {
  color: #000000;
  text-align: left;
  font: 400 24px "Inter", sans-serif;
  position: absolute;
  left: 320px;
  top: 245px;
}
.rate-box {
  background: #ffffff;
  border-style: solid;
  border-color: #000000;
  border-width: 1px 1px 1px 1px;
  width: 40px;
  height: 40px;
  position: absolute;
  left: 430px;
  top: 239px;
  text-align: center;
}
.rate-tagtext{
  left: 480px;
  top: 240px;
  position: absolute;
  font:400 24px "Inter", sans-serif;
}

</style>
