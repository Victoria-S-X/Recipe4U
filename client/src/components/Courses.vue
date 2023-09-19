<template>
  <div>
    <div v-for="course in courses" :key="course._id">
      {{ course._id }}
      <button @click="attend(course._id)" >Attend</button>
    </div>
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  mounted() {
    Api.get('/posts/6509d455374dd370988806dc/courses', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTA5ZDQ1MzM3NGRkMzcwOTg4ODA2YzMiLCJpYXQiOjE2OTUxNDI5OTZ9.dOJ6CMBgcYb7Q0eRGtbpkxo8DyuE-8SLxUsYHQe0MRE'
      }
    }).then((response) => {
      this.courses = response.data
    })
  },
  data() {
    return {
      courses: []
    }
  },
  methods: {
    attend(courseID) {
      console.log('attend', courseID)
      Api.patch(`/attendance/${courseID}`, {}, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTA5ZDQ1MzM3NGRkMzcwOTg4ODA2YzMiLCJpYXQiOjE2OTUxNDI5OTZ9.dOJ6CMBgcYb7Q0eRGtbpkxo8DyuE-8SLxUsYHQe0MRE'
        }
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error, error.response)
      })
    }
  }
}

</script>
