<template>
  <MovieModal v-if="ModalStore.formModal === 'add-movie'" />
  <div class="xs:w-full xs:py-4 xs:px-8 md:p-0 w-full md:pr-10 lg:pr-20">
    <MovieListHeading />
    <div class="flex xs:flex-col md:gap-10 md:flex-row md:flex-wrap">
      <MovieCard v-for="item in MovieStore.filteredMovies" :movie="item" :key="item.id" />
    </div>
  </div>
</template>

<script setup>
import MovieModal from "../components/MovieModal.vue";
import MovieCard from "../components/MovieCard.vue";
import MovieListHeading from "../components/MovieListHeading.vue";
import { useMovieStore } from "@/stores/movie";
import { onBeforeUnmount, onMounted } from "vue";
import { useModalStore } from "@/stores/modal";
const ModalStore = useModalStore();
const MovieStore = useMovieStore();
onMounted(() => {
  MovieStore.getGenres();
  window.addEventListener("scroll", MovieStore.handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", MovieStore.handleScroll);
});
</script>
