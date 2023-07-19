<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import TheModal from "@/components/TheModal.vue";
import ProfileMobileModal from "@/components/ProfileMobileModal.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useModalStore } from "@/stores/modal";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const modalStore = useModalStore();
onMounted(async () => {
  await authStore.getUser();
  modalStore.queryBasedModal();
});
const font = () => {
  if (useI18n().locale.value === "en") {
    return "Eng";
  } else {
    return "Geo";
  }
};
</script>

<template>
  <TheModal v-if="modalStore.inner !== ''" />
  <ProfileMobileModal v-if="modalStore.inner === '' && modalStore.mobile !== ''" />
  <TheNavbar />
  <RouterView :style="`font-family:${font}`" />
</template>
