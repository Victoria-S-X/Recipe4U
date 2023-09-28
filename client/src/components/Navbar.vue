<template>
    <div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="/posts">Recipe4U</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav>
        <b-nav-item href="/posts">Posts</b-nav-item>
        <b-nav-item href="/posts/creation">Create Post</b-nav-item>
        <b-nav-item href="/posted-courses">Posted Courses</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{getUser().username}}</em>
          </template>

          <b-dropdown-item href="#" @click="onSignOut()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import user from '@/mixins/user'
import auth from '@/mixins/auth'

export default {
  methods: {
    onSignOut() {
      this.signOut()

      this.$router.replace('/')
    }
  },
  mixins: [user, auth]
}
</script>
