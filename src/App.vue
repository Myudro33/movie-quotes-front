<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import TheModal from "./components/TheModal.vue";
import { ModalStore } from "./stores/index.js";
import { useAuthStore } from "./stores/AuthStore";
import { onMounted } from "vue";
import ProfileMobileModal from "./components/ProfileMobileModal.vue";
const authStore = useAuthStore();
onMounted(async () => {
  ModalStore.queryBasedModal();
  await authStore.getUser();
});
</script>

<template>
  <TheModal v-if="ModalStore.inner !== ''" />
  <ProfileMobileModal v-if="ModalStore.inner === '' && ModalStore.mobile !== ''" />
  <TheNavbar />
  <RouterView />
</template>
