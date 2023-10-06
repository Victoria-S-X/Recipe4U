<template>
  <div>
    <button v-if="ownsCourse(course)" class="edit-btn" @click="editCourse(course)">✎</button>

    <div class="info-container">
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
    </div>

    <button v-if="isAttendingBool === true" @click="onUnAttend()" class="attendance-btn" >Unregister</button>
    <button v-else-if="isAttendingBool === false && !ownsCourse(course)" @click="onAttend()" class="attendance-btn" >Register</button>
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

<style scoped>

/* ------------------------------ INFO CONTENT ------------------------------ */

.info-container {
  line-height: 1.2em;
  margin-top: 1em;
  letter-spacing: .04em;
  color: #0e4647;
}

.info-container span {
  margin: 0 0.2em;
}

.info-container strong {
  font-weight: 600;
}

/* --------------------------- EDIT COURSE BUTTON --------------------------- */

.edit-btn {
  position: absolute;
  right: .5em;
  top: .5em;
  font-size: 1.5em;
  font-weight: 500;
  border: none;
  background-color: transparent;
  color: var(--primary-color);
}

/* ----------------------------- ATTENDANCE BTN ----------------------------- */

.attendance-btn {
  margin-top: 0.5em;
  color: var(--primary-color);
  background-color: #fcffff;
  padding: .4em 2.7em;
  font-weight: 400;
  border: .1em solid var(--primary-color);
  letter-spacing: .06em;
  transition: background-color .3s, color .25s;
}

.attendance-btn:active {
  box-shadow: none;
  background-color: var(--primary-color);
  color: #fcffff;
}

</style>
