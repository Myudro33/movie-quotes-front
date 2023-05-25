<template>
  <TheModal v-if="modalStore.modal" />
  <div>
    <TheNavbar />
    <div class="w-screen h-[70vh] flex justify-center items-center">
      <div class="flex flex-col items-center">
        <h1
          class="text-[#DDCCAA] xs:text-2xl md:text-6xl text-center font-bold tracking-wider leading-10"
        >
          Find any quote in <br />
          millions of movie lines
        </h1>
        <button
          class="xs:w-28 md:w-36 h-12 text-white rounded-[4px] bg-[#E31221] text-xl mt-6"
        >
          Get started
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar.vue";
import TheModal from "../components/TheModal.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { useModalStore } from "../stores/ModalStore";
export default {
  components: { TheNavbar, TheModal, RegistrationForm, LoginForm },
  setup() {
    const modalStore = useModalStore();
    return { modalStore };
  },
};
</script>
