<template>
  <div></div>
</template>

<script setup>
import axiosInstance from "@/config/axios-config";
import router from "@/router";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
const AuthStore = useAuthStore();
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
onMounted(async () => {
  await axiosInstance.get(`/auth/google/callback?code=${code}`).then((response) => {
    AuthStore.user = response.data.user;
    router.push({ name: "news" });
  });
});
</script>
