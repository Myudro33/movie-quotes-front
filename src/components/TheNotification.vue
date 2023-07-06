<template>
  <div
    v-if="NotificationStore.modal"
    class="w-10 fixed h-10 bg-[#000000] z-50 right-20 top-24 text-white md:w-[60rem] md:h-[50rem] rounded-xl px-8 py-10"
  >
    <div class="w-full flex justify-between items-center">
      <h1 class="md:text-[2rem]">{{ $t("notification.notifications") }}</h1>
      <p class="underline md:text-lg text-white cursor-pointer">
        {{ $t("notification.mark_as_read") }}
      </p>
    </div>
    <div
      v-for="item in NotificationStore.notifications"
      :key="item.id"
      class="mt-4 w-full md:h-[7.7rem] flex items-center md:p-6 border border-[#6C757D80] rounded-lg"
    >
      <img
        :class="!item.seen && 'border-2 border-[#198754]'"
        class="rounded-full md:w-[4.5rem] md:h-[4.5rem] object-cover shrink-0"
        :src="avatar + item.user.avatar"
        alt="avatar"
      />
      <div class="w-full h-full ml-6 flex justify-between">
        <div class="flex flex-col py-1">
          <h1 class="text-xl font-normal">{{ item.user.username }}</h1>
          <div class="mt-2">
            <div class="flex items-center" v-if="item.type === 'comment'">
              <CommentIcon class="w-2 h-6" />
              <p class="text-xl ml-2">{{ $t("notification.commented") }}</p>
            </div>
            <div class="flex items-center" v-else>
              <HeartIcon class="w-2 h-6" :color="true" />
              <p class="text-xl ml-2">{{ $t("notification.reacted") }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between items-end">
          <h1 class="text-xl font-normal">{{ item.date }}</h1>
          <h1 class="text-[#198754] text-xl" v-if="!item.seen">New</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { avatar } from "../services/imagePrefixes";
import { useNotificationStore } from "../stores/NotificationStore";
import CommentIcon from "../components/icons/CommentIcon.vue";
import HeartIcon from "../components/icons/HeartIcon.vue";
const NotificationStore = useNotificationStore();
</script>
