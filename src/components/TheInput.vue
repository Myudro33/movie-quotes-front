<template>
  <div class="relative w-full flex flex-col">
    <label-component
      :required="props.required"
      :label="props.name"
      :title="props.label"
    />
    <Field
      v-model="propBind"
      v-slot="{ field, meta }"
      :rules="props.rules"
      :name="props.name"
    >
      <input
        v-bind="field"
        :type="localType"
        @input="change"
        :placeholder="props.placeholder"
        class="w-full h-[2.375rem] text-lg mt-2"
        :class="
          style
            ? `xs:border-b md:border-2   ${
                !meta.valid && meta.touched
                  ? 'xs:border-b-red-500  md:border-red-500'
                  : 'xs:border-b-gray-500 md:border-gray-500'
              } md:px-5  xs:bg-transparent md:bg-white xs:outline-none md:outline md:rounded-md xs:text-white md:text-black`
            : ` ${
                !meta.valid && meta.touched
                  ? 'border-1 border-[#DC3545]'
                  : 'border-[#6c757d]-1'
              } ${
                meta.valid && meta.touched ? 'border-1  border-[#198754]' : ''
              }  px-5 border-2  rounded-md outline-none`
        "
      />
      <SuccessIcon class="absolute top-10 right-8" v-if="meta.valid && meta.touched" />
      <WarningIcon
        class="absolute top-10 right-8"
        v-else-if="!meta.valid && meta.touched"
      />
    </Field>
    <EyeIcon
      @click="changeInputType"
      class="absolute z-10 right-2 cursor-pointer top-11"
      v-if="props.type === 'password' && localType === 'text' && props.page !== 'profile'"
    />
    <EyeIcon2
      color="#6c757d"
      @click="changeInputType"
      class="w-[0.875rem] h-[0.875rem] absolute z-10 right-2 cursor-pointer top-11"
      v-if="
        props.type === 'password' && localType === 'password' && props.page !== 'profile'
      "
    />
    <ErrorMessage class="text-red-500" :name="props.name" />
  </div>
</template>

<script setup>
import { Field, useField } from "vee-validate";
import { ref, watch } from "vue";
import { EyeIcon, EyeIcon2, SuccessIcon, WarningIcon } from "./icons/index.js";
const props = defineProps([
  "name",
  "rules",
  "placeholder",
  "lang",
  "type",
  "bind",
  "readonly",
  "label",
  "required",
  "page",
  "style",
]);
const emits = defineEmits("change-value");
const propBind = ref(props.bind);
const localType = ref(props.type);
const change = (event) => {
  emits("change-value", event.target.value, props.name);
};

const { errorMessage } = useField(props.name);
watch(errorMessage, (error) => {
  emits("error-value", error);
});
const changeInputType = () => {
  if (localType.value === "password") {
    return (localType.value = "text");
  } else {
    return (localType.value = "password");
  }
};
</script>
