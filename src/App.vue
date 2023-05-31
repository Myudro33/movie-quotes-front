<script>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import TheModal from "./components/TheModal.vue";
import { useModalStore } from "./stores/ModalStore";
import { useAuthStore } from "./stores/AuthStore";
export default {
  components: { TheNavbar, TheModal },
  setup() {
    const authStore = useAuthStore();
    const modalStore = useModalStore();
    return { modalStore, authStore };
  },
  created() {
    this.authStore.fetchUser();
  },
};
</script>

<template>
  <TheModal v-if="modalStore.modal" />
  <TheNavbar />
  <RouterView />
</template>
