<template>
  <div>
    <SearchInput />
    <QuoteCard v-for="(item, index) of NewsStore.quotes" :quote="item" :key="index" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import QuoteCard from "../components/QuoteCard.vue";
import SearchInput from "../components/SearchInput.vue";
import { useNewsStore } from "../stores/NewsStore";
const NewsStore = useNewsStore();
onMounted(() => {
  NewsStore.getQuotes();
});
</script>
