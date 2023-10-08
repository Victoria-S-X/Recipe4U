<template>
  <div>
    <h3>My Posts</h3>
    <div class="postListContainer">
      <PostsList getFrom="userPosted"/>
    </div>

    <h3>Attending Courses</h3>
    <Courses getFrom="userAttendance"></Courses>

    <h3>Posted Courses</h3>
    <Courses getFrom="user"></Courses>
  </div>

</template>

<script>

import Courses from '@/components/Course/Courses.vue'
import PostsList from '@/components/PostsList.vue'

export default {
  components: {
    PostsList,
    Courses
  }
}

</script>

<style scoped>

.postListContainer {
  margin: 0 3%;
}

</style>
