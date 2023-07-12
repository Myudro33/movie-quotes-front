<template>
  <div class="xs:hidden md:flex md:w-96 h-full"></div>
  <div
    :class="`md:ml-[4.375rem] xs:h-full md:h-auto xs:w-full md:w-72 xs:bg-[#11101A] md:bg-transparent xs:p-6 md:p-0  z-30 md:flex flex-col xs:${
      SidebarStore.isHidden ? 'hidden' : 'flex'
    } xs:absolute md:fixed`"
  >
    <LanguageSwitch class="md:hidden" />
    <div class="flex justify-between">
      <div class="flex">
        <img
          class="w-[3.75rem] h-[3.75rem] shrink-0 object-cover rounded-full"
          :src="avatar + AuthStore.author.avatar"
          alt="avatar"
        />
        <div class="ml-6">
          <h1 v-if="AuthStore.author" class="text-2xl text-white font-normal">
            {{ AuthStore.author.username }}
          </h1>
          <RouterLink :to="{ name: 'editprofile' }" class="text-[#CED4DA]">{{
            $t("feed.edit_profile")
          }}</RouterLink>
        </div>
      </div>
      <button
        @click="AuthStore.logout()"
        type="submit"
        class="text-white md:hidden rounded-md border border-white w-24 h-9"
      >
        {{ $t("forms.log_out") }}
      </button>
    </div>
    <RouterLink :to="{ name: 'news' }">
      <div class="mt-10 px-3 flex items-center">
        <HouseIcon :color="route.name === 'news' ? '#E31221' : '#fff'" />
        <h1 class="ml-11 text-2xl text-white">{{ $t("feed.news_feed") }}</h1>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'films' }">
      <div class="mt-10 px-3 flex items-center">
        <CameraIcon :color="route.name === 'films' ? '#E31221' : '#fff'" />
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
import { avatar } from "../services/imagePrefixes";
const route = useRoute();
const AuthStore = useAuthStore();
const SidebarStore = useSidebarStore();
</script>
