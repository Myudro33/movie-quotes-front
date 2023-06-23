<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="toggleActive"
    :class="active ? 'border-2 border-dashed bg-[#41b88380]' : 'border border-[#6c757d]'"
    class="w-full flex items-center py-[1.313rem] px-[1.125rem] mt-[1.375rem] text-white rounded-sm xs:justify-between md:justify-start"
  >
    <div class="flex items-center">
      <PhotoIcon class="mr-3 xs:w-6 md:w-auto" />
      <span class="xs:hidden md:flex md:text-xl">{{ $t("addquote.drag_drop") }}</span>
      <span class="md:hidden">{{ $t("addquote.upload_image") }}</span>
    </div>
    <label
      class="xs:text-xs md:text-xl p-2 text-white bg-[#9747ff66] rounded-[4px] ml-2"
      for="dropzoneFile"
      >{{ $t("addquote.choose_file") }}</label
    >
    <input @input="selectedFile" class="hidden" type="file" id="dropzoneFile" />
    <p v-if="dropzoneFile.name" class="text-white ml-2">{{ dropzoneFile.name }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PhotoIcon from "./icons/PhotoIcon.vue";
const active = ref(false);
const dropzoneFile = ref("");
const emit = defineEmits(["selectFile"]);
const toggleActive = (e) => {
  active.value = !active.value;
  dropzoneFile.value = e.dataTransfer.files[0];
  emit("selectFile", dropzoneFile);
};
const selectedFile = (e) => {
  dropzoneFile.value = e.target.files[0];
  emit("selectFile", dropzoneFile);
};
</script>
