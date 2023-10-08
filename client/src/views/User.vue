<template>
  <div>
    <h3>My Posts</h3>
    <PostsList getFrom="userPosted"/>

    <h3>Attending Courses</h3>
    <Courses getFrom="userAttendance"></Courses>

    <h3>Posted Courses</h3>
    <Courses getFrom="user"></Courses>
  </div>

</template>

<script>

import Courses from '@/components/course/Courses.vue'
import PostsList from '@/components/PostsList.vue'

export default {
  components: {
    PostsList,
    Courses
  }
}

</script>
