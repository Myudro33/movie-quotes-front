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
import { useModalStore } from "@/stores/modal";
import { useMovieStore } from "@/stores/movie";
import { useNewsStore } from "@/stores/news";
const NewsStore = useNewsStore();
const MovieStore = useMovieStore();
const ModalStore = useModalStore();
const closeModal = () => {
  NewsStore.modal = "";
  MovieStore.modal = "";
  ModalStore.formModal = "";
  ModalStore.closeModal();
};
</script>
