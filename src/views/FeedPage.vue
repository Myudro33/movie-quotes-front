<template>
  <div class="flex md:mt-8">
    <TheSidebar />
    <div class="mx-auto xs:w-full md:w-[938px]">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import TheSidebar from "../components/TheSidebar.vue";
import { useNewsStore } from "../stores/NewsStore";
import { onMounted } from "vue";
const NewsStore = useNewsStore();
onMounted(() => {
  NewsStore.getQuotes();
  NewsStore.getMovies();
});
</script>
