<template>
  <label class="text-white font-bold flex" :for="label"
    >{{ title }}
    <p v-if="required" class="text-[#DC3545] ml-1">*</p></label
  >
</template>

<script>
export default {
  props: ["label", "title", "required"],
};
</script>
