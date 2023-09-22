<template>
  <div class="root">
    <div v-for="course in courses" :key="course._id" class="course-item">
      <CourseEdit v-if="course.editing" :course="course" @save="reload()" @delete="deleteCourse(course)"/>
      <CourseView v-else :course="course" @edit="reload()"/>
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

import { errorHandler } from '@/Api'
import course from '@/mixins/courses'
import addBtn from '@/styles/addBtn.css'
import CourseView from '@/components/CourseView.vue'
import CourseEdit from '@/components/CourseEdit.vue'

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
    addCourse() {
      this.courses.push({
        editing: true,
        start: new Date(),
        duration: 60,
        maxAttendees: 3,
        attendees: [],
        _id: null,
        postID: '650c6aa97f73f706e4d48072'
      })
    },
    reload() {
      this.$forceUpdate()
    },
    deleteCourse(course) {
      this.courses.splice(this.courses.indexOf(course), 1)
      this.reload()
    }
  },
  mixins: [course],
  styles: [addBtn],
  components: {
    CourseView,
    CourseEdit
  }
}

</script>

<style>

.root {
  text-align: center;
}

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
  display: grid
}

.add-course-btn {
  margin: 0 auto;
}

</style>
