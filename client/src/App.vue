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
  --primary-background: #f5f3f0;
  --soft-white: #fcffff;

}

body {
  background-color: var(--primary-background) !important;
}

#app {
  background-color: var(--primary-background);
}

</style>
