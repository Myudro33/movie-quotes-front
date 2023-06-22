<template>
  <div></div>
</template>

<script setup>
import axiosInstance from "../config/axios-config";
import { onMounted } from "vue";
import { useAuthStore } from "../stores/AuthStore";
import router from "../router";
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
const AuthStore = useAuthStore();
onMounted(async () => {
  await axiosInstance.get(`/auth/google/callback?code=${code}`).then((response) => {
    AuthStore.user = response.data.user;
    router.push({ name: "news" });
  });
});
</script>
