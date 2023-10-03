<template>
    <div>
      <div style="padding-top: 3%;">
        <b-card no-body class="overflow-hidden" style="padding-left: 20%; padding-right: 20%;">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img id="image" alt="Food Image" style="align-content: center; max-height: 20em; max-width: 18em;" :src="imgSRC" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="post.postName">
                <b-card-text>
                  {{ post.description }}
                </b-card-text>
                <div v-if="isPostOwner()">
                  <b-button @click="goToEditPostPage()" variant="info">Edit</b-button>
                </div>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
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

      <Reviews v-if="postID" :postID="postID"/>
      </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import Courses from '@/components/Courses.vue'
import user from '@/mixins/user.js'
import Reviews from '@/components/Reviews.vue'

export default {
  name: 'viewPost',
  props: ['viewPost'],
  data() {
    return {
      post: '',
      postID: '',
      ingres: '',
      imgSRC: '',
      inputs: [{
        ingredient: ''
      }],
      editedPost: {
        postName: null,
        cookingTime: null,
        ingredients: null,
        description: null,
        recipe: null
      }
    }
  },
  mounted() {
    this.populatePost()
  },
  methods: {
    populatePost() {
      Api.get(`/posts/${this.$route.params.id}`)
        .then(response => {
          this.post = response.data
          console.log(response.data.ingredients)
          this.imgSRC = `http://localhost:3000/api/v1/posts/image/${this.$route.params.id}`
          for (let i = 0; i < response.data.ingredients.length; i++) {
            const ingre = JSON.parse(response.data.ingredients[i]).ingredient
            this.ingres += ingre + ' '
            if (this.inputs[0].ingredient === '') {
              this.inputs[0].ingredient = ingre
            } else {
              this.inputs.push({ ingredient: ingre })
            }
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
    goToEditPostPage() {
      const ingredients = []
      for (let i = 0; i < this.inputs.length; i++) {
        const ingre = this.inputs[i].ingredient
        ingredients.push({ ingredient: ingre })
      }
      this.$emit('edit', {
        postName: this.post.postName,
        cookingTime: this.post.cookingTime,
        description: this.post.description,
        recipe: this.post.recipe,
        ingredients
      })
    }
  },
  mixins: [user],
  components: {
    Courses,
    Reviews
  }
}
</script>
