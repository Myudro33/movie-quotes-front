<template>
  <Field v-slot="{ field, meta }" :rules="requiredGenre" name="genre" id="genre">
    <div
      @click="showItems"
      :class="[
        !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : 'border-[#6c757d]',
        meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
      ]"
      v-bind="field"
      class="w-full flex flex-wrap items-center gap-2 bg-[#11101A] border border-[#6C757D]-1 min-h-[48px] rounded-md"
    >
      <div v-for="(chip, i) of chips" :key="i" class="h-auto px-1 py-2">
        <span
          class="text-white text-[14px] ml-2 bg-[#6C757D] px-2 py-2 flex justify-between items-center min-w-[70px]"
          >{{ useI18n().locale.value === "en" ? chip.en : chip.ka }}
          <button @click="removeGenre(i)">
            <ExitIcon /></button
        ></span>
      </div>
      <label for="genre" class="text-white text-[20px] pl-2" v-if="chips.length < 1">{{
        $t("addmovie.genre")
      }}</label>
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
          @click="setGenre(genre)"
          v-for="(genre, i) of NewsStore.genres"
          :key="i"
          class="text-white text-[20px] cursor-pointer"
        >
          {{ useI18n().locale.value === "en" ? genre.en : genre.ka }}
        </li>
      </ul>
    </div>
  </Field>
</template>

<script setup>
import ExitIcon from "./icons/ExitIcon.vue";
import { Field } from "vee-validate";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { useNewsStore } from "../stores/NewsStore";
const NewsStore = useNewsStore();
const items = ref(false);
const emit = defineEmits(["chip-update"]);

const showItems = () => {
  items.value = !items.value;
};
const chips = ref([]);
watch(chips.value, (chip) => {
  console.log(chip);
  emit("chip-update", chip);
});

const requiredGenre = () => {
  NewsStore.requiredGenre(chips);
};

const setGenre = (value) => {
  NewsStore.setGenre(chips, value);
};

const removeGenre = (value) => {
  chips.value.splice(value, 1);
};
</script>
