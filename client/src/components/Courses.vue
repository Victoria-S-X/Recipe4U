<template>
  <div>
    <div v-for="course in courses" :key="course._id">
      {{ getAttendanceInfoString(course) }}
      {{ myFormatDate(course.start) }}
      <button v-if="isAttending()" @click="unAttend(course._id)" >Unregister</button>
      <button v-else @click="attend(course._id)" >Register</button>
    </div>
  </div>
</template>

<script>

import { Api, errorHandler } from '@/Api'
import isAttending from '@/mixins/user'
import course from '@/mixins/course'
import myFormatDate from '@/mixins/helpers'

export default {
  mounted() {
    this.getVacantCourses('f').then((response) => {
      this.courses = response.data
    }).catch(errorHandler)
  },
  data() {
    return {
      courses: []
    }
  },
  methods: {
    attend(courseID) {
      Api.patch(`/attendance/${courseID}`, {}, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTA5ZDQ1MzM3NGRkMzcwOTg4ODA2YzMiLCJpYXQiOjE2OTUxNDI5OTZ9.dOJ6CMBgcYb7Q0eRGtbpkxo8DyuE-8SLxUsYHQe0MRE'
        }
      }).then((response) => {
        console.log(response)
      }).catch(errorHandler)
    },
    unAttend(courseID) {
      Api.delete(`/attendance/${courseID}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTA5ZDQ1MzM3NGRkMzcwOTg4ODA2YzMiLCJpYXQiOjE2OTUxNDI5OTZ9.dOJ6CMBgcYb7Q0eRGtbpkxo8DyuE-8SLxUsYHQe0MRE'
        }
      }).then((response) => {
        console.log(response)
      }).catch(errorHandler)
    }
  },
  mixins: [isAttending, myFormatDate, course]
}

</script>
