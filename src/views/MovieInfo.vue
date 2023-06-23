<template>
  <AddQuoteModal :inner="true" :movie="NewsStore.movie" />
  <h1 v-if="loading"></h1>
  <div v-else class="flex flex-col absolute">
    <h1 class="text-2xl text-white">{{ $t("addmovie.movie_description") }}</h1>
    <div class="flex mt-8">
      <img
        class="md:w-[50rem] md:h-[27rem] rounded-xl shrink-0"
        :src="NewsStore.movie.image"
        alt="movie"
      />
      <div class="flex flex-col w-[32rem] md:ml-5">
        <div class="flex justify-between items-center">
          <h1 class="text-[#DCA] text-2xl">
            {{ locale === "en" ? NewsStore.movie.name?.en : NewsStore.movie.name?.ka }}
            ({{ NewsStore.movie.year }})
          </h1>
          <div
            class="bg-[#24222F] flex justify-between w-36 h-10 rounded-lg items-center px-5"
          >
            <PenIcon />
            <hr class="border border-[#6C757D] h-5" />
            <TrashIcon />
          </div>
        </div>
        <div class="w-full flex mt-6 flex-wrap">
          <div
            class="px-3 py-2 bg-[#6C757D] text-white first:ml-0 ml-2 rounded-sm font-bold"
            v-for="(item, index) in NewsStore.movie.genre"
            :key="index"
          >
            {{ item[locale] }}
          </div>
        </div>
        <h1 class="text-lg text-[#CED4DA] font-bold mt-5">
          Director:
          {{
            locale === "en" ? NewsStore.movie.director?.en : NewsStore.movie.director?.ka
          }}
        </h1>
        <p class="text-lg text-[#CED4DA] text-left mt-5">
          {{
            locale === "en"
              ? NewsStore.movie.description?.en
              : NewsStore.movie.description?.ka
          }}
        </p>
      </div>
    </div>
    <div class="mt-11 flex items-center">
      <h1 class="text-2xl text-white font-bold">
        {{ $t("addmovie.quotes") }} ({{ $t("addmovie.total") }}
        {{ NewsStore.movie.quotes?.length }})
      </h1>
      <hr class="border h-8 mx-4 border-[#6C757D]" />
      <button
        @click="NewsStore.modal = 'add-quote'"
        class="bg-[#E31221] rounded-md text-white text-xl flex items-center justify-between px-2 w-36 h-12"
      >
        <PlusSquareIcon /> Add quote
      </button>
    </div>
    <div
      class="md:w-[50rem] h-[17rem] bg-[#11101A] mt-10 py-6 px-8 flex flex-col rounded-xl"
      v-for="(item, index) in NewsStore.movie.quotes"
      :key="index"
    >
      <div class="flex justify-between items-center">
        <img class="shrink-0 w-56 h-36 rounded-sm" :src="item.image" alt="quote" />
        <h1 class="text-[#CED4DA] text-2xl">
          "{{ locale === "en" ? item.title.en : item.title.ka }}"
        </h1>
        <DotsIcon class="md:-translate-y-16" />
      </div>
      <hr class="border w-full border-[#EFEFEF33] mt-6" />
      <div class="flex mt-4">
        <div class="flex">
          <h1 class="text-white text-2xl mr-2">{{ item.comments?.length }}</h1>
          <CommentIcon />
        </div>
        <div class="flex">
          <h1 class="text-white text-2xl ml-4 mr-2">{{ item.likes?.length }}</h1>
          <HeartIcon :color="liked(item)" @click="addLike(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useNewsStore } from "../stores/NewsStore";
const NewsStore = useNewsStore();
import { onMounted, computed, ref } from "vue";
import PenIcon from "../components/icons/PenIcon.vue";
import TrashIcon from "../components/icons/TrashIcon.vue";
import DotsIcon from "../components/icons/DotsIcon.vue";
import PlusSquareIcon from "../components/icons/PlusSquareIcon.vue";
import AddQuoteModal from "../components/AddQuoteModal.vue";
import CommentIcon from "../components/icons/CommentIcon.vue";
import HeartIcon from "../components/icons/HeartIcon.vue";
import { useAuthStore } from "../stores/AuthStore";
const authStore = useAuthStore();
const liked = (item) => {
  return item?.likes.some((like) => like.author.id === authStore.author.id);
};
const loading = ref(true);
const locale = computed(() => {
  return useI18n().locale.value;
});
const addLike = (item) => {
  NewsStore.addMovieQuoteLike({
    user_id: authStore.author.id,
    quote_id: item.id,
  });
  liked(item);
};
onMounted(async () => {
  await NewsStore.getMovie();
  await NewsStore.getQuotes();
  loading.value = false;
});
</script>
