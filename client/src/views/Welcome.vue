<template>
  <div class="Background">
    <h1 class="Header">Recipes4U</h1>
    <div class = "center-grid">
    <b-card title="Log in" style="max-width: 20rem" class="login-container">
      <form class="form-contents" @submit.prevent="logInUser">
        <div class="user-input">
          <span class="input-tag">Username:</span>
          <input type="text" class="textbox" v-model="username">
        </div>
        <div class="pass-input">
          <span class="input-tag">Password:</span>
          <input type="password" class="textbox" v-model="password">
        </div>
        <div class = "login-btn">
        <button type="submit">Log In</button>
        </div>
        <p class = "card-text">or</p>
        <div class="register-btn">
          <button type="button" @click="goToRegister">Register</button>
        </div>
      </form>
    </b-card>
  </div>
  </div>
</template>

<script>
import auth from '@/mixins/auth'
import { errorHandler } from '../Api'

export default {
  name: 'Welcome',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async logInUser() {
      try {
        const response = await this.login({
          username: this.username,
          password: this.password
        })

        this.$router.push(response.data._links.homePage.href)
      } catch (error) {
        if (error.response.status === 404) {
          const createAccount = confirm('Invalid credentials. Create an account instead?')

          if (createAccount) {
            const registerPage = error.response.data._links.createUserPage.href
            this.$router.push(registerPage)
          }
        } else {
          errorHandler(error)
        }
      }
    },
    goToRegister() {
      this.$router.push('/register')
    }
  },
  mixins: [auth]
}
</script>

<style scoped>
.Header {
  text-align: center;
  font-size: 50px;
}
.center-grid{
display:flex;
align-items: center;
justify-content: center;
height: 50vh;
}
.input-tag {
  margin-left: 0%;
  margin-right: 10%;
}
.login-container {
  align-items: center;
  margin-top:20%;
  margin-left:2%;
}
.login-btn{
margin-left:25%;
margin-top:10%
}
.register-btn{
margin-left:22%;
margin-top:5%
}
.card-text{
margin-left:34%;
margin-top:5%;
}
.form-contents{
margin-left:10%;
}
.Background{
color: rgb(36,124,125);
}
</style>
