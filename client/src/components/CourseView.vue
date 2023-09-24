<template>
  <div>
    <button v-if="ownsCourse(course)" class="course-edit-btn" @click="editCourse(course)">✎</button>

    <p>
      <strong>Attendance:</strong>
      {{ attendanceRatioStr }}
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
    <button v-if="isAttendingBool === true" @click="onUnAttend()" class="course-action-btn" >Unregister</button>
    <button v-else-if="isAttendingBool === false" @click="onAttend()" class="course-action-btn" >Register</button>
  </div>
</template>

<script>
import { errorHandler } from '@/Api'
import myFormatDate from '@/mixins/helpers'
import user from '@/mixins/user'
import course from '@/mixins/course'

export default {
  props: {
    course: Object,
    reload: Function
  },
  data() {
    return {
      isAttendingBool: undefined,
      attendanceRatioStr: this.attendanceRatio()
    }
  },
  mounted() {
    this.isAttending()
  },
  methods: {
    onAttend() {
      this.attend(this.course).then((_) => {
        this.isAttendingBool = true
        this.attendanceRatioStr = this.attendanceRatio()
      }).catch(errorHandler)
    },
    onUnAttend() {
      this.unattend(this.course).then((_) => {
        this.isAttendingBool = false
        this.attendanceRatioStr = this.attendanceRatio()
      }).catch(errorHandler)
    },
    attendanceRatio() {
      const { attendees, maxAttendees } = this.course
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
      this.$emit('onEdit')
    },
    isAttending() {
      this.isAttendingAsync(this.course).then((response) => {
        this.isAttendingBool = response
      })
    }
  },
  mixins: [myFormatDate, user, course]
}
</script>
