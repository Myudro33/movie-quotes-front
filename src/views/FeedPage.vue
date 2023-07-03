<template>
  <div class="flex md:mt-8">
    <TheSidebar />
    <div class="md:ml-[7rem] xs:w-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import TheSidebar from "../components/TheSidebar.vue";
</script>
