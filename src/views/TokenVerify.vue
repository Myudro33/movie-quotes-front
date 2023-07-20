<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import { verify } from "../services/emailVerify";
import router from "../router";
import { useModalStore } from "@/stores/modal";
const ModalStore = useModalStore();
onMounted(async () => {
  const params = router.currentRoute.value;
  const response = await verify(params);
  if (params.query.email === "email-update" && response.data?.stage) {
    ModalStore.openModal(response.data.stage, "news-modal");
  } else if (params.query.email === "reset-password" && response.data?.stage) {
    router.replace(`/?email=${params.query.user}&token=${params.params.token}`);
    ModalStore.openModal(response.data.stage, "landing");
  } else if (params.query.email === "email" && response.data?.stage) {
    ModalStore.openModal(response.data.stage, "landing");
  } else {
    ModalStore.openModal("link-expired", "landing");
  }
});
</script>
