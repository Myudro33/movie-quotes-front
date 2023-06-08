<template>
  <div class="md:flex justify-between xs:hidden">
    <button
      :class="`bg-[#24222F] text-white rounded-[10px]  md:h-[52px] ${
        size ? 'md:w-64' : 'md:w-10/12'
      } xs:h-[86px] text-xl font-normal flex items-center px-3`"
    >
      <PencilIcon />
      {{ $t("feed.write_new_quote") }}
    </button>
    <div
      :class="`ml-8 xs:hidden  md:flex md:justify-end ${
        size ? 'md:w-8/12 border-b border-[#EFEFEF4D]' : 'md:w-36'
      } items-center h-[52px] `"
    >
      <SearchIcon />
      <input
        v-if="size"
        class="w-full h-[30px] bg-transparent text-white px-3"
        :placeholder="$t('feed.search_placeholder')"
        type="text"
      />
      <button @click="size = true" class="text-white w-42 p-2 mx-3" v-else>
        {{ $t("feed.search_by") }}
      </button>
    </div>
  </div>
  <div class="md:hidden w-full h-[86px]">
    <button
      :class="`bg-[#24222F] w-full text-white h-[86px] text-xl font-normal flex items-center px-3`"
    >
      <PencilIcon />
      {{ $t("feed.write_new_quote") }}
    </button>
  </div>
  <div
    v-if="modalStore.modal && modalStore.mobile === 'search'"
    class="md:hidden w-full h-[80vh] bg-[#12101A] z-[100] top-0 absolute"
  >
    <div class="flex items-center h-16 px-8 border-b border-b-[#EFEFEF4D]">
      <ArrowIcon class="w-10 h-10" @click="modalStore.modal = false" />
      <input
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
import { ref } from "vue";
const modalStore = useModalStore();
const size = ref(false);
</script>
