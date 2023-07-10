<template>
  <div class="relative w-full flex flex-col">
    <Field
      v-model="propBind"
      v-slot="{ field, meta }"
      :rules="props.rules"
      :name="props.name"
    >
      <textarea
        :readonly="readonly"
        v-if="props.type === 'textarea'"
        :placeholder="placeholder"
        class="mt-6 rounded-md border placeholder:text-white outline-none py-[.3rem] px-2 bg-transparent h-[5.3rem] text-white xs:text-base md:text-2xl"
        :class="[
          !meta.valid && meta.touched && props.rules
            ? 'border-1 border-[#DC3545]'
            : 'border-[#6c757d]-1',
          meta.valid && meta.touched && props.rules ? 'border-1  border-[#198754]' : '',
        ]"
        v-bind="field"
      >
      </textarea>
      <input
        v-else
        v-bind="field"
        type="text"
        class="bg-transparent border mt-[1.25rem] placeholder:text-white outline-none h-12 text-white md:text-xl px-2 rounded-md"
        :placeholder="props.placeholder"
        :class="[
          !meta.valid && meta.touched
            ? 'border-1 border-[#DC3545]'
            : 'border-[#6c757d]-1',
          meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
        ]"
      />
    </Field>
    <p class="text-white absolute right-5 top-8 md:text-xl">{{ props.lang }}</p>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { ref } from "vue";
const props = defineProps([
  "name",
  "rules",
  "placeholder",
  "lang",
  "type",
  "bind",
  "readonly",
]);
const propBind = ref(props.bind);
</script>
