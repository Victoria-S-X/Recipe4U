<template>
  <div id="app">

    <!-- TODO: hide when not logged in -->
    <div id="nav" v-if="showNavBar()">
      <navbar></navbar>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default ({
  mounted() {
    console.log('App mounted.', this.$route.path)
  },
  methods: {
    showNavBar() {
      const path = this.$route.path

      return !(
        path === '/' ||
        path === '/register'
      )
    }
  },
  components: {
    Navbar
  }
})
</script>

<style>

:root {
  --primary-color: #EB6A1A;
  --primary-dark: #277c7d;

}

body {
  background-color: #f5f3f0 !important;
}

#app {
  background-color: #f5f3f0;
}

</style>
