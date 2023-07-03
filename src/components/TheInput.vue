<template>
  <div class="relative">
    <label-component :required="required" :label="id" :title="label" />
    <Field
      :readonly="readonly"
      validateOnInput
      v-slot="{ field, meta }"
      :name="id"
      :rules="rules"
    >
      <input
        :placeholder="placeholder"
        v-bind="field"
        class="w-full h-[2.375rem] text-lg mt-2"
        :class="
          style
            ? `xs:border-b md:border-2  ${
                !meta.valid
                  ? 'xs:border-b-red-500  md:border-red-500'
                  : 'xs:border-b-gray-500 md:border-gray-500'
              } md:px-5  xs:bg-transparent md:bg-white xs:outline-none md:outline md:rounded-md xs:text-white md:text-black`
            : ` ${
                !meta.valid && meta.touched
                  ? 'border-1 border-[#DC3545]'
                  : 'border-[#6c757d]-1'
              } ${
                meta.valid && meta.touched ? 'border-1  border-[#198754]' : ''
              }  px-5 border-2  rounded-md outline-none `
        "
        :type="localType"
      />
      <SuccessIcon class="absolute top-10 right-8" v-if="meta.valid && meta.touched" />
      <WarningIcon
        class="absolute top-10 right-8"
        v-else-if="!meta.valid && meta.touched"
      />
    </Field>
    <EyeIcon
      @click="changeInputType"
      class="absolute z-30 right-2 cursor-pointer top-11"
      v-if="id === 'password' || id === 'confirmPassword'"
    />
    <ErrorMessage class="text-[#F15524] xs:text-sm md:text-base" :name="id" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage, useField } from "vee-validate";
import { watch, ref } from "vue";
import { EyeIcon, SuccessIcon, WarningIcon } from "./icons/index.js";
const props = defineProps([
  "modelValue",
  "id",
  "placeholder",
  "label",
  "rules",
  "required",
  "type",
  "error",
  "style",
  "readonly",
]);
const localType = ref(props.type);
const { errorMessage } = useField(() => props.id);
const emit = defineEmits(["update:modelValue", "update:errorMessage"]);
const changeValue = ($event) => {
  emit("update:modelValue", $event.target.value, errorMessage.value);
};
const changeInputType = () => {
  if (localType.value === "password") {
    return (localType.value = "text");
  } else {
    return (localType.value = "password");
  }
};
watch(errorMessage, (error) => {
  emit("update:errorMessage", error);
});
</script>
