<template>
  <div class="root" ref="root">
    <div v-for="course in courses" :key="course._id" class="course-item">
      <CourseEdit v-if="course.editing" :course="course" @save="reload()" @delete="onDeleteCourse(course)"/>
      <CourseView v-else :course="course" @onEdit="reload()"/>
    </div>
    <div v-if="!courses.length" class="no-courses-container">
      <p v-if="userOwnsPost()">No courses posted</p>
      <p v-else>No available courses</p>
    </div>
    <div v-if="getFrom === 'post' && userOwnsPost()" class="button-container">
      <div class="btn-white-block">
        <button class="add-item-btn add-course-btn" @click="addCourse()">+</button>
      </div>
    </div>
    <div v-else-if="getFrom === 'user'" class="button-container">
      <div class="btn-white-block">
        <button class="add-item-btn add-course-btn" @click="onDeleteCourses()">🗑</button> <!-- TODO: rename classes-->
      </div>
    </div>
  </div>
</template>

<script>

import { errorHandler } from '@/Api'
import user from '@/mixins/user'
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
      const method = this.getFrom === 'post' ? this.getVacantCourses : this.getMyCourses
      method(this.postID).then((response) => {
        this.courses = response.data
      }).catch(errorHandler)
    },
    userOwnsPost() {
      const user = this.getUser()
      if (!this.userID) return false

      return user._id === this.userID
    },
    addCourse() {
      this.courses.push({
        editing: true,
        start: new Date(),
        duration: 60,
        maxAttendees: 3,
        attendees: [],
        _id: null,
        postID: this.postID
      })
    },
    reload() {
      this.$forceUpdate()
    },
    onDeleteCourse(course) {
      this.courses.splice(this.courses.indexOf(course), 1)
      this.reload()
    },
    onDeleteCourses() {
      if (confirm('Are you sure you want to delete ALL courses?')) {
        this.courses = []
        this.deleteCourses()
        this.reload()
      }
    }
  },
  mixins: [course, user],
  styles: [addBtn],
  components: {
    CourseView,
    CourseEdit
  },
  props: {
    getFrom: String,
    postID: String,
    userID: String
  }
}

</script>

<style scoped>

.root {
  margin-top: 1.3em;
  text-align: center;
}

.course-item {
  margin: 0 auto 1.3em auto;
  max-width: 50em;
  border: .1em solid var(--primary-dark);
  padding: 2.2em 12%;
  position: relative;
  box-shadow: .02em .02em .1em #838383dd;
  transition: box-shadow .2s;
  background-color: #fcffff;
}

.course-item:hover {
  box-shadow: .09em .09em .23em #838383dd;
}

.no-courses-container{
  margin: 2em;
}

/* --------------------------- END OF LIST BUTTON --------------------------- */
.button-container {
  border-bottom: .1em solid var(--primary-dark);
  max-width: 30em;
  margin: 0 auto 3em auto;
}

.btn-white-block {
  background-color: #f5f3f0;
  width: 5em;
  margin: 0 auto;
  transform: translateY(1.5em);
  display: grid
}

.add-course-btn {
  color: var(--primary-color);
  border-color: var(--primary-color);
  margin: 0 auto;
  font-weight: 500;
  background-color: #fcffff;
}

</style>
