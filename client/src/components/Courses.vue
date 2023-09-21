<template>
  <div>
    <div v-for="course in courses" :key="course._id" class="course-item">

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
    <div v-if="!courses.length">
      <p>No available courses</p>
    </div>
    <div class="button-container">
      <div class="btn-white-block">
        <button class="add-item-btn add-course-btn" @click="addCourse()">+</button>
      </div>
    </div>
  </div>
</template>

<script>

import { Api, errorHandler } from '@/Api'
import isAttending from '@/mixins/user'
import course from '@/mixins/courses'
import myFormatDate from '@/mixins/helpers'
import addBtn from '@/styles/addBtn.css'

export default {
  mounted() {
    this.loadCourses()
  },
  data() {
    return {
      courses: []
    }
  },
  methods: {
    loadCourses() {
      this.getVacantCourses('650c6aa97f73f706e4d48072').then((response) => {
        this.courses = response.data
      }).catch(errorHandler)
    },
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
    },
    addCourse() {
      this.courses.push({
        editing: true,
        start: new Date(),
        duration: 0,
        maxAttendees: 0,
        attendees: []
      })
    }
  },
  mixins: [isAttending, myFormatDate, course],
  styles: [addBtn]
}

</script>

<style>

.course-item {
  margin: 1em auto;
  max-width: 50em;
  border: .08em solid #838383;
  padding: 2em 8%;
  position: relative;
  box-shadow: .05em .05em .2em #838383dd;
}

.course-action-btn {
  background-color: #fff;
  padding: .3em 2em;
  border: .12em solid #838383;
  transition: box-shadow .1s;
}

.course-action-btn:hover {
  box-shadow: .12em .12em .12em #838383;
}

.course-action-btn:active {
  box-shadow: none;
}

.button-container {
  border-bottom: .1em solid #838383;
  max-width: 30em;
  margin: 0 auto 3em auto;
}

.btn-white-block {
  background-color: #fff;
  width: 5em;
  margin: 0 auto;
  transform: translateY(1.5em);
}

.course-edit-btn {
  position: absolute;
  right: .5em;
  top: .5em;
  font-size: 1.4em;
  border: none;
  background-color: transparent;
}

</style>
