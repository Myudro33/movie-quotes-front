<template>
  <div class="md:w-[45rem] lg:w-[58.625rem] md:ml-36">
    <AddQuoteModal stage="" v-if="NewsStore.modal === 'add-quote'" :inner="false" />
    <SearchInput />
    <QuoteCard v-for="item of NewsStore.quotes" :quote="item" :key="item.id" />
    <h1 class="text-white md:text-4xl text-center my-5 h-12" v-if="NewsStore.isLoading">
      {{ $t("add_quote.loading") }}
    </h1>
    <h1 class="text-white md:text-4xl text-center my-5 h-12" v-if="NewsStore.isLastPage">
      {{ $t("add_quote.all_posts_loaded") }}
    </h1>
  </div>
</template>

<script setup>
import { useMovieStore } from "../stores/MoviesStore";
import { useNewsStore } from "../stores/NewsStore";
import { onMounted, onBeforeUnmount } from "vue";
import QuoteCard from "../components/QuoteCard.vue";
import SearchInput from "../components/SearchInput.vue";
import AddQuoteModal from "../components/AddQuoteModal.vue";
const MovieStore = useMovieStore();
const NewsStore = useNewsStore();
onMounted(() => {
  MovieStore.getMovies();
  NewsStore.getQuotes();
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", NewsStore.handleScroll);
});
</script>
