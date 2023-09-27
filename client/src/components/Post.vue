<template>
    <div>
        <b-card
          :title="post.postName"
          :img-src="`http://localhost:3000/api/v1/posts/image/${post._id}`"
          img-alt="Food Image"
          img-height="400"
          img-top
          tag="article"
          style="max-width: 30rem;"
          class="mb-2"
        >
          <b-card-text>
            <p v-if="post.description.length < 15">{{ post.description }}</p>
            <p v-else>{{post.description.substring(0, 15) + ".."}}</p>
          </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default ({
  name: 'post',
  props: ['post']
})
</script>
