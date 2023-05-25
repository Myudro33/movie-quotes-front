<template>
  <label-component :required="required" :label="id" :title="label" />
  <Field
    :class="`w-full h-[38px] ${
      error ? 'border-red-500' : 'border-gray-500'
    } px-5 border-2 text-lg mt-2 rounded-[4px]`"
    :id="id"
    :name="id"
    :type="type"
    :rules="rules"
    :placeholder="placeholder"
    :value="modelValue"
    @input="changeValue"
  />
  <ErrorMessage class="text-[#F15524] xs:text-sm md:text-base" :name="id" />
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  props: [
    "modelValue",
    "id",
    "placeholder",
    "label",
    "rules",
    "required",
    "type",
    "error",
  ],
  components: {
    Field,
    ErrorMessage,
  },
  methods: {
    changeValue($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>
