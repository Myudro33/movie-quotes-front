<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import TheModal from "./components/TheModal.vue";
import { useModalStore } from "./stores/ModalStore";
import { useAuthStore } from "./stores/AuthStore";
import { computed, onMounted } from "vue";
import ProfileMobileModal from "./components/ProfileMobileModal.vue";
import { useI18n } from "vue-i18n";
const authStore = useAuthStore();
const modalStore = useModalStore();
onMounted(async () => {
  modalStore.queryBasedModal();
  await authStore.getUser();
});
const font = computed(() => {
  if (useI18n().locale.value === "en") {
    return "Eng";
  } else {
    return "Geo"; // Default font if the locale is not English or French
  }
});
</script>

<template>
  <TheModal v-if="modalStore.inner !== ''" />
  <ProfileMobileModal v-if="modalStore.inner === '' && modalStore.mobile !== ''" />
  <TheNavbar />
  <RouterView :style="`font-family:${font}`" />
</template>
