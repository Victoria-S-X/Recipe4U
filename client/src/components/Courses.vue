<template>
  <div>
    <div v-for="course in courses" :key="course._id" class="course-item">
      <p>{{ getAttendanceInfoString(course) }}</p>
      <p>
        <span>
          <strong>Starting:</strong>
          {{ myFormatDate(course.start) }},
        </span>
        <span>
          <strong>Duration:</strong>
          {{ durationStr(course.duration) }}
        </span>
      </p>
      <button v-if="isAttending()" @click="unAttend(course._id)" >Unregister</button>
      <button v-else @click="attend(course._id)" >Register</button>
    </div>
  </div>
</template>

<script>

import { Api, errorHandler } from '@/Api'
import isAttending from '@/mixins/user'
import course from '@/mixins/courses'
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
    },
    getAttendanceInfoString(course) {
      const { attendees, maxAttendees } = course
      return `Attendees: ${attendees.length}/${maxAttendees}`
    },
    durationStr(duration) {
      if (!duration) return ''
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60

      let result = ''
      if (hours > 0) result += `${hours} hours `
      if (minutes > 0) result += `${minutes} minutes`

      return result
    }
  },
  mixins: [isAttending, myFormatDate, course]
}

</script>

<style>

.course-item{
  margin: 3em 0;
  border: .15em solid #838383;
  padding: 3em 8%;
}

</style>
