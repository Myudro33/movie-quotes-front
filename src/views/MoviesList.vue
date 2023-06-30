<template>
  <AddMovieModal v-if="MovieStore.modal === 'add-movie'" />
  <div class="xs:w-full xs:py-4 xs:px-8 md:p-0 lg:w-[88.75rem]">
    <MovieListHeading />
    <div class="flex xs:flex-col md:gap-12 md:flex-row md:flex-wrap">
      <MovieCard v-for="item in MovieStore.movies" :movie="item" :key="item.id" />
    </div>
  </div>
</template>

<script setup>
import AddMovieModal from "../components/AddMovieModal.vue";
import MovieCard from "../components/MovieCard.vue";
import MovieListHeading from "../components/MovieListHeading.vue";
import { useMovieStore } from "../stores/MoviesStore";
import { onMounted } from "vue";
const MovieStore = useMovieStore();
onMounted(() => {
  MovieStore.getMovies();
  MovieStore.getGenres();
});
</script>
