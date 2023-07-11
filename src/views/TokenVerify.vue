<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import { verify } from "../services/emailVerify";
import router from "../router";
import { useModalStore } from "../stores/ModalStore";
const ModalStore = useModalStore();
onMounted(async () => {
  const params = router.currentRoute.value;
  const response = await verify(params);
  console.log(response);
  if (params.query.email === "email-update" && response) {
    ModalStore.inner = response;
    router.push({ name: "news" });
  } else if (params.query.email === "reset-password" && response) {
    router.replace(`/?email=${params.query.user}&token=${params.params.token}`);
    ModalStore.inner = response;
  } else if (params.query.email === "email" && response) {
    router.push({ name: "landing" });
    ModalStore.inner = response;
  } else {
    ModalStore.inner = "link-expired";
  }
});
</script>
