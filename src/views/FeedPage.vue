<template>
  <div class="flex md:mt-8">
    <TheSidebar />
    <TheNotification />
    <div class="md:ml-[7rem] xs:w-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import TheNotification from "../components/TheNotification.vue";
import TheSidebar from "../components/TheSidebar.vue";
import { useNotificationStore } from "../stores/NotificationStore";
const NotificationStore = useNotificationStore();
onMounted(() => {
  NotificationStore.getNotifications();
});
</script>
