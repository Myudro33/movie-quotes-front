<template>
  <div class="w-full h-screen flex flex-col justify-center items-center text-white">
    <ForbiddenIcon />
    <h1 class="xs:text-2xl md:text-5xl mt-8 font-bold">You shall not pass!</h1>
    <p class="xs:w-10/12 md:w-full md:text-2xl text-center font-medium mt-5">
      Sorry, but you don’t have permission to access this page
    </p>
    <RouterLink :to="{ name: 'landing' }">
      <button class="bg-[#E31221] w-36 px-2 py-2 rounded-md mt-10">Return home</button>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ForbiddenIcon from "../components/icons/ForbiddenIcon.vue";
</script>
