<template>
  <div>
    <label-component :required="required" :label="id" :title="label" />
    <Field
      class="w-full h-[38px] text-lg mt-2"
      :class="
        style
          ? `xs:border-b md:border-2 ${
              error
                ? 'xs:border-b-red-500 md:border-red-500'
                : 'xs:border-b-gray-500 md:border-gray-500'
            } md:px-5  xs:bg-transparent md:bg-white xs:outline-none md:outline md:rounded-[4px] xs:text-white md:text-black`
          : ` ${
              error ? 'border-red-500' : 'border-gray-500'
            } px-5 border-2  rounded-[4px]`
      "
      :id="id"
      :name="id"
      :type="type"
      :rules="rules"
      :placeholder="placeholder"
      :value="modelValue"
      @input="changeValue"
    />
    <ErrorMessage class="text-[#F15524] xs:text-sm md:text-base" :name="id" />
  </div>
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
    "style",
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
