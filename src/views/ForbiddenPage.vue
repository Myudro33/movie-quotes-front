<template>
  <div class="w-full h-screen flex flex-col justify-center items-center text-white">
    <ForbiddenIcon />
    <h1 class="xs:text-2xl md:text-5xl md:h-16 mt-8 font-bold">
      {{ $t("forbidden.heading") }}
    </h1>
    <p class="xs:w-10/12 md:w-full md:text-2xl text-center font-medium mt-5">
      {{ $t("forbidden.paragraph") }}
    </p>
    <RouterLink :to="{ name: 'landing' }">
      <button class="bg-[#E31221] px-4 py-2 rounded-md mt-10">
        {{ $t("forbidden.return") }}
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ForbiddenIcon } from "../components/icons/index.js";
</script>
