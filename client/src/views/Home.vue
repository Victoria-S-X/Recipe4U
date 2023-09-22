<template>
  <div>
    <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()">Get Message from Server</b-button>
      <p>Message from the server:<br />
        {{ message }}</p>
    </b-jumbotron>

    <Courses />
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Courses from '@/components/Courses.vue'

export default {
  name: 'home',
  components: {
    Courses
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/v1')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
