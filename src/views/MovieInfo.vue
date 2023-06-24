<template>
  <AddQuoteModal :inner="true" :movie="NewsStore.movie" />
  <h1 v-if="loading"></h1>
  <div v-else class="flex flex-col absolute xs:py-10 md:py-0">
    <h1 class="text-2xl text-white xs:hidden md:flex">
      {{ $t("addmovie.movie_description") }}
    </h1>
    <div class="flex mt-8 xs:flex-col md:flex-row xs:px-9 md:px-0">
      <img
        class="xs:w-full xs:h-72 md:w-[50rem] md:h-[27rem] rounded-xl shrink-0"
        :src="NewsStore.movie.image"
        alt="movie"
      />
      <div class="flex flex-col md:w-[32rem] md:ml-5">
        <div class="flex justify-between items-center">
          <h1 class="text-[#DCA] text-2xl xs:my-3 md:my-0">
            {{ locale === "en" ? NewsStore.movie.name?.en : NewsStore.movie.name?.ka }}
            ({{ NewsStore.movie.year }})
          </h1>
          <div
            class="bg-[#24222F] xs:hidden md:flex justify-between w-36 h-10 rounded-lg items-center px-5"
          >
            <PenIcon />
            <hr class="border border-[#6C757D] h-5" />
            <TrashIcon @click="NewsStore.deleteMovie()" />
          </div>
        </div>
        <div class="w-full flex mt-6 flex-wrap gap-2">
          <div
            class="px-3 py-2 bg-[#6C757D] text-white first:ml-0 rounded-sm font-bold"
            v-for="(item, index) in NewsStore.movie.genre"
            :key="index"
          >
            {{ item[locale] }}
          </div>
        </div>
        <h1 class="text-lg text-[#CED4DA] font-bold mt-5">
          {{ $t("addmovie.director") }}
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
    <div
      class="mt-11 flex xs:flex-col-reverse xs:items-start md:flex-row md:items-center xs:px-9 md:px-0"
    >
      <h1 class="xs:text-xl md:text-2xl text-white font-bold">
        {{ $t("addmovie.quotes") }} ({{ $t("addmovie.total") }}
        {{ NewsStore.movie.quotes?.length }})
      </h1>
      <hr
        class="border xs:w-full md:w-0 md:h-8 xs:my-4 md:my-0 md:mx-4 border-[#6C757D] xs:rotate-180 md:rotate-0"
      />
      <button
        @click="NewsStore.modal = 'add-quote'"
        class="bg-[#E31221] rounded-md text-white md:text-xl flex items-center justify-between px-2 h-12"
      >
        <PlusSquareIcon class="mx-2" /> {{ $t("addquote.add_quote") }}
      </button>
    </div>
    <div
      class="md:w-[50rem] md:h-[17rem] bg-[#11101A] mt-10 py-6 px-8 flex flex-col md:rounded-xl"
      v-for="(item, index) in NewsStore.movie.quotes"
      :key="index"
    >
      <div class="flex xs:flex-col md:flex-row md:justify-between md:items-center">
        <img
          class="shrink-0 xs:w-full md:w-56 h-36 rounded-sm"
          :src="item.image"
          alt="quote"
        />
        <h1 class="text-[#CED4DA] xs:my-3 md:my-0 text-2xl">
          "{{ locale === "en" ? item.title.en : item.title.ka }}"
        </h1>
        <DotsIcon class="md:-translate-y-16 xs:hidden md:flex" />
      </div>
      <hr class="border w-full border-[#EFEFEF33] mt-6" />
      <div class="flex mt-4 justify-between">
        <div class="flex">
          <div class="flex">
            <h1 class="text-white text-2xl mr-2">{{ item.comments?.length }}</h1>
            <CommentIcon />
          </div>
          <div class="flex">
            <h1 class="text-white text-2xl ml-4 mr-2">{{ item.likes?.length }}</h1>
            <HeartIcon :color="liked(item)" @click="addLike(item)" />
          </div>
        </div>
        <DotsIcon class="md:hidden" />
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
  return item?.likes.some((like) => like.author_id === authStore.author.id);
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
