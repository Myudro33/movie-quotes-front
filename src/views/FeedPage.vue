<template>
  <div class="flex md:mt-8">
    <TheSidebar />
    <div class="md:ml-[10rem] lg:ml-[17rem] xs:w-full md:w-[938px]">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import TheSidebar from '../components/TheSidebar.vue'
</script>
