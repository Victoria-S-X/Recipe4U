<template>
    <div class="container mb-3">
        <div class="container">
            <h2>Edit {{ postName }}</h2>
        </div>
        <hr/>
        <div class="alert alert-success" v-if="isSuccessful">Post Edited Successfully</div>
        <form @submit.prevent="onEditPost">
          <div class="form-group">
                <label class="form-label">Post Name</label>
                <input type="text" class="form-control" v-model="postName"/>
            </div>
            <div class="form-group">
                <label class="form-label">Cooking Time</label>
                <input type="text" class="form-control" v-model="cookingTime"/>
            </div><br/>
            <div class="form-group">
                <input type="text" class="form-control"  v-model="inputs"/>
            </div>
            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Recipe</label>
                <textarea class="form-control" rows="3" v-model="recipe"></textarea>
            </div>
            <img width="350" height="350" id="image"/><hr/>

            <div class="form-group">
                <button class="btn btn-primary" type="submit">Edit Post</button>
            </div>
        </form>
    </div>
</template>

<script>
import { Api } from '@/Api'
import router from '../router'

export default {
  name: 'editPost',
  data() {
    return {
      postID: '',
      postName: '',
      cookingTime: '',
      description: '',
      recipe: '',
      isSuccessful: false,
      inputs: ''
    }
  },
  created() {
    this.populatePost()
  },
  methods: {
    populatePost() {
      Api.get(`/posts/${this.$route.params.id}`)
        .then(response => {
          this.postName = response.data.postName
          this.cookingTime = response.data.cookingTime
          this.description = response.data.description
          this.recipe = response.data.recipe
          this.postID = response.data._id
          document.getElementById('image').src = `http://localhost:3000/api/v1/posts/image/${this.postID}`
          console.log(response.data.ingredients)
          for (let i = 0; i < response.data.ingredients.length; i++) {
            const ingre = JSON.parse(response.data.ingredients[i]).ingredient
            this.inputs += ingre + ' '
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onEditPost() {
      const formData = new FormData()
      formData.append('postImage', this.postImage)
      formData.append('postName', this.postName)
      formData.append('description', this.description)
      formData.append('recipe', this.recipe)
      formData.append('cookingTime', this.cookingTime)
      const ingres = this.inputs.split(' ')
      for (let i = 0; i < ingres.length; i++) {
        const ingre = ingres[i]
        formData.append('ingredients[' + i + ']', `{"ingredient": "${ingre}"}`)
      }

      console.log(formData.get('postImage'))
      console.log(formData.get('ingredients[2]'))
      Api.patch(`/posts/${this.postID}`, formData, { Headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
        this.isSuccessful = true
      }).catch(error => {
        console.log(error)
      })
      // router.push({ path: '/posts' })
      router.push({ path: `/posts/${this.postID}/view` })
    }
  }
}

</script>
