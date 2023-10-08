<template>
  <div>
    <button class="course-action-btn course-edit-btn" @click="onSaveCoursePressed(course)">SAVE</button>
    <button class="course-action-btn course-save-btn" @click="onDeleteCoursePressed(course)">DELETE</button>

    <!-- I know about v-model, it doesn't allow me to use it in this specific case -->
    <p class="keyValues">
      <strong>Max Attendees:</strong>
      <input type="number" ref="maxAttendees" :value="course.maxAttendees"/>

      <strong>Meeting Link:</strong>
      <input type="text" ref="meetingLink" :value="course.meetingLink" />

      <strong>City:</strong>
      <input type="text" ref="city" :value="course.city" />

      <strong>Address:</strong>
      <input type="text" ref="address" :value="course.address" />

      <strong>Start:</strong>
      <input type="datetime-local" ref="start" :value="this.myFormatDate(course.start, 'T')"/>

      <strong>Duration:</strong>
      <input type="number" ref="duration" :value="course.duration" />
    </p>
  </div>
</template>

<script>
import { errorHandler } from '@/Api'
import helpers from '@/helpers'
import courseMixin from '@/controllers/course'
import courseItemStyle from '@/styles/courseItem.css'

export default {
  props: {
    course: Object
  },
  methods: {
    onSaveCoursePressed(course) {
      course.maxAttendees = this.$refs.maxAttendees.value
      course.meetingLink = this.$refs.meetingLink.value
      course.city = this.$refs.city.value
      course.address = this.$refs.address.value
      course.start = this.$refs.start.value
      course.duration = this.$refs.duration.value
      course.userID = this.getUser()._id

      const method = course._id ? this.putCourse : this.postCourse

      method(course).then((response) => {
        course._id = response?.data._id
        course.editing = false
        this.$emit('save')
      }).catch(errorHandler)
    },

    onDeleteCoursePressed(course) {
      if (!course._id) {
        this.$emit('delete')
        return
      }
      this.deleteCourse(course).then(() => {
        this.$emit('delete')
      }).catch(errorHandler)
    }
  },
  mixins: [courseMixin, helpers, courseItemStyle]
}
</script>

<style scoped>
.keyValues{
  display: grid;
  grid-template-columns: max-content 1fr;
  align-content: center;
  justify-content: center;
  row-gap: .4em;
  margin: 1em 10%;
  color: #0e4647;
}

.keyValues strong{
  text-align: right;
  padding-right: 10px;
}

.course-action-btn {
  font-size: 1.4em;
  border: none;
  top: .5em;
  background-color: transparent;
  color: var(--primary-color);
  position: absolute;
}

.course-edit-btn {
  right: .5em;
}

.course-save-btn {
  left: .5em;
}
</style>
