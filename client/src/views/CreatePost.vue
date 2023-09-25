<template>
    <div class="container mb-3">
        <div class="container">
            <h2>Create Post</h2>
        </div>
        <hr/>
        <div class="alert alert-success" v-if="isSuccessful">Post Created Successfully</div>
        <form @submit.prevent="onCreatePost">
          <div class="form-group">
                <label class="form-label">Post Name</label>
                <input type="text" class="form-control" v-model="postName"/>
            </div>
            <div class="form-group">
                <label class="form-label">Cooking Time</label>
                <input type="text" class="form-control" v-model="cookingTime"/>
            </div><br/>
            <div class="form-group" v-for="(input,k) in inputs" :key="k">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Ingredient" aria-label="Ingredient" aria-describedby="basic-addon2" v-model="input.ingredient">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="add(k)" v-show="k == inputs.length-1">
                    <b-icon icon="plus-circle" aria-label="Add"></b-icon>
                  </button>
                </div>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="remove(k)" v-show="k || ( !k && inputs.length > 1)">
                    <b-icon icon="trash" aria-label="Remove"></b-icon>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Recipe</label>
                <textarea class="form-control" rows="3" v-model="recipe"></textarea>
            </div>
            <file-pond
              name="image"
              ref="pond"
              class-name="my-pond"
              label-idle="Drop files here..."
              allow-multiple="false"
              accepted-file-types="image/jpeg, image/png, image/jpg"
              v-bind:file="postImage"
              v-on:init="handleFilePondInit"
              @addfile="onAddFile"
              v-on:updatefiles="handleFilePondUpdateFile()"
            />
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Create Post</button>
            </div>
        </form>
    </div>
</template>

<script>
import { Api } from '@/Api'
import router from '../router'
// Import FilePond
import vueFilePond from 'vue-filepond'
// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
)

export default {
  name: 'createPost',
  data() {
    return {
      postName: '',
      cookingTime: '',
      description: '',
      recipe: '',
      isSuccessful: false,
      inputs: [{
        ingredient: ''
      }],
      postImage: ''
    }
  },

  methods: {
    onCreatePost() {
      const formData = new FormData()
      formData.append('postImage', this.postImage)
      formData.append('postName', this.postName)
      formData.append('description', this.description)
      formData.append('recipe', this.recipe)
      formData.append('cookingTime', this.cookingTime)
      for (let i = 0; i < this.inputs.length; i++) {
        const ingre = this.inputs[i]
        formData.append('ingredients[' + i + ']', JSON.stringify(ingre))
      }
      Api.post('/posts', formData, { Headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
        this.isSuccessful = true
        router.push({ path: '/api/v1/posts' })
      }).catch(error => {
        console.log(error)
      })
    },
    add() {
      this.inputs.push({
        ingredient: ''
      })
    },
    remove(index) {
      this.inputs.splice(index, 1)
    },
    handleFilePondUpdateFile() {
      this.postImage = this.$refs.pond.getFile().file
      console.log(this.postImage)
    },
    handleFilePondInit: function () {
      console.log('FilePond has initialized')
    },
    onAddFile(error, file) {
      console.log('file added', { error, file })
    }
  },
  components: {
    FilePond
  }
}

</script>
