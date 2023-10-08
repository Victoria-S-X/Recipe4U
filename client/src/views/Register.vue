<template>
<div class = "Background">
    <h1 class="Header">Glad you chose to join our community!</h1>
    <div class = "center-grid">
    <b-card title="Register" style="max-width: 20rem" class="register-container">
      <form class="form-contents" @submit.prevent="registerUser">

        <div class="Fname-input">
          <span class="input-tag">First Name:</span>
          <input type="text" class="textbox" v-model="firstName">
        </div>

        <div class="Lname-input">
          <span class="input-tag">Last Name:</span>
          <input type="text" class="textbox" v-model="lastName">
        </div>
        <div class="Age-input">
        <span class="input-tag">Your age:</span>
        <input type="Number" class="textbox" v-model="age">
        </div>
        <div class="email-input">
          <span class="input-tag">Email address:</span>
          <input type="text" class="textbox" v-model="email">
        </div>

        <div class="user-input">
          <span class="input-tag">Username:</span>
          <input type="text" class="textbox" v-model="username">
        </div>

        <div class="pass-input">
          <span class="input-tag">Password:</span>
          <input type="password" class="textbox" v-model="password">
        </div>
        <div class="pass-input">
          <span class="input-tag">Re-enter Password:</span>
          <input type="password" class="textbox" v-model="redoPass">
        </div>
        <div class = "Error-Message">
          <div v-if="errorMessage" class="error-text">{{this.errorMessage}}*</div>
        </div>
        <div class = "register-btn">
        <button type="submit">Register</button>
        </div>

      </form>
    </b-card>
  </div>
  </div>

</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      redoPass: '',
      email: '',
      firstName: '',
      lastName: '',
      age: '',
      errorMessage: ''
    }
  },
  methods: {
    async registerUser() {
      try {
        if (this.redoPass !== this.password) {
          this.errorMessage = 'The passwords do not match, please reenter the passwords correctly'
          this.password = ''
          this.redoPass = ''
        } else if (this.age < 13 && this.age !== '') {
          this.errorMessage = 'You need to be atleast 13 to create an account'
        } else {
          await Api.post('/users', {
            username: this.username,
            password: this.password,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age
          })
          const redirect = confirm('Account created! Would you like to go to the login?')
          if (redirect) {
            this.$router.push('/')
          }
        }
      } catch (error) {
        if (error.response.status === 403) {
          this.errorMessage = 'Username is taken'
        } if (error.response.status === 422) {
          this.errorMessage = 'Missing parameters'
        } if (error.response.status === 500) {
          this.errorMessage = 'Failed to create an account'
        } else {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.Background{
  color: rgb(36,124,125);
}
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
.register-container {
  align-items: center;
  margin-top:20%;
  margin-left:2%;
}
.input-tag {
  margin-left: 0%;
  margin-right: 10%;
}
.register-btn{
margin-left:25%;
margin-top:10%
}
.form-contents{
margin-left:10%;
}
.error-text{
color:red;
}

</style>
