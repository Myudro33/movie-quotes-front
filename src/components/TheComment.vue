<template>
  <div class="flex xs:flex-col md:flex-row mt-6 pb-6 border-b border-b-[#EFEFEF4D]">
    <img
      class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover shrink-0 rounded-full"
      :src="comment?.author.avatar"
      alt="avatar"
    />
    <div class="md:ml-6">
      <h1 class="text-white md:text-xl mt-3 font-semibold">
        {{ comment?.author.username }}
      </h1>
      <p class="text-white md:text-xl mt-3">
        {{ comment?.title }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["comment"]);
</script>
