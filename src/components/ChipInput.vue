<template>
  <Field v-slot="{ field, meta }" rules="required" name="genre" id="genre">
    <div
      @click="showItems"
      :class="[
        !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : 'border-[#6c757d]',
        meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
      ]"
      v-bind="field"
      class="w-full flex flex-wrap items-center gap-2 bg-[#11101A] border border-[#6C757D]-1 min-h-[48px] rounded-md"
    >
      <div
        v-if="!props.edit"
        v-for="(chip, i) of chips"
        :key="i"
        class="h-auto px-1 py-2"
      >
        <span
          class="text-white text-[14px] ml-2 bg-[#6C757D] px-2 py-2 flex justify-between items-center min-w-[70px]"
          >{{ useI18n().locale.value === "en" ? chip.en : chip.ka }}
          <button @click="removeGenre(i)">
            <ExitIcon /></button
        ></span>
      </div>
      <div v-else v-for="(chip, b) of editChips" :key="b" class="h-auto px-1 py-2">
        <span
          class="text-white text-[14px] ml-2 bg-[#6C757D] px-2 py-2 flex justify-between items-center min-w-[70px]"
          >{{ useI18n().locale.value === "en" ? chip.en : chip.ka }}
          <button @click="removeGenre(b)">
            <ExitIcon /></button
        ></span>
      </div>
      <label
        for="genre"
        class="text-white text-[20px] pl-2"
        v-if="chips.length < 1 && editChips.length < 1"
        >{{ $t("addmovie.genre") }}</label
      >
      <input
        v-bind="field"
        type="text"
        name="genre"
        disabled
        id="genre"
        :class="[
          !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
          meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
        ]"
        class="hidden"
      />
      <ul
        class="absolute xs:bottom-0 md:bottom-[21rem] px-10 bg-[#11101A] z-[100] rounded-md flex flex-col justify-around py-3"
        v-if="items"
      >
        <li
          v-if="!props.edit"
          @click="setGenre(genre)"
          v-for="(genre, i) of NewsStore.genres"
          :key="i"
          class="text-white text-[20px] cursor-pointer"
        >
          {{ useI18n().locale.value === "en" ? genre.en : genre.ka }}
        </li>
        <li
          v-else
          @click="setGenre(genre)"
          v-for="(genre, b) of NewsStore.genres"
          :key="b"
          class="text-white text-[20px] cursor-pointer"
        >
          {{ useI18n().locale.value === "en" ? genre.en : genre.ka }}
        </li>
      </ul>
    </div>
  </Field>
</template>

<script setup>
import { newGenre } from "../services";
import ExitIcon from "./icons/ExitIcon.vue";
import { Field } from "vee-validate";
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch } from "vue";
import { useNewsStore } from "../stores/NewsStore";
const NewsStore = useNewsStore();
const props = defineProps(["edit"]);
const items = ref(false);
const emit = defineEmits(["chip-update", "remove-genre"]);

const showItems = () => {
  items.value = !items.value;
};
const chips = ref([]);
const editChips = ref([]);
watch(chips.value, (chip) => {
  if (!props.edit) {
    emit("chip-update", chip);
  } else {
    emit("chip-update", editChips);
  }
});
onMounted(() => {
  if (props.edit) {
    editChips.value = [...NewsStore.movie.genre];
  }
});
const setGenre = (value) => {
  newGenre(chips, value, props, editChips);
};
const removeGenre = (value) => {
  emit("remove-genre", value);
  if (!props.edit) {
    chips.value.splice(value, 1);
  } else {
    editChips.value.splice(value, 1);
  }
};
</script>
