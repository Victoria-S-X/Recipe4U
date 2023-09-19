<template>
  <p>Hi bro</p>
</template>

<script>
import { Api } from '@/Api'

export default {
  mounted() {
    console.log('mounted')

    Api.get('/posts/6509d455374dd370988806dc/courses', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTA5ZDQ1MzM3NGRkMzcwOTg4ODA2YzMiLCJpYXQiOjE2OTUxNDI5OTZ9.dOJ6CMBgcYb7Q0eRGtbpkxo8DyuE-8SLxUsYHQe0MRE'
      }
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error, 'whoops')
    })
  }
}

console.log('Hello')

</script>
