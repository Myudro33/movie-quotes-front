<template>
  <!-- large screens -->
  <div class="ml-[70px] w-72 lg:flex flex-col xs:hidden fixed">
    <div class="flex">
      <img
        class="w-[60px] h-[60px] rounded-full"
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
    <a href="/feed/">
      <div class="mt-10 px-3 flex items-center">
        <HouseIcon :color="feed.route === '/feed/' ? '#E31221' : '#fff'" />
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
  <!-- small screen -->
  <div
    :hidden="sidebarStore.isHidden"
    class="md:hidden w-full h-full bg-[#11101A] absolute z-[100] p-14"
  >
    <LanguageSwitch />
    <div class="flex items-center">
      <img
        class="w-10 h-10 rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxazzXBuYA1QspMPnqi7BlvoK8FASFVNRtmQ&usqp=CAU"
        alt="avatar"
      />
      <div class="ml-6">
        <h1 v-if="authStore.author" class="text-2xl text-white font-normal">
          {{ authStore.author.username }}
        </h1>
        <a
          @click="sidebarStore.isHidden = true"
          href="/feed/edit-profile"
          class="text-[#CED4DA]"
          >{{ $t("feed.edit_profile") }}</a
        >
      </div>
    </div>
    <a @click="sidebarStore.isHidden = true" href="/feed/">
      <div class="mt-10 flex items-center">
        <HouseIcon :color="feed.route === '/feed/' ? '#E31221' : '#fff'" />
        <h1 class="ml-11 text-2xl text-white">{{ $t("feed.news_feed") }}</h1>
      </div>
    </a>
    <a @click="sidebarStore.isHidden = true" href="/feed/films">
      <div class="mt-10 flex items-center">
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
import { useSidebarStore } from "../stores/SidebarStore";
import LanguageSwitch from "./LanguageSwitch.vue";
const sidebarStore = useSidebarStore();
const feed = reactive({
  route: router.currentRoute.value.fullPath,
});
const authStore = useAuthStore();
</script>
