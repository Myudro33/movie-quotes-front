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
      <div class="xs:hidden md:flex flex items-center">
        <LanguageSwitch />
      </div>
      <div v-if="!AuthStore.author">
        <button
          @click="ModalStore.openModal('register')"
          class="bg-[#E31221] px-4 xs:h-8 md:h-[2.375rem] text-white rounded-md mx-4"
        >
          {{ $t("forms.sign_up") }}
        </button>
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
import SearchIcon from "./icons/SearchIcon.vue";
import { useModalStore } from "../stores/ModalStore";
import { useAuthStore } from "../stores/AuthStore";
import { useSidebarStore } from "../stores/SidebarStore";
import HamburgerIcon from "./icons/HamburgerIcon.vue";
const ModalStore = useModalStore();
const AuthStore = useAuthStore();
const SidebarStore = useSidebarStore();
const openSearchModal = () => {
  ModalStore.mobile = "search";
};
</script>
