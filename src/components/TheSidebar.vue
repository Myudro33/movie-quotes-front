<template>
  <div class="ml-[70px] w-72 lg:flex flex-col xs:hidden fixed">
    <div class="flex">
      <img
        class="w-[60px] h-[60px] border border-black rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxazzXBuYA1QspMPnqi7BlvoK8FASFVNRtmQ&usqp=CAU"
        alt="avatar"
      />
      <div class="ml-6">
        <h1 v-if="authStore.author" class="text-2xl text-white font-normal">
          {{ authStore.author.username }}
        </h1>
        <a href="/feed/edit-profile" class="text-[#CED4DA]">{{
          $t("feed.edit_profile")
        }}</a>
      </div>
    </div>
    <a href="/feed/news">
      <div class="mt-10 px-3 flex items-center">
        <HouseIcon :color="feed.route === '/feed/news' ? '#E31221' : '#fff'" />
        <h1 class="ml-11 text-2xl text-white">{{ $t("feed.news_feed") }}</h1>
      </div>
    </a>
    <a href="/feed/films">
      <div class="mt-10 px-3 flex items-center">
        <CameraIcon :color="feed.route === '/feed/films' ? '#E31221' : '#fff'" />
        <h1 class="ml-11 text-2xl text-white">{{ $t("feed.movie_list") }}</h1>
      </div>
    </a>
  </div>
</template>

<script setup>
import HouseIcon from "./icons/HouseIcon.vue";
import CameraIcon from "./icons/CameraIcon.vue";
import { useAuthStore } from "../stores/AuthStore";
import { reactive } from "vue";
import router from "../router";
const feed = reactive({
  route: router.currentRoute.value.fullPath,
});
const authStore = useAuthStore();
</script>
