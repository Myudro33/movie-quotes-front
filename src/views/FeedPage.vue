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
import TheNotification from "../components/TheNotification.vue";
import TheSidebar from "../components/TheSidebar.vue";
import instantiatePusher from "../config/pusher/index";
import { onBeforeUnmount, onMounted } from "vue";
import { useNotificationStore } from "@/stores/notifications";
import { useAuthStore } from "@/stores/auth";
import { useMovieStore } from "@/stores/movie";
import { useNewsStore } from "../stores/news";
const MovieStore = useMovieStore();
const NotificationStore = useNotificationStore();
const AuthStore = useAuthStore();
const NewsStore = useNewsStore();
onMounted(async () => {
  await NewsStore.getQuotes();
  await MovieStore.getMovies();
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
