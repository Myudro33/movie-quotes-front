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
import { onBeforeUnmount, onMounted } from "vue";
import TheNotification from "../components/TheNotification.vue";
import TheSidebar from "../components/TheSidebar.vue";
import { useNotificationStore } from "../stores/NotificationStore";
import instantiatePusher from "../config/pusher/index";
import { useAuthStore } from "../stores/AuthStore";
import { useNewsStore } from "../stores/NewsStore";

const NotificationStore = useNotificationStore();
const NewsStore = useNewsStore();
const AuthStore = useAuthStore();
onMounted(() => {
  NotificationStore.getNotifications();
  instantiatePusher();
  window.Echo.private(`notification.${AuthStore.author.id}`).listen(
    "NotificationEvent",
    (data) => {
      NotificationStore.notifications.unshift(data.notification);
      NotificationStore.quantity++;
    }
  );
  window.Echo.channel("message").listen("PublicNotificationEvent", (data) => {
    NotificationStore.publicInteractions(data);
  });
});
onBeforeUnmount(() => {
  window.Echo.leaveChannel("message");
});
</script>
