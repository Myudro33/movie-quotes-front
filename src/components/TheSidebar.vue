<template>
  <div
    :class="`md:ml-[70px] xs:h-full md:h-auto xs:w-full md:w-72 xs:bg-[#11101A] md:bg-transparent xs:p-6 md:p-0  z-30 md:flex flex-col xs:${
      sidebarStore.isHidden ? 'hidden' : 'flex'
    } xs:absolute md:fixed`"
  >
    <LanguageSwitch class="md:hidden" />
    <div class="flex justify-between">
      <div class="flex">
        <img
          class="w-[60px] h-[60px] object-cover rounded-full"
          :src="authStore.author.avatar"
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
      <button
        @click="authStore.logout()"
        type="submit"
        class="text-white md:hidden rounded-[4px] border border-white w-24 h-9"
      >
        {{ $t("forms.log_out") }}
      </button>
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
