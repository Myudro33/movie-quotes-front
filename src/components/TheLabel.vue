<template>
  <label class="text-white font-bold flex" :for="props.label"
    >{{ props.title }}
    <p v-if="props.required" class="text-[#DC3545] ml-1">*</p></label
  >
</template>

<script setup>
const props = defineProps(['label', 'title', 'required'])
</script>
