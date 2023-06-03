<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import TheModal from "./components/TheModal.vue";
import { useModalStore } from "./stores/ModalStore";
import { useAuthStore } from "./stores/AuthStore";
import { onMounted } from "vue";
const authStore = useAuthStore();
const modalStore = useModalStore();
onMounted(async () => {
  modalStore.queryBasedModal();
  await authStore.getUser();
});
</script>

<template>
  <TheModal v-if="modalStore.modal" />
  <TheNavbar />
  <RouterView />
</template>
