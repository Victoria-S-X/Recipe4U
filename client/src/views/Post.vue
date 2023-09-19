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
              accepted-file-types="image/jpeg, image/png"
              v-bind:files="image"
              v-on:init="handleFilePondInit"
              @processfile="onProcessFile" @addfile="onAddFile"
            />
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Create Post</button>
            </div>
        </form>
    </div>
</template>

<script>
// Import FilePond
import vueFilePond from 'vue-filepond'

// Import plugins

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import { Api } from '@/Api'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

export default {
  name: 'post',
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
      image: ''
    }
  },

  methods: {
    onCreatePost() {
      Api.post('/', {
        postName: this.postName,
        cookingTime: this.cookingTime,
        description: this.description,
        recipe: this.recipe,
        ingredients: this.inputs.data,
        postImageName: this.image.files
      }, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        this.isSuccessful = true
        console.log(response)
      }).catch(error => {
        console.log(this.$refs.pond.getFiles())
        console.log(error)
      })
    },
    add() {
      this.inputs.push({
        ingredient: ''
      })
      console.log(this.inputs)
    },

    remove(index) {
      this.inputs.splice(index, 1)
    },
    handleFilePondInit: function () {
      console.log('FilePond has initialized')
      // example of instance method call on pond reference
      this.$refs.pond.getFiles()
    },
    onProcessFile(error, file) {
      console.log('file processed', { error, file })
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
