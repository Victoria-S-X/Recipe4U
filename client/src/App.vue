<template>
  <div id="app">
    <div id="nav">
      <navbar></navbar>
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
