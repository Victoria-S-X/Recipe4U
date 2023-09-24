<template>
    <div>
        <hr class="my-4">
        <div class="mt-4">
            <h4>{{ post.postName }}</h4>
            <b-card :img-src="`http://localhost:3000/api/v1/posts/image/${postID}`" img-width="900" img-alt="Food image" img-left class="mb-3">
              <b-card-text>
               {{ post.description }}
              </b-card-text>
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
    </div>
</template>

<script>
import { Api } from '@/Api'
// import router from '../router'

export default {
  name: 'viewPost',
  data() {
    return {
      post: '',
      postID: '',
      ingres: ''
    }
  },
  created() {
    this.populatePost()
  },
  methods: {
    populatePost() {
      console.log(this.$route.params.id)
      Api.get(`/posts/${this.$route.params.id}`)
        .then(response => {
          this.post = response.data
          this.postID = response.data._id
          document.getElementsByTagName('b-card').imgSrc = `http://localhost:3000/api/v1/posts/image/${this.postID}`
          for (let i = 0; i < response.data.ingredients.length; i++) {
            const ingre = JSON.parse(response.data.ingredients[i]).ingredient
            this.ingres += ingre + ' '
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
