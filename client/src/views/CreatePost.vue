<template>
  <div class="box">
    <div class="backgroundImg">
      <b-card id="backImg"
        overlay
        :img-src="backgroundImg"
        border-variant="light"
        img-alt="Card Image"
        img-height="450em"
        title="Create Post"
      >
      </b-card>
    </div>
    <div class="container md=4 outer-container translate-middle text-center">
      <br/>
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
                <input type="text" class="form-control text-ingredient" placeholder="Ingredient" aria-label="Ingredient" aria-describedby="basic-addon2" v-model="input.ingredient">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary btn-ingredient" type="button" @click="add(k)" v-show="k == inputs.length-1">
                    <b-icon icon="plus-circle" aria-label="Add"></b-icon>
                  </button>
                </div>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary btn-ingredient" type="button" @click="remove(k)" v-show="k || ( !k && inputs.length > 1)">
                    <b-icon icon="trash" aria-label="Remove"></b-icon>
                  </button>
                </div>
              </div>
            </div><br/>
            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Recipe</label>
                <textarea class="form-control" rows="3" v-model="recipe"></textarea>
            </div><br/>
            <file-pond
              class="file-pond"
              name="image"
              ref="pond"
              class-name="my-pond"
              label-idle="Drag & Drop your image or Browse"
              allow-multiple="false"
              accepted-file-types="image/jpeg, image/png, image/jpg"
              v-bind:file="postImage"
              v-on:init="handleFilePondInit"
              @addfile="onAddFile"
              v-on:updatefiles="handleFilePondUpdateFile()"
            /><br/>
            <div class="form-group">
                <button class="btn btn-submit" type="submit">Create Post</button>
            </div>
        </form>
    </div>
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
import bImg from '../../public/createPostBackground.jpg'
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
      postImage: '',
      backgroundImg: bImg
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
        router.push({ path: '/posts' })
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

<style scoped>
.box {
  background-image: linear-gradient(to bottom left, #ecece9 , rgb(253, 253, 250));
  color: var(--primary-dark)
}
.outer-container {
  position: relative;
  margin-top: -12%;
  border-radius: 3px;
  font-weight: 600;
  padding-top: 2%;
  padding-bottom: 2%;
  background: rgb(253, 253, 253);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.backgroundImg {
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#backImg {
  padding-top: 0.5%;
}
.form-group {
  margin-left: 10%;
  margin-right: 10%;
}
.file-pond {
  margin-left: 10%;
  margin-right: 10%;
}
.btn-submit {
  display: inline-block;
  padding: 1% 4%;
  font-size: 1.1em;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgb(80, 151, 165);
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px #d7d6d6;
}
.btn-submit:hover {background-color: var(--primary-dark); color: #fff;}

.btn-submit:active {
  background-color: var(--primary-dark);;
  box-shadow: 0 4px #666;
  transform: translateY(4px);
}
.btn-ingredient {
  border-color: var(--primary-dark);
}
.form-control {
  text-align: center;
}
.text-ingredient {
  text-align: start;
}
</style>
