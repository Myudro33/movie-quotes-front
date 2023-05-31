<template>
  <div class="xs:px-4 md:px-[70px] h-20 flex justify-between items-center bg-[#181624]">
    <h1 class="text-[#DDCCAA] font-medium">MOVIE QUOTES</h1>
    <div class="flex xs:flex-row-reverse md:flex-row">
      <LanguageSwitch />
      <div v-if="!authStore.$state.user">
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
      <div v-else class="flex w-44 justify-evenly items-center">
        <form @submit="authStore.logout()">
          <button
            type="submit"
            class="text-white rounded-[4px] border border-white w-24 h-9"
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSwitch from "./LanguageSwitch.vue";
import { useModalStore } from "../stores/ModalStore";
import { useAuthStore } from "../stores/AuthStore";
export default {
  components: { LanguageSwitch },
  setup() {
    const modalStore = useModalStore();
    const authStore = useAuthStore();
    return { modalStore, authStore };
  },
};
</script>
