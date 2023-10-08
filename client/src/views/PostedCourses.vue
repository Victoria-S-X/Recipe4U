<template>
  <div class="container">
    <Courses getFrom="user"></Courses>
  </div>
</template>

<script>

import Courses from '@/components/course/Courses.vue'

export default {
  components: {
    Courses
  }
}

</script>
