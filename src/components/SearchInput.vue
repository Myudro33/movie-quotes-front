<template>
  <div class="md:flex justify-between xs:hidden">
    <button
      @click="NewsStore.modal = 'add-quote'"
      :class="`bg-[#24222F] text-white rounded-xl  md:h-[3.25rem] ${
        size ? 'md:w-64' : 'md:w-10/12'
      } xs:h-[5.375rem] text-xl font-normal flex items-center px-3`"
    >
      <PencilIcon />
      {{ $t("feed.write_new_quote") }}
    </button>
    <button
      @click="size = true"
      :class="`ml-8 xs:hidden  md:flex md:justify-end ${
        size ? 'md:w-8/12 border-b border-[#EFEFEF4D]' : 'md:w-36'
      } items-center h-[5.375rem] `"
    >
      <SearchIcon />
      <input
        @keydown.enter="search"
        v-if="size"
        v-model="input"
        class="w-full h-[1.875rem] bg-transparent text-white px-3"
        :placeholder="$t('feed.search_placeholder')"
        type="text"
      />
      <button class="text-[#CED4DA] w-42 p-2 mx-3" v-else>
        {{ $t("feed.search_by") }}
      </button>
    </button>
  </div>
  <div class="md:hidden w-full h-[5.375rem]">
    <button
      @click="NewsStore.modal = 'add-quote'"
      :class="`bg-[#24222F] w-full text-white h-[5.375rem] text-xl font-normal flex items-center px-3`"
    >
      <PencilIcon />
      {{ $t("feed.write_new_quote") }}
    </button>
  </div>
  <div
    v-if="ModalStore.mobile === 'search'"
    class="md:hidden w-full h-[80vh] bg-[#12101A] z-[100] top-0 absolute"
  >
    <div class="flex items-center h-16 px-8 border-b border-b-[#EFEFEF4D]">
      <ArrowIcon class="w-10 h-10" @click="ModalStore.closeModal" />
      <input
        v-model="input"
        class="w-full h-10 mx-2 bg-transparent text-white placeholder:text-white outline-none px-3"
        type="text"
        :placeholder="$t('feed.search_mobile_placeholder')"
      />
    </div>
    <ul class="text-[#CED4DA] px-20 mt-5">
      <li>{{ $t("feed.mobile_search_movies") }}</li>
      <li class="mt-6">{{ $t("feed.mobile_search_quotes") }}</li>
    </ul>
  </div>
</template>

<script setup>
import SearchIcon from "./icons/SearchIcon.vue";
import PencilIcon from "./icons/PencilIcon.vue";
import ArrowIcon from "./icons/ArrowIcon.vue";
import { useModalStore } from "../stores/ModalStore";
import { useNewsStore } from "../stores/NewsStore";
import { ref } from "vue";
import axiosInstance from "../config/axios-config";
const ModalStore = useModalStore();
const NewsStore = useNewsStore();
const input = ref("");
const size = ref(false);
const search = async () => {
  try {
    const response = await axiosInstance.get("/quotes", {
      params: {
        query: input.value,
      },
    });
    if (input.value === "") {
      NewsStore.quotes = response.data.quotes.data;
    } else {
      NewsStore.quotes = response.data.quotes;
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
