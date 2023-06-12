import CommentIcon from './icons/CommentIcon.vue';

<template>
  <div class="w-full flex flex-col bg-[#11101A] rounded-xl md:p-6 xs:p-8 mt-6">
    <div class="flex items-center">
      <img
        class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAU3eZR3MYzpxRl4lBB40Pmx3gBefdpCArQ&usqp=CAU"
        alt="avatar"
      />
      <h1 class="text-white md:text-xl ml-3">Maia Nakashidze</h1>
    </div>
    <p class="text-white md:text-xl mt-4">
      “Follow your dream.”movie- Billy Elliot. (2000)
    </p>
    <img
      class="w-full md:h-[500px] xs:h-48 mt-7"
      src="https://media.istockphoto.com/id/1450589820/photo/group-of-people-watching-a-movie-outdoors.webp?b=1&s=170667a&w=0&k=20&c=yuORtZmxMDC1IDmuYQZHpLNuOemOJ2iBXd5-rhYx6Gs="
      alt="quote"
    />
    <div class="flex xs:h-16 md:h-20 items-center border-b border-b-[#EFEFEF4D]">
      <div class="flex">
        <p class="text-white text-xl mr-2">3</p>
        <CommentIcon />
      </div>
      <div class="flex ml-6">
        <p class="text-white text-xl mr-2">10</p>
        <HeartIcon />
      </div>
    </div>
    <div class="flex xs:flex-col md:flex-row mt-6 pb-6 border-b border-b-[#EFEFEF4D]">
      <img
        class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover shrink-0 rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAU3eZR3MYzpxRl4lBB40Pmx3gBefdpCArQ&usqp=CAU"
        alt="avatar"
      />
      <div class="md:ml-6">
        <h1 class="text-white md:text-xl mt-3 font-semibold">Maia Nakashidze</h1>
        <p class="text-white md:text-xl mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel
          massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl
          et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget.
        </p>
      </div>
    </div>
    <div class="flex xs:flex-col md:flex-row mt-6 pb-6 border-b border-b-[#EFEFEF4D]">
      <img
        class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover shrink-0 rounded-full"
        :src="store.avatar"
        alt="avatar"
      />
      <div class="md:ml-6">
        <h1 class="text-white md:text-xl mt-3 font-semibold">Maia Nakashidze</h1>
        <p class="text-white md:text-xl mt-3">
          Lorem ipsum dolor sit at moArcu vitae mauris odio eget.
        </p>
      </div>
    </div>
    <div class="flex items-center mt-6">
      <img
        class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover shrink-0 rounded-full"
        :src="store.avatar"
        alt="avatar"
      />
      <input
        class="w-full xs:h-10 md:h-[52px] ml-6 pl-6 text-white outline-none bg-[#24222F] text-xl rounded-[10px]"
        type="text"
        placeholder="Write a comment"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useAuthStore } from "../stores/AuthStore";
import CommentIcon from "./icons/CommentIcon.vue";
import HeartIcon from "./icons/HeartIcon.vue";
const authStore = useAuthStore();
const store = reactive({
  avatar: "",
});
onMounted(() => {
  authStore.getAvatar(store);
});
</script>
