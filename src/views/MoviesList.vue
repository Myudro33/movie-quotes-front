<template>
  <AddMovieModal v-if="NewsStore.modal==='add-movie'" />
  <div class="absolute md:right-20 xs:w-full xs:py-4 xs:px-8 md:p-0 lg:w-[88.75rem]">
    <MovieListHeading />
    <div class="flex xs:flex-col md:gap-12 md:flex-row md:flex-wrap">
      <MovieCard v-for="item in NewsStore.movies" :movie="item" :key="item.id" />
    </div>
  </div>
</template>

<script setup>
import AddMovieModal from "../components/AddMovieModal.vue";
import MovieCard from "../components/MovieCard.vue";
import MovieListHeading from "../components/MovieListHeading.vue";
import { useNewsStore } from "../stores/NewsStore";
import { onMounted } from "vue";
const NewsStore = useNewsStore();
onMounted(() => {
  NewsStore.getMovies();
});
</script>
