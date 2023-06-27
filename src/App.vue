<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import TheModal from "./components/TheModal.vue";
import { ModalStore ,AuthStore} from "./stores/index.js";
import { onMounted } from "vue";
import ProfileMobileModal from "./components/ProfileMobileModal.vue";
onMounted(async () => {
  ModalStore.queryBasedModal();
  await AuthStore.getUser();
});
</script>

<template>
  <TheModal v-if="ModalStore.inner !== ''" />
  <ProfileMobileModal v-if="ModalStore.inner === '' && ModalStore.mobile !== ''" />
  <TheNavbar />
  <RouterView />
</template>
