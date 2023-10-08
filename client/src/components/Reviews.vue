<template>
    <div class="Background" >
        <div  class="comment-box" v-for="(review, index) in reviews" :key="index">
        <div class="user-rating">
        <span class="User">{{review.username}} </span>
        <span class="Rate">{{ review.rating }}/5</span>
        </div>
          <p  class="Comment">{{review.text}}</p>
        </div>
    </div>
</template>

<script>
import { errorHandler } from '@/Api'
import reviewController from '@/controllers/review'

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
      this.getReviews(this.postID)
        .then(reviews => { this.reviews = reviews })
        .catch(errorHandler)
    }
  },
  props: {
    postID: {
      type: String,
      required: true
    }
  },
  mixins: [reviewController]
})
</script>

<style scoped>
.comment-box{
border: 1px solid white;
padding: 10px;
white-space: pre-line;
background-image: linear-gradient(to bottom right, #f8f6f5 , #277c7d6e);
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
border-radius: 1%;
border: none;
margin:10px;
}
.User{
font-weight:bold;
}
.Rate{
font-weight: bold;
color: mediumaquamarine;
}
</style>
