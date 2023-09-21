<template>
    <div class=background>

    <span  class="tagline">Glad you chose to join our community!</span>
    <div   class="image-placeholder"></div>

     <div class="register-box"></div>
        <span  class="fname-tag">First name</span>
        <span  class="lname-tag"> Last name</span>
        <span  class="username-tag">username</span>
        <span  class="password-tag">password</span>
        <span  class="email-tag">email</span>
        <input  type = "text"     class="username-textbox" v-model="username">
        <input  type = "password" class="password-textbox" v-model="password">
        <input  type = "text"     class="fname-textbox"    v-model="firstName">
        <input  type = "text"     class="lname-textbox"    v-model="lastName">
        <input  type = "email"    class="email-textbox"    v-model="email">
        <button class="register-button" @click = registerUser()>Register</button>

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
      email: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    async registerUser() {
      Api.post('/users', {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      })
    }
  }
}
</script>

    <style scoped>
    .background {
    overflow:hidden;
    }
    .background {
    background-color:rgba(16.46874949336052, 197.62499392032623, 56.32314272224903, 1);
    width:100%;
    height:100%;
    position:absolute;
    }
    .tagline {
    color:rgba(255, 255, 255, 1);
    width:589px;
    height:243px;
    position:absolute;
    left:26px;
    top:20px;
    font-family:Francois One;
    text-align:left;
    font-size:70px;
    letter-spacing:0;
    line-height:px;
    }
    .image-placeholder {
    background-color:rgba(237.8288733959198, 252.87500202655792, 145.40311932563782, 1);
    width:610px;
    height:450px;
    position:absolute;
    left:47px;
    top:220px;
    }
    .register-box {
    background-color:rgba(255, 255, 255, 1);
    width:400px;
    height:650px;
    position:absolute;
    left:900px;
    top:20px;
    }
    .fname-tag {
    color:rgba(0, 0, 0, 1);
    width:143px;
    height:38px;
    position:absolute;
    left:950px;
    top:40px;
    font-family:Francois One;
    text-align:left;
    font-size:18px;
    letter-spacing:0;
    line-height:px;
    }
    .fname-textbox {
    background-color:rgba(217.0000022649765, 217.0000022649765, 217.0000022649765, 1);
    width:268px;
    height:47px;
    position:absolute;
    left: 950px;
    top:70px;
    }
    .fname-textbox {
    border:3px solid rgba(0, 0, 0, 1);
    }
    .lname-tag {
    color:rgba(0, 0, 0, 1);
    width:143px;
    height:38px;
    position:absolute;
    left:950px;
    top:140px;
    font-family:Francois One;
    text-align:left;
    font-size:18px;
    letter-spacing:0;
    line-height:px;
    }
    .lname-textbox {
    background-color:rgba(217.0000022649765, 217.0000022649765, 217.0000022649765, 1);
    width:268px;
    height:47px;
    position:absolute;
    left:950px;
    top:170px;
    }
    .lname-textbox {
    border:3px solid rgba(0, 0, 0, 1);
    }
    .username-tag {
    color:rgba(0, 0, 0, 1);
    width:143px;
    height:38px;
    position:absolute;
    left:950px;
    top:340px;
    font-family:Francois One;
    text-align:left;
    font-size:18px;
    letter-spacing:0;
    line-height:px;
    }
    .username-textbox {
    background-color:rgba(217.0000022649765, 217.0000022649765, 217.0000022649765, 1);
    width:268px;
    height:47px;
    position:absolute;
    left:950px;
    top:370px;
    }
    .username-textbox {
    border:3px solid rgba(0, 0, 0, 1);
    }
    .password-tag {
    color:rgba(0, 0, 0, 1);
    width:143px;
    height:38px;
    position:absolute;
    left:950px;
    top:440px;
    font-family:Francois One;
    text-align:left;
    font-size:18px;
    letter-spacing:0;
    line-height:px;
    }
    .password-textbox {
    background-color:rgba(217.0000022649765, 217.0000022649765, 217.0000022649765, 1);
    width:268px;
    height:47px;
    position:absolute;
    left:950px;
    top:470px;
    }
    .password-textbox {
    border:3px solid rgba(0, 0, 0, 1);
    }
    .email-tag {
    color:rgba(0, 0, 0, 1);
    width:143px;
    height:38px;
    position:absolute;
    left:950px;
    top:240px;
    font-family:Francois One;
    text-align:left;
    font-size:18px;
    letter-spacing:0;
    line-height:px;
    }
    .email-textbox {
    background-color:rgba(217.0000022649765, 217.0000022649765, 217.0000022649765, 1);
    width:268px;
    height:47px;
    position:absolute;
    left:950px;
    top:270px;
    }
    .email-textbox {
    border:3px solid rgba(0, 0, 0, 1);
    }
    .register-button {
    background-color:rgba(89.58203226327896, 152.4780508875847, 226.31249696016312, 1);
    width:213px;
    height:59px;
    position:absolute;
    left:980px;
    top:570px;
    border-radius:90px;
    }
    </style>
