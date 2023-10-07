<template>
  <div class="container">
    <Courses getFrom="userAttendance"></Courses>
  </div>
</template>

<script>

import Courses from '@/components/Courses.vue'

export default {
  components: {
    Courses
  }
}

</script>
