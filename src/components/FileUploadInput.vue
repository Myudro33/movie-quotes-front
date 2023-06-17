<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="toggleActive"
    :class="active ? 'active-dropzone' : 'notactive-dropzone'"
    class="dropzone xs:justify-between md:justify-start"
  >
    <div class="flex items-center">
      <PhotoIcon class="mr-3" />
      <span class="xs:hidden md:flex md:text-xl">{{ $t("addquote.drag_drop") }}</span>
      <span class="md:hidden">{{ $t("addquote.upload_image") }}</span>
    </div>
    <label class="xs:text-base md:text-xl" for="dropzoneFile">{{
      $t("addquote.choose_file")
    }}</label>
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

<style scoped>
.active-dropzone {
  border: 2px dashed green;
  background-color: #41b88380;
}
.notactive-dropzone {
  border: 1px solid #6c757d;
}
label {
  padding: 8px;
  color: #fff;
  background-color: #9747ff66;
  border-radius: 4px;
  transition: 0.3s ease all;
  margin-left: 8px;
}
.dropzone {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 21px 18px;
  transition: 0.3 ease all;
  margin-top: 22px;
  color: white;
  border-radius: 4px;
}
</style>
