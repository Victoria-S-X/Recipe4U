<template>
    <div>
      <div>
        <b-card no-body class="overflow-hidden" >
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img id="image" alt="Food Image" :src="imgSRC" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="post.postName">
                <b-card-text>
                  {{ post.description }}
                </b-card-text>
                <div v-if="isPostOwner()">
                  <b-button @click="goToEditPostPage(postID)" variant="info">Edit</b-button>
                </div>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <div>
          <b-jumbotron bg-variant="light" text-variant="dark" border-variant="light">
            <template #header>Recipe</template>
            <template #lead>
              Ingredients: {{ ingres }}
            </template>
           <hr class="my-4">
            <p>
              Cooking time: {{ post.cookingTime }}
            </p>
            <hr class="my-4">
            <p>
              Recipe: {{ post.recipe }}
            </p>
          </b-jumbotron>
      </div>

      <Courses v-if="postID" :postID="postID" getFrom="post" :userID="post.user"></Courses>
      <CreateReview></CreateReview>
      <Reviews v-if="postID" :postID="postID"/>
    </div>
</template>

<script>
import { Api } from '@/Api'
import Courses from '@/components/Courses.vue'
import user from '@/mixins/user.js'
import router from '../router'
import Reviews from '@/components/Reviews.vue'
import CreateReview from '@/views/CreateReview.vue'

export default {
  name: 'viewPost',
  data() {
    return {
      post: '',
      postID: '',
      ingres: '',
      imgSRC: ''
    }
  },
  created() {
    this.populatePost()
  },
  methods: {
    populatePost() {
      // console.log(this.$route.params.id)
      Api.get(`/posts/${this.$route.params.id}`)
        .then(response => {
          this.post = response.data
          this.postID = response.data._id
          console.log('ifhea', this.postID)
          this.imgSRC = `http://localhost:3000/api/v1/posts/image/${this.postID}`
          // document.getElementById('image').src =
          // console.log(document.getElementsByTagName('b-card-img').src)
          for (let i = 0; i < response.data.ingredients.length; i++) {
            const ingre = JSON.parse(response.data.ingredients[i]).ingredient
            this.ingres += ingre + ' '
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    isPostOwner() {
      const user = this.getUser()
      if (user._id === this.post.user) {
        return true
      }
      return false
    },
    goToEditPostPage(index) {
      router.push({ path: `/posts/${index}` })
    }
  },
  mixins: [user],
  components: {
    Courses,
    Reviews,
    CreateReview
  }
}

</script>
