<template>
  <div></div>
</template>

<script setup>
import axiosInstance from "../config/axios-config";
import { onMounted } from "vue";
import { AuthStore } from "../stores/index.js";
import router from "../router";
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
onMounted(async () => {
  await axiosInstance.get(`/auth/google/callback?code=${code}`).then((response) => {
    AuthStore.user = response.data.user;
    router.push({ name: "news" });
  });
});
</script>
