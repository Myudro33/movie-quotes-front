<template>
  <div>
    <label-component :label="id" :title="label" />
    <Field
      :class="`w-full h-[38px] border-b ${
        error ? 'border-b-red-500' : 'border-b-gray-500'
      } px-5  text-lg mt-2 bg-transparent outline-none`"
      :name="id"
      :id="id"
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
  props: ["modelValue", "id", "placeholder", "label", "rules", "type", "error"],
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
