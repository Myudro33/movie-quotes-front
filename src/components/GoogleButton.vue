<template>
  <button
    @click="loginwithGoogle"
    type="button"
    class="w-full h-[2.375rem] flex justify-center items-center rounded-md border border-white text-white"
  >
    <GoogleIcon />
    {{ props.type === "signin" ? $t("forms.google_signin") : $t("forms.google_signup") }}
  </button>
</template>

<script setup>
import axiosInstance from "@/config/axios-config";
import GoogleIcon from "./icons/GoogleIcon.vue";
const props = defineProps(["type"]);
const loginwithGoogle = () => {
  axiosInstance.get("/auth/redirect").then((response) => {
    window.location.href = response.data.url;
  });
};
</script>
