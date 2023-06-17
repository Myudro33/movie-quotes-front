<template>
  <div>
    <AddQuoteModal />
    <SearchInput />
    <QuoteCard v-for="(item, index) of NewsStore.quotes" :quote="item" :key="item.id" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import QuoteCard from "../components/QuoteCard.vue";
import SearchInput from "../components/SearchInput.vue";
import { useNewsStore } from "../stores/NewsStore";
import AddQuoteModal from "../components/AddQuoteModal.vue";
const NewsStore = useNewsStore();
onMounted(() => {
  NewsStore.getQuotes();
});
</script>
