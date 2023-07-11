<template>
  <div
    v-if="NotificationStore.modal"
    class="xs:w-full fixed xs:h-4/5 bg-[#000000] z-50 md:right-20 top-24 text-white md:w-[60rem] md:h-[50rem] rounded-xl px-8 py-10"
  >
    <div class="w-full flex justify-between items-center">
      <h1 class="md:text-[2rem]">{{ $t("notification.notifications") }}</h1>
      <p
        @click="markAsRead(AuthStore.author.id)"
        class="underline md:text-lg text-white cursor-pointer"
      >
        {{ $t("notification.mark_as_read") }}
      </p>
    </div>
    <div
      v-for="item in NotificationStore.notifications"
      :key="item.id"
      @click="markAsRead(item)"
      class="mt-4 w-full md:h-[7.7rem] cursor-pointer flex xs:flex-col md:flex-row items-center xs:p-3 md:p-6 border border-[#6C757D80] rounded-lg"
    >
      <img
        :class="!item.seen && 'border-2 border-[#198754]'"
        class="rounded-full xs:hidden md:flex md:w-[4.5rem] md:h-[4.5rem] object-cover shrink-0"
        :src="avatar + item.user.avatar"
        alt="avatar"
      />
      <div class="w-full h-full md:ml-6 flex justify-between xs:flex-col md:flex-row">
        <div class="flex flex-row py-1">
          <img
            :class="!item.seen && 'border-2 border-[#198754]'"
            class="rounded-full w-[3.2rem] h-[3.2rem] object-cover shrink-0 md:hidden"
            :src="avatar + item.user.avatar"
            alt="avatar"
          />
          <div class="xs:ml-2 md:ml-0">
            <h1 class="text-xl font-normal">{{ item.user.username }}</h1>
            <div class="mt-2">
              <div class="flex items-center" v-if="item.type === 'comment'">
                <QuotesIcon class="w-6 h-6" />
                <p class="xs:text-xs md:text-xl ml-2">
                  {{ $t("notification.commented") }}
                </p>
              </div>
              <div class="flex items-center" v-else>
                <HeartIcon class="w-2 h-6" :color="true" />
                <p class="xs:text-xs md:text-xl ml-2">{{ $t("notification.reacted") }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex xs:flex-row-reverse xs:justify-end md:flex-col md:justify-between md:items-end"
        >
          <h1 class="md:text-xl xs:ml-2 md:ml-0 font-normal">{{ item.date }}</h1>
          <h1 class="text-[#198754] xs:mx-1 md:mx-0 md:text-xl" v-if="!item.seen">
            {{ $t("notification.new") }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { avatar } from "../services/imagePrefixes";
import { useNotificationStore } from "../stores/NotificationStore";
import { QuotesIcon, HeartIcon } from "../components/icons/index.js";
import { useAuthStore } from "../stores/AuthStore";
const NotificationStore = useNotificationStore();
const AuthStore = useAuthStore();
const markAsRead = (item) => {
  NotificationStore.markAsRead(item);
};
</script>
