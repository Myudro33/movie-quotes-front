<template>
  <div class="w-full flex items-center justify-between">
    <h1 class="text-white font-bold xs:text-lg md:text-2xl flex xs:flex-col md:flex-row">
      {{ $t("add_movie.movie_list") }}
      <p class="xs:px-0 md:pl-3 xs:mt-2 md:mt-0">({{ MovieStore.quantity }})</p>
    </h1>
    <div
      :class="size ? 'md:w-[45rem]' : 'md:w-[45rem]'"
      class="flex justify-end items-center"
    >
      <div
        :class="`xs:hidden  md:flex   ${
          size ? 'mr-8 border-b border-[#EFEFEF4D] w-[60%]' : 'md:w-44'
        } items-center h-[3.25rem] `"
      >
        <SearchIcon class="shrink-0" />
        <input
          @keydown.enter="search"
          v-if="size"
          class="w-full h-[1.875rem] bg-transparent text-white px-3"
          type="text"
          v-model="input"
        />
        <button
          @click="clickHandle"
          :class="size ? 'w-56' : 'w-auto'"
          class="text-[#CED4DA] p-2 mx-3 text-xl"
        >
          {{ $t("feed.search_by") }}
        </button>
      </div>
      <the-button
        @click="MovieStore.modal = 'add-movie'"
        class="h-[2.375rem] xs:text-xs xs:w-48 md:w-52 justify-center md:text-base flex px-3 items-center"
      >
        <PlusSquareIcon class="mr-2" /> {{ $t("add_movie.add_movie") }}
      </the-button>
    </div>
  </div>
</template>

<script setup>
import { PlusSquareIcon, SearchIcon } from "../components/icons/index.js";
import { useMovieStore } from "../stores/MoviesStore";
import axiosInstance from "../config/axios-config";
import { ref } from "vue";
const MovieStore = useMovieStore();
const size = ref(false);
const input = ref("");
const clickHandle = () => {
  size.value = true;
  if (input.value !== "") {
    search();
  } else {
    MovieStore.getMovies();
  }
};
const search = async () => {
  const response = await axiosInstance.get("/movies", {
    params: {
      query: input.value === "" ? "" : input.value,
    },
  });
  if (input.value !== "") {
    MovieStore.movies = response.data.movies;
  } else {
    MovieStore.movies = response.data.movies.data;
  }
};
</script>
