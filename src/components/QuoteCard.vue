<template>
  <div class="w-full flex flex-col bg-[#11101A] rounded-xl md:p-6 xs:p-8 mt-6">
    <div class="flex items-center">
      <img
        class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover rounded-full"
        :src="quote.user?.avatar"
        alt="avatar"
      />
      <h1 class="text-white md:text-xl ml-3">{{ quote.user?.username }}</h1>
    </div>
    <p class="text-white md:text-xl mt-4">
      “{{ quote.title?.en }}”
      <span class="text-[#DDCCAA] cursor-pointer">{{ quote.movie?.name.en }}</span> ({{
        quote.movie?.year
      }})
    </p>
    <img class="w-full md:h-[500px] xs:h-48 mt-7" :src="quote.image" alt="quote" />
    <div class="flex xs:h-16 md:h-20 items-center border-b border-b-[#EFEFEF4D]">
      <div class="flex">
        <p class="text-white text-xl mr-2">{{ quote?.comments.length }}</p>
        <CommentIcon />
      </div>
      <div class="flex ml-6">
        <p class="text-white text-xl mr-2">10</p>
        <HeartIcon />
      </div>
    </div>
    <TheComment v-for="(item, index) in quote?.comments" :comment="item" :key="index" />
    <div class="flex items-center mt-6">
      <img
        class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover text-white shrink-0 rounded-full"
        :src="authStore.author.avatar"
        alt="avatar"
      />
      <input
        class="w-full xs:h-10 md:h-[52px] ml-6 pl-6 outline-none bg-[#24222F] text-xl rounded-[10px]"
        type="text"
        placeholder="Write a comment"
      />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/AuthStore";
import CommentIcon from "./icons/CommentIcon.vue";
import HeartIcon from "./icons/HeartIcon.vue";
import TheComment from "./TheComment.vue";
const props = defineProps(["quote"]);
const authStore = useAuthStore();
</script>
