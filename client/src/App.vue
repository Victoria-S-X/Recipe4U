<template>
  <div id="app">
    <div id="nav">
      <navbar></navbar>
      <router-link to="/">Home</router-link>
      <router-link to="/">Welcome</router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default ({
  components: {
    Navbar
  }
})
</script>
