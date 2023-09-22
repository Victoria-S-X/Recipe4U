<template>
  <div>
    <button v-if="course.editing" class="course-edit-btn" @click="saveCourse(course)">SAVE</button>

    <!-- I know about v-model, it doesn't allow me to use it in this specific case -->
    <!-- TODO: use form -->
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
      <input type="datetime-local" ref="start" :value="course.start"/>
      <strong>Duration:</strong>
      <input type="number" ref="duration" :value="course.duration" />
    </p>
  </div>
</template>

<script>
import { errorHandler } from '@/Api'
import courseMixin from '@/mixins/course'

export default {
  props: {
    course: Object
  },
  methods: {
    saveCourse(course) {
      console.log(course)

      course.maxAttendees = this.$refs.maxAttendees.value
      course.meetingLink = this.$refs.meetingLink.value
      course.city = this.$refs.city.value
      course.address = this.$refs.address.value
      // course.start = this.$refs.start.value TODO
      course.duration = this.$refs.duration.value

      const method = course._id ? this.putCourse : this.postCourse

      method(course).then((response) => {
        course.editing = false
        this.$emit('save')
      }).catch(errorHandler)
    }
  },
  mixins: [courseMixin]
}
</script>

<style>
.keyValues{
  display: grid;
  grid-template-columns: max-content 1fr;
  align-content: center;
  justify-content: center;
  row-gap: .4em;
  margin: 1em 10%;
}

.keyValues strong{
  text-align: right;
  padding-right: 10px;
}
</style>
