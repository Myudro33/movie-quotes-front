<template>
  <div class="xs:px-9 md:px-[70px] h-20 flex justify-between items-center bg-[#222030]">
    <button
      @click="sidebarStore.isHidden = !sidebarStore.isHidden"
      class="text-white md:hidden"
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.75 13C0.75 12.8011 0.829018 12.6103 0.96967 12.4697C1.11032 12.329 1.30109 12.25 1.5 12.25H16.5C16.6989 12.25 16.8897 12.329 17.0303 12.4697C17.171 12.6103 17.25 12.8011 17.25 13C17.25 13.1989 17.171 13.3897 17.0303 13.5303C16.8897 13.671 16.6989 13.75 16.5 13.75H1.5C1.30109 13.75 1.11032 13.671 0.96967 13.5303C0.829018 13.3897 0.75 13.1989 0.75 13ZM0.75 7C0.75 6.80109 0.829018 6.61032 0.96967 6.46967C1.11032 6.32902 1.30109 6.25 1.5 6.25H16.5C16.6989 6.25 16.8897 6.32902 17.0303 6.46967C17.171 6.61032 17.25 6.80109 17.25 7C17.25 7.19891 17.171 7.38968 17.0303 7.53033C16.8897 7.67098 16.6989 7.75 16.5 7.75H1.5C1.30109 7.75 1.11032 7.67098 0.96967 7.53033C0.829018 7.38968 0.75 7.19891 0.75 7ZM0.75 1C0.75 0.801088 0.829018 0.610322 0.96967 0.46967C1.11032 0.329018 1.30109 0.25 1.5 0.25H16.5C16.6989 0.25 16.8897 0.329018 17.0303 0.46967C17.171 0.610322 17.25 0.801088 17.25 1C17.25 1.19891 17.171 1.38968 17.0303 1.53033C16.8897 1.67098 16.6989 1.75 16.5 1.75H1.5C1.30109 1.75 1.11032 1.67098 0.96967 1.53033C0.829018 1.38968 0.75 1.19891 0.75 1Z"
          fill="white"
        />
      </svg>
    </button>
    <h1 class="text-[#DDCCAA] font-medium xs:hidden md:flex">{{ $t("landing.logo") }}</h1>
    <div class="flex xs:flex-row-reverse md:flex-row">
      <div class="xs:hidden md:flex flex items-center">
        <LanguageSwitch />
      </div>
      <div v-if="!authStore.author">
        <button
          @click="modalStore.openModal('register')"
          class="bg-[#E31221] px-4 xs:h-8 md:h-[38px] text-white rounded-[4px] mx-4"
        >
          {{ $t("forms.sign_up") }}
        </button>
        <button
          @click="modalStore.openModal('login')"
          class="xs:w-[72px] xs:h-8 md:w-24 md:h-[38px] border border-[#fff] text-white rounded-[4px]"
        >
          {{ $t("forms.log_in") }}
        </button>
      </div>
      <div v-else class="flex xs:w-auto md:w-44 justify-evenly items-center">
        <button
          @click="authStore.logout()"
          type="submit"
          class="text-white xs:hidden md:block rounded-[4px] border border-white w-24 h-9"
        >
          {{ $t("forms.log_out") }}
        </button>
        <SearchIcon @click="openSearchModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import LanguageSwitch from "./LanguageSwitch.vue";
import SearchIcon from "./icons/SearchIcon.vue";
import { useModalStore } from "../stores/ModalStore";
import { useAuthStore } from "../stores/AuthStore";
import { useSidebarStore } from "../stores/SidebarStore";
const modalStore = useModalStore();
const authStore = useAuthStore();
const sidebarStore = useSidebarStore();
const openSearchModal = () => {
  modalStore.modal = true;
  modalStore.mobile = "search";
};
</script>
