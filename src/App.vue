<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import TheModal from "./components/TheModal.vue";
import { useModalStore } from "./stores/ModalStore";
import { useAuthStore } from "./stores/AuthStore";
import { onBeforeMount } from "vue";
const authStore = useAuthStore();
const modalStore = useModalStore();
onBeforeMount(() => {
  authStore.getUser();
});
</script>

<template>
  <TheModal v-if="modalStore.modal" />
  <TheNavbar />
  <RouterView />
</template>
