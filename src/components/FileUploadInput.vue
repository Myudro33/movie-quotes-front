<template>
  <Field v-slot="{ field, meta }" :rules="required" name="image">
    <div
      v-bind="field"
      v-if="!props.stage"
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="[
        active ? 'border-2 border-dashed bg-[#41b88380]' : 'border border-[#6c757d]-1',
        !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : 'border-[#6c757d]-1',
        meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
      ]"
      class="w-full flex items-center py-[1.313rem] px-[1.125rem] mt-[1.375rem] text-white rounded-sm xs:justify-between md:justify-start"
    >
      <img
        v-if="props.edit"
        :src="props.image"
        class="xs:h-28 xs:w-44 md:h-36 md:w-96"
        alt=""
      />
      <div :class="props.edit && 'flex-col items-center mx-auto'" class="flex">
        <h1
          v-if="props.edit"
          class="text-[#DDCCAA] font-semibold my-2 xs:text-xs md:text-xl"
        >
          {{ $t("add_movie.replace_photo") }}
        </h1>
        <div class="flex items-center">
          <PhotoIcon
            :class="props.edit && 'xs:hidden md:flex'"
            class="mr-3 xs:w-6 md:w-auto"
          />
          <span class="xs:hidden md:flex md:text-xl">{{
            $t("add_quote.drag_drop")
          }}</span>
          <span :class="props.edit && 'xs:hidden'" class="md:hidden">{{
            $t("add_quote.upload_image")
          }}</span>
        </div>
        <label
          :class="props.edit && 'mt-2 ml-0'"
          class="xs:text-xs md:text-xl p-2 text-white bg-[#9747ff66] rounded-md ml-2"
          for="dropzoneFile"
          >{{ $t("add_quote.choose_file") }}</label
        >
        <input @input="selectedFile" class="hidden" type="file" id="dropzoneFile" />
        <p v-if="dropzoneFile.name" class="text-white ml-2">{{ dropzoneFile.name }}</p>
      </div>
    </div>
    <div v-else class="flex justify-center items-center">
      <div
        class="text-white text-2xl absolute xs:bottom-64 md:bottom-80 w-[8.4rem] h-[5.25rem] bg-black opacity-80 rounded-lg flex flex-col justify-center items-center"
      >
        <PhotoIcon />
        <label
          :class="props.edit && 'mt-2 ml-0'"
          class="xs:text-xs md:text-xl p-2 text-whitecursor-pointer rounded-md ml-2"
          for="dropzoneFile"
          >{{ $t("add_quote.choose_file") }}</label
        >
        <input @input="selectedFile" class="hidden" type="file" id="dropzoneFile" />
      </div>
    </div>
  </Field>
</template>

<script setup>
import { Field } from "vee-validate";
import { ref } from "vue";
import PhotoIcon from "./icons/PhotoIcon.vue";
const active = ref(false);
const dropzoneFile = ref("");
const emit = defineEmits(["selectFile"]);
const props = defineProps(["edit", "image", "stage"]);
const required = () => {
  console.log(props.image, dropzoneFile);
  if (props.image !== undefined || dropzoneFile.value !== "") {
    return true;
  }
  return false;
};
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
