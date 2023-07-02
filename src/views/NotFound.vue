<template>
  <div class="w-full h-screen flex flex-col justify-center items-center text-white">
    <GhostIcon />
    <h1 class="text-2xl md:text-5xl h-16 font-bold mt-7">
      {{ $t("not_found.heading") }}
    </h1>
    <p class="font-medium md:text-2xl mt-4">{{ $t("not_found.paragraph") }}</p>
    <RouterLink :to="{ name: 'landing' }">
      <button class="bg-[#E31221] px-4 py-2 rounded-md mt-10">
        {{ $t("forbidden.return") }}
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import GhostIcon from "../components/icons/GhostIcon.vue";
</script>
