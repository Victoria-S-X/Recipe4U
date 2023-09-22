<template>
    <div class="Background">
        <span  class="tagline">Master the Art of Cooking.</span>
        <span  class="tagline-2">at</span>
        <span  class="Brand-Name">FOOD4U</span>

    <div   class="login-background"></div>
        <span  class="Login-tag">Login</span>

            <span  class="username-tag">Username:</span>
            <input type = "text" class="username-textbox" v-model="username">

            <span  class="password-tag">Password:</span>
            <input type = "text"  class="password-textbox" v-model="password">

            <button class="login-button-tag" @click = logInUser()>Log-in</button>

            <button class="register-button-tag" @click = goToRegister()>Register</button>
            <span  class="login-options">or</span>
    </div>
</template>
<script>
import AuthenticationService from '@/AuthenticationService'
export default {
  name: 'Welcome',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods:
{
  async logInUser() {
    const response = await AuthenticationService.register({
      username: this.username,
      password: this.password
    })
    localStorage.setItem('token', 'Bearer ' + response.data.jwt) // store login token
    console.log(response)
  },
  goToRegister() {
    this.$router.push('/Welcome/Register')
  }

}
}
</script>

<style>
.Background { overflow:hidden;}
.Background {
background-color:rgba(16.46874949336052, 197.62499392032623, 56.32314272224903, 1);
width: 100%;
height:100%;
position:absolute;
}
.Brand-Name {
color:rgba(255, 255, 255, 1);
width:457px;
height:170px;
position:absolute;
left:315px;
top:391px;
font-family:Francois One;
text-align:left;
font-size:100px;
letter-spacing:0;
}
.tagline {
color:rgba(255, 255, 255, 1);
width:201px;
height:109px;
position:absolute;
left:326px;
top:45px;
font-family:Francois One;
text-align:left;
font-size:52.4px;
letter-spacing:0;
}
.tagline-2 {
color:rgba(255, 255, 255, 1);
width:59px;
height:99px;
position:absolute;
left:326px;
top:290px;
font-family:Francois One;
text-align:left;
font-size:70px;
letter-spacing:0;
}
.login-background {
background-color:rgba(255, 255, 255, 1);
width:408px;
height:546px;
position:absolute;
left:822px;
top:100px;
}
.username-tag {
color:rgba(12.750000189989805, 12.165624797344208, 12.165624797344208, 1);
width:99px;
height:24px;
position:absolute;
left:835px;
top:196px;
font-family:Francois One;
text-align:left;
font-size:20px;
letter-spacing:0;
line-height:px;
}
.username-textbox {
box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
background-color:rgba(245.00000059604645, 245.00000059604645, 245.00000059604645, 1);
width:366px;
height:39px;
position:absolute;
left:835px;
top:234px;
}

.password-textbox {
box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
background-color:rgba(245.00000059604645, 245.00000059604645, 245.00000059604645, 1);
width:366px;
height:39px;
position:absolute;
left:835px;
top:339px;
}

.password-tag {
color:rgba(12.750000189989805, 12.165624797344208, 12.165624797344208, 1);
width:105px;
height:23px;
position:absolute;
left:839px;
top:304px;
font-family:Francois One;
text-align:left;
font-size:20px;
letter-spacing:0;
line-height:px;
}
.Login-tag {
color:rgba(0, 0, 0, 1);
width:92px;
height:32px;
position:absolute;
left:835px;
top:130px;
font-family:Francois One;
text-align:left;
font-size:35px;
letter-spacing:0;
line-height:px;
}
.register-button-tag {
background-color:rgba(89.58203226327896, 152.4780508875847, 226.31249696016312, 1);
width:200px;
height:74px;
position:absolute;
left:917px;
top:510px;
font-weight: bolder;
border-top-left-radius:90px;
border-top-right-radius:90px;
border-bottom-left-radius:90px;
border-bottom-right-radius:90px;
}

.login-options {
color:rgba(0, 0, 0, 1);
width:25px;
height:32px;
position:absolute;
left:1005px;
top:460px;
font-family:Inter;
text-align:left;
font-size:24px;
letter-spacing:0;
line-height:px;
}
.login-button-tag {
box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
background-color:rgba(237.8288733959198, 252.87500202655792, 145.40311932563782, 1);
width:200px;
height:60px;
position:absolute;
left:915px;
top:390px;
border-top-left-radius:90px;
border-top-right-radius:90px;
border-bottom-left-radius:90px;
border-bottom-right-radius:90px;
}
</style>
