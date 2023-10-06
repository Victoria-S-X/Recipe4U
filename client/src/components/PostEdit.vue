<template>
  <b-card no-body class="overflow-hidden outer-box" >
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img id="image" alt="Food Image" :src="imgSRC" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body class="edit-container">
                <div class="container mb-3">
                  <div class="container">
                    <h2>Edit {{ value.postName }}</h2>
                  </div>
                  <hr/>
                  <form @submit.prevent="save">
                    <div class="form-group">
                      <label class="form-label">Post Name</label>
                      <input type="text" class="form-control" ref="postNameInput" :value="value.postName" @input="updatePost()"/>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Cooking Time</label>
                      <input type="text" class="form-control" ref="cookingTime" :value="value.cookingTime" @input="updatePost()"/>
                    </div><br/>
                    <div class="form-group" ref="inputs" :value="value.inputs"  v-for="(input,k) in inputs" :key="k">
                      <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Ingredient" aria-label="Ingredient" aria-describedby="basic-addon2" v-model="input.ingredient">
                        <div class="input-group-append">
                          <button class="btn btn-outline-secondary" type="button" @click="add(k)" v-show="k == value.ingredients.length-1">
                            <b-icon icon="plus-circle" aria-label="Add"></b-icon>
                          </button>
                        </div>
                        <div class="input-group-append">
                          <button class="btn btn-outline-secondary" type="button" @click="remove(k)" v-show="k || ( !k && value.ingredients.length > 1)">
                            <b-icon icon="trash" aria-label="Remove"></b-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Description</label>
                      <textarea class="form-control" rows="3" ref="description" :value="value.description" @input="updatePost()"></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Recipe</label>
                      <textarea class="form-control" rows="3" ref="recipe" :value="value.recipe" @input="updatePost()"></textarea>
                    </div>
                    <div class="form-group">
                      <b-row align-h="center">
                        <b-col md="4" class="pb-2"><b-button variant="outline-info" type="submit">Save Post</b-button></b-col>
                        <b-col md="4" class="pb-2"><b-button variant="outline-secondary" @click="cancel()">Cancel</b-button></b-col>
                      </b-row>
                    </div>
                  </form>
                </div>
              </b-card-body>
            </b-col>
          </b-row>
            </b-card>
          </template>

<script>

export default ({
  props: ['value'],
  data() {
    return {
      isSuccessful: false,
      inputs: [{
        ingredient: ''
      }],
      imgSRC: ''
    }
  },
  mounted() {
    this.inputs = this.value.ingredients
    this.imgSRC = `http://localhost:3000/api/v1/posts/image/${this.$route.params.id}`
  },
  methods: {
    save() {
      // const ingredients = this.inputs.map(t => t.ingredient)
      const ingredients = this.inputs
      console.log(this.inputs)
      console.error(ingredients, 'in post create')
      this.$emit('savePost', {
        postName: this.$refs.postNameInput.value,
        cookingTime: this.$refs.cookingTime.value,
        ingredients,
        description: this.$refs.description.value,
        recipe: this.$refs.recipe.value
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    updatePost() {
      this.$emit('input', {
        postName: this.$refs.postNameInput.value,
        cookingTime: this.$refs.cookingTime.value,
        ingredients: this.inputs,
        description: this.$refs.description.value,
        recipe: this.$refs.recipe.value
      })
    },
    add() {
      this.inputs.push({
        ingredient: ''
      })
      console.log('after adding: ' + this.inputs[0].ingredient)
    },
    remove(index) {
      this.inputs.splice(index, 1)
    }
  }
})
</script>

<style scoped>
.outer-box {
  color: var(--primary-dark);
  background-image: linear-gradient(to bottom left, #f0f0ed , rgb(253, 253, 250));
}
  #image {
  position: relative;
  margin-left: 15%;
  margin-top: 5%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.372), 0 16px 20px 0 rgba(0, 0, 0, 0.475);
  border-radius: 2%;
  min-width: 14em;
  min-height: 18em;
  max-width: 30em;
  max-height: 38em;
}
.edit-container {
  padding-top: 3%;
  padding-right: 20%;
  font-weight: 600;
}
</style>
