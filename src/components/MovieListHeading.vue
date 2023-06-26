<template>
  <div class="w-full flex items-center justify-between">
    <h1 class="text-white font-bold xs:text-lg md:text-2xl flex xs:flex-col md:flex-row">
      {{ $t("addmovie.movie_list") }}
      <p class="xs:px-0 md:pl-3 xs:mt-2 md:mt-0">({{ NewsStore.movies?.length }})</p>
    </h1>
    <div class="flex justify-end items-center md:w-[40rem]">
      <button
        :class="`xs:hidden  md:flex ${
          size ? 'mr-8 border-b border-[#EFEFEF4D] ' : 'md:w-44'
        } items-center h-[52px] `"
      >
        <SearchIcon class="shrink-0" />
        <input
          v-if="size"
          class="w-full h-[30px] bg-transparent text-white px-3"
          :placeholder="$t('feed.search_placeholder')"
          type="text"
        />
        <button
          @click="size = true"
          :class="size ? 'w-44' : 'w-auto'"
          class="text-[#CED4DA] p-2 mx-3 text-xl"
        >
          {{ $t("feed.search_by") }}
        </button>
      </button>
      <button
        @click="NewsStore.modal = 'add-movie'"
        class="bg-[#E31221] text-white h-[2.375rem] flex px-3 items-center rounded-[.25rem]"
      >
        <PlusSquareIcon class="mr-2" /> Add movie
      </button>
    </div>
  </div>
</template>

<script setup>
import PlusSquareIcon from "../components/icons/PlusSquareIcon.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import { useNewsStore } from "../stores/NewsStore";
const NewsStore = useNewsStore();
import { ref } from "vue";
const size = ref(false);
</script>
