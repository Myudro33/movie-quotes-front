<template>
  <div
    class="xs:px-9 w-full fixed md:px-[4.375rem] h-20 flex justify-between z-30 items-center bg-[#222030]"
  >
    <button
      @click="SidebarStore.isHidden = !SidebarStore.isHidden"
      class="text-white md:hidden"
    >
      <HamburgerIcon />
    </button>
    <h1 class="text-[#DDCCAA] font-medium xs:hidden md:flex">{{ $t("landing.logo") }}</h1>
    <div class="flex xs:flex-row-reverse md:flex-row">
      <div
        v-if="AuthStore.author"
        @click="NotificationStore.modal = !NotificationStore.modal"
        class="w-10 h-10 xs:mx-3 relative"
      >
        <BellIcon />
        <span
          v-if="NotificationStore.notifications.length > 0"
          class="w-6 h-6 text-white top-0 right-1 rounded-full flex justify-center items-center absolute bg-red-500"
          >{{ NotificationStore.notifications.length }}</span
        >
      </div>
      <div class="xs:hidden md:flex flex items-center">
        <LanguageSwitch />
      </div>
      <div v-if="!AuthStore.author">
        <the-button
          @click="ModalStore.openModal('register')"
          class="px-4 xs:h-8 md:h-[2.375rem] mx-4"
        >
          {{ $t("forms.sign_up") }}
        </the-button>
        <button
          @click="ModalStore.openModal('login')"
          class="xs:w-[4.5rem] xs:h-8 md:w-24 md:h-[2.375rem] border border-[#fff] text-white rounded-md"
        >
          {{ $t("forms.log_in") }}
        </button>
      </div>
      <div v-else class="flex xs:w-auto md:w-44 justify-evenly items-center">
        <button
          @click="AuthStore.logout()"
          type="submit"
          class="text-white xs:hidden md:block rounded-md border border-white w-24 h-9"
        >
          {{ $t("forms.log_out") }}
        </button>
        <SearchIcon class="md:hidden" @click="openSearchModal" />
      </div>
    </div>
  </div>
  <div class="w-full h-20"></div>
</template>

<script setup>
import LanguageSwitch from "./LanguageSwitch.vue";
import { useModalStore } from "../stores/ModalStore";
import { useAuthStore } from "../stores/AuthStore";
import { useSidebarStore } from "../stores/SidebarStore";
import { HamburgerIcon, SearchIcon, BellIcon } from "./icons/index.js";
import { useNotificationStore } from "../stores/NotificationStore";
const NotificationStore = useNotificationStore();
const ModalStore = useModalStore();
const AuthStore = useAuthStore();
const SidebarStore = useSidebarStore();
const openSearchModal = () => {
  ModalStore.mobile = "search";
};
</script>
