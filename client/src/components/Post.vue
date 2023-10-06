<template>
    <div>
      <b-card
        :title="truncatedPostName"
        :img-src="`http://localhost:3000/api/v1/posts/image/${post._id}`"
        img-alt="Food Image"
        img-height="400"
        img-top
        tag="article"
        style="max-width: 30rem;"
        class="mb-2 post-card"
        >
        <b-card-text>
          {{ truncatedDescription }}
        </b-card-text>
      </b-card>
    </div>
</template>

<script>
export default ({
  name: 'post',
  props: ['post'],
  computed: {
    truncatedPostName: function () {
      console.log(`http://localhost:3000/api/v1/posts/image/${this.post._id}`)
      if (this.post.postName.length < 18) {
        return this.post.postName
      }
      return this.post.postName.substring(0, 18) + '..'
    },
    truncatedDescription: function () {
      if (!this.post.description) {
        return 'No Description'
      } else if (this.post.description.length < 20) {
        return this.post.description
      } else {
        return this.post.description.substring(0, 20) + '..'
      }
    }
  }
})
</script>

<style scoped>
  .post-card img{
    object-fit: cover;
  }
</style>
