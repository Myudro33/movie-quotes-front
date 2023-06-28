<template>
  <div class="flex xs:flex-col md:flex-row mt-6 pb-6 border-b border-b-[#EFEFEF4D]">
    <img
      class="xs:w-10 xs:h-10 md:w-[3.25rem] md:h-[3.25rem] object-cover shrink-0 rounded-full"
      :src="commentAuthorAvatar"
      alt="avatar"
    />
    <div class="md:ml-6">
      <h1 class="text-white md:text-xl mt-3 font-semibold">
        {{ props.comment.author.username }}
      </h1>
      <p class="text-white md:text-xl mt-3">
        {{ props.comment.title }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['comment'])
const commentAuthorAvatar = computed(() => {
  return import.meta.env.VITE_API_IMAGE_ENDPOINT + props.comment.author.avatar
})
</script>
