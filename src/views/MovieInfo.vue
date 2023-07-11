<template>
  <QuoteModal
    v-if="NewsStore.modal === 'add-quote'"
    :inner="true"
    :mode="ModalStore.quoteModal"
    :movie="MovieStore.movie"
  />
  <MovieModal :edit="true" v-if="MovieStore.modal === 'add-movie'" />
  <h1 v-if="loading" class="text-white text-3xl">{{ $t("add_quote.loading") }}</h1>
  <div v-else class="flex flex-col xs:py-10 md:pb-20">
    <h1 class="text-2xl text-white xs:hidden md:flex">
      {{ $t("add_movie.movie_description") }}
    </h1>
    <div class="flex mt-8 xs:flex-col md:flex-row xs:px-8 md:px-0">
      <img
        class="xs:w-full xs:h-72 md:w-[30rem] lg:w-[50rem] md:h-[27rem] rounded-xl shrink-0"
        :src="image + MovieStore.movie.image"
        alt="movie"
      />
      <div class="flex flex-col md:w-[32rem] md:ml-5">
        <div class="flex justify-between items-center">
          <h1 class="text-[#DCA] text-2xl xs:my-3 md:my-0">
            {{ locale === "en" ? MovieStore.movie.name?.en : MovieStore.movie.name?.ka }}
            ({{ MovieStore.movie.year }})
          </h1>
          <div
            class="bg-[#24222F] xs:hidden md:flex justify-between w-36 h-10 rounded-lg items-center px-5"
          >
            <PenIcon class="cursor-pointer" @click="MovieStore.modal = 'add-movie'" />
            <hr class="border border-[#6C757D] h-5" />
            <TrashIcon @click="MovieStore.deleteMovie()" />
          </div>
        </div>
        <div class="w-full flex mt-6 flex-wrap gap-2">
          <div
            class="px-3 py-2 bg-[#6C757D] text-white first:ml-0 rounded-sm font-bold"
            v-for="(item, index) in MovieStore.movie.genre"
            :key="index"
          >
            {{ item.name[locale] }}
          </div>
        </div>
        <h1 class="text-lg text-[#CED4DA] font-bold mt-5">
          {{ $t("add_movie.director") }}
          {{
            locale === "en"
              ? MovieStore.movie.director?.en
              : MovieStore.movie.director?.ka
          }}
        </h1>
        <p class="text-lg text-[#CED4DA] text-left mt-5">
          {{
            locale === "en"
              ? MovieStore.movie.description?.en
              : MovieStore.movie.description?.ka
          }}
        </p>
      </div>
    </div>
    <div
      class="mt-11 flex xs:flex-col-reverse xs:items-start md:flex-row md:items-center xs:px-9 md:px-0"
    >
      <h1 class="xs:text-xl md:text-2xl text-white font-bold">
        {{ $t("add_movie.quotes") }} ({{ $t("add_movie.total") }}
        {{ MovieStore.movie.quotes?.length }})
      </h1>
      <hr
        class="border xs:w-full md:w-0 md:h-8 xs:my-4 md:my-0 md:mx-4 border-[#6C757D] xs:rotate-180 md:rotate-0"
      />
      <the-button
        @click="openAddQuoteModal"
        class="md:text-xl flex items-center justify-between px-2"
      >
        <PlusSquareIcon class="mx-2" /> {{ $t("add_quote.add_quote") }}
      </the-button>
    </div>
    <div
      class="md:w-[61rem] relative"
      v-for="item in MovieStore.movie.quotes"
      :key="item.id"
    >
      <div
        class="md:w-[50rem] md:h-[17rem] bg-[#11101A] mt-10 py-6 px-8 flex flex-col md:rounded-xl"
      >
        <div
          v-if="ModalStore.quoteModal === item.id"
          class="w-60 h-48 flex flex-col text-white justify-between absolute xs:right-4 md:right-0 xs:bottom-16 md:top-24 py-8 px-6 bg-[#24222F] rounded-lg"
        >
          <div
            class="flex items-center cursor-pointer"
            @click="setStage('view', item.id)"
          >
            <EyeIcon2 color="#fff" />
            <h1 class="ml-2">{{ $t("add_quote.view_quote") }}</h1>
          </div>
          <div
            class="flex items-center cursor-pointer"
            @click="setStage('edit', item.id)"
          >
            <PenIcon />
            <h1 class="ml-2">{{ $t("add_quote.edit_quote") }}</h1>
          </div>
          <div
            @click="NewsStore.deleteQuote(item.id)"
            class="flex items-center cursor-pointer"
          >
            <TrashIcon />
            <h1 class="ml-2">{{ $t("add_quote.delete_quote") }}</h1>
          </div>
        </div>
        <div class="flex xs:flex-col md:flex-row md:justify-between md:items-center">
          <img
            class="shrink-0 xs:w-full md:w-56 h-36 rounded-sm"
            :src="image + item.image"
            alt="quote"
          />
          <h1 class="text-[#CED4DA] xs:my-3 md:my-0 text-2xl">
            "{{ locale === "en" ? item.title.en : item.title.ka }}"
          </h1>
          <DotsIcon
            @click="modal(item.id)"
            class="md:-translate-y-16 cursor-pointer xs:hidden md:flex"
          />
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
          <DotsIcon @click="modal(item.id)" class="md:hidden" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { image } from "../services/imagePrefixes";
import { useI18n } from "vue-i18n";
import { useNewsStore } from "../stores/NewsStore";
import { useAuthStore } from "../stores/AuthStore";
import { useMovieStore } from "../stores/MoviesStore";
import { onMounted, computed, ref } from "vue";
import { deleteLike, createLike } from "../services/likeService";
import {
  EyeIcon2,
  PenIcon,
  TrashIcon,
  DotsIcon,
  PlusSquareIcon,
  HeartIcon,
  CommentIcon,
} from "../components/icons/index.js";
import QuoteModal from "../components/QuoteModal.vue";
import MovieModal from "../components/MovieModal.vue";
import { useModalStore } from "../stores/ModalStore";
const MovieStore = useMovieStore();
const NewsStore = useNewsStore();
const AuthStore = useAuthStore();
const ModalStore = useModalStore();
const liked = (item) => {
  return item?.likes.some((like) => like.author_id === AuthStore.author.id);
};
const loading = ref(true);
const locale = computed(() => {
  return useI18n().locale.value;
});
const addLike = async (item) => {
  const data = {
    quote_id: item.id,
    user_id: AuthStore.author.id,
  };
  if (liked(item)) {
    const like = item.likes.find((like) => like.author_id === AuthStore.author.id);
    deleteLike(like);
    MovieStore.likeInteractions(item, like, true);
  } else {
    const response = await createLike(data, item);
    MovieStore.likeInteractions(item, "", false, data, response);
  }
};
onMounted(async () => {
  await MovieStore.getMovie();
  await MovieStore.getGenres();
  await NewsStore.getQuotes();
  loading.value = false;
});
const modal = (num) => {
  ModalStore.openQuoteModal(num);
};
const openAddQuoteModal = () => {
  NewsStore.modal = "add-quote";
  ModalStore.quoteModal = "";
};
const setStage = (val, index) => {
  ModalStore.quoteModal = val;
  NewsStore.quote = MovieStore.movie.quotes.find((quote) => quote.id === index);
  NewsStore.modal = "add-quote";
};
</script>
