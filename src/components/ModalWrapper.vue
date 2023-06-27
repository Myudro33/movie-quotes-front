<template>
  <div
    @click="closeModal"
    class="absolute w-full min-h-screen flex justify-center bg-[#18162380] left-0 top-0 z-30"
  >
    <div @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "../stores/MoviesStore";
import { useNewsStore } from "../stores/NewsStore";
const NewsStore = useNewsStore();
const MoviesStore = useMovieStore();
const closeModal = () => {
  NewsStore.modal = "";
  MoviesStore.modal = "";
};
</script>
