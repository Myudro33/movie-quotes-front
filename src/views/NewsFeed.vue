<template>
  <div class="md:w-[45rem] lg:w-[58.625rem] md:ml-36">
    <QuoteModal v-if="ModalStore.formModal === 'add-quote'" :inner="false" />
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
import QuoteModal from "../components/QuoteModal.vue";
import SearchInput from "../components/SearchInput.vue";
import QuoteCard from "../components/QuoteCard.vue";
import { onBeforeUnmount, onMounted } from "vue";
import { useNewsStore } from "@/stores/news";
import { useModalStore } from "@/stores/modal";
const NewsStore = useNewsStore();
const ModalStore = useModalStore();
onMounted(() => {
  window.addEventListener("scroll", NewsStore.handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", NewsStore.handleScroll);
});
</script>
