<template>
  <div class="xs:w-full md:w-[27.5rem] xs:mt-14 text-white">
    <RouterLink :to="{ name: 'film', params: { id: props.movie.id } }">
      <img
        class="rounded-xl w-full xs:h-[18.875rem] md:h-[23.188rem] object-cover"
        :src="image + props.movie.image"
        alt="movie"
      />
      <h1 class="text-2xl my-4 flex">
        {{ useI18n().locale.value === "en" ? props.movie.name.en : props.movie.name.ka }}
        <p class="ml-2">({{ props.movie.year }})</p>
      </h1>
      <div class="flex items-center">
        <h1 class="text-xl">{{ movie.quotes?.length }}</h1>
        <QuotesIcon class="ml-3" />
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { image } from "@/services/imagePrefixes";
import { QuotesIcon } from "@/components/icons/index.js";
import { useI18n } from "vue-i18n";
const props = defineProps(["movie"]);
</script>
