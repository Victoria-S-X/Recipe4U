<template>
  <div>
    <button v-if="course.editing" class="course-edit-btn" @click="saveCourse(course)">SAVE</button>

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
      <input type="date" ref="start" :value="course.start.toString()"/>
      <strong>Duration:</strong>
      <input type="number" ref="duration" :value="course.duration" />
    </p>
  </div>
</template>

<script>
import { Api, errorHandler } from '@/Api'

export default {
  props: {
    course: Object
  },
  methods: {
    saveCourse(course) {
      Api.put(`/courses/${course._id}`, {
        postID: course.postID,
        userID: course.userID,
        maxAttendees: this.$refs.maxAttendees.value,
        meetingLink: this.$refs.meetingLink.value,
        city: this.$refs.city.value,
        address: this.$refs.address.value,
        start: course.start, // TODO: not hard code
        duration: this.$refs.duration.value
      }, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTBjNmFhNzdmNzNmNzA2ZTRkNDgwNTkiLCJpYXQiOjE2OTUzMTI5NzF9.ylIiwyTcG_nq5uej5yW8q2vEkcG1f_MG_9rMwHMBM_s'
        }
      }).then((response) => {
        console.log(response)
        course.maxAttendees = this.$refs.maxAttendees.value
        course.meetingLink = this.$refs.meetingLink.value
        course.city = this.$refs.city.value
        course.address = this.$refs.address.value
        course.start = this.$refs.start.value
        course.duration = this.$refs.duration.value

        course.editing = false

        this.$emit('save')
      }).catch(errorHandler)
    }
  }
}
</script>

<style>
.keyValues{
  display: grid;
  grid-template-columns: max-content 1fr;
  align-content: center;
  justify-content: center;
  margin: 1em 10%;
}

.keyValues strong{
  text-align: right;
  padding-right: 10px;
}
</style>
