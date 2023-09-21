<template>
  <div>
    <button v-if="course.editing" class="course-edit-btn" @click="saveCourse(course)">SAVE</button>
    <button v-else class="course-edit-btn" @click="editCourse(course)">✎</button>

    <p>
      <strong>Attendance:</strong>
      {{ attendanceRatio(course) }}
    </p>
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
    <p v-if="course.city">
      <strong>City:</strong>
      {{ course.city }}
    </p>
    <button v-if="isAttending()" @click="unAttend(course._id)" class="course-action-btn" >Unregister</button>
    <button v-else @click="attend(course._id)" class="course-action-btn" >Register</button>
  </div>
</template>

<script>
import { Api, errorHandler } from '@/Api'
import myFormatDate from '@/mixins/helpers'
import isAttending from '@/mixins/user'

export default {
  props: ['course'],
  methods: {
    attend(courseID) {
      Api.patch(`/attendance/${courseID}`, {}, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTBjNmFhNzdmNzNmNzA2ZTRkNDgwNTkiLCJpYXQiOjE2OTUzMTI5NzF9.ylIiwyTcG_nq5uej5yW8q2vEkcG1f_MG_9rMwHMBM_s'
        }
      }).then((response) => {
        console.log(response)
        this.loadCourses()
      }).catch(errorHandler)
    },
    unAttend(courseID) {
      Api.delete(`/attendance/${courseID}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTBjNmFhNzdmNzNmNzA2ZTRkNDgwNTkiLCJpYXQiOjE2OTUzMTI5NzF9.ylIiwyTcG_nq5uej5yW8q2vEkcG1f_MG_9rMwHMBM_s'
        }
      }).then((response) => {
        console.log(response)
        this.loadCourses()
      }).catch(errorHandler)
    },
    attendanceRatio(course) {
      const { attendees, maxAttendees } = course
      return `${attendees.length}/${maxAttendees}`
    },
    durationStr(duration) {
      if (!duration) return ''
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60

      let result = ''
      if (hours > 0) result += `${hours} hours `
      if (minutes > 0) result += `${minutes} minutes`

      return result
    },
    editCourse(course) {
      course.editing = true
      this.$forceUpdate()
    },
    saveCourse(course) {
      course.editing = false
      this.$forceUpdate()
    }
  },
  mixins: [myFormatDate, isAttending]
}
</script>
