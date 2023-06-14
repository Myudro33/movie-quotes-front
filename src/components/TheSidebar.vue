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
          <RouterLink to="/feed/edit-profile" class="text-[#CED4DA]">{{
            $t("feed.edit_profile")
          }}</RouterLink>
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
    <RouterLink to="/feed">
      <div class="mt-10 px-3 flex items-center">
        <HouseIcon :color="route.path === '/feed' ? '#E31221' : '#fff'" />
        <h1 class="ml-11 text-2xl text-white">{{ $t("feed.news_feed") }}</h1>
      </div>
    </RouterLink>
    <RouterLink to="/feed/films">
      <div class="mt-10 px-3 flex items-center">
        <CameraIcon :color="route.path === '/feed/films' ? '#E31221' : '#fff'" />
        <h1 class="ml-11 text-2xl text-white">{{ $t("feed.movie_list") }}</h1>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import HouseIcon from "./icons/HouseIcon.vue";
import CameraIcon from "./icons/CameraIcon.vue";
import { useAuthStore } from "../stores/AuthStore";
import { useSidebarStore } from "../stores/SidebarStore";
import LanguageSwitch from "./LanguageSwitch.vue";
import { useRoute } from "vue-router";
const sidebarStore = useSidebarStore();
const route = useRoute()
const authStore = useAuthStore();
</script>
