<template>
  <Field v-slot="{ field, meta }" :rules="required" name="genre" id="genre">
    <div
      @click="showItems"
      :class="[
        !meta.valid && meta.touched ? 'border-1 border-red-error' : 'border-gray-950-1',
        meta.valid && meta.touched ? 'border-1  border-green-success' : '',
      ]"
      v-bind="field"
      class="w-full flex flex-wrap mt-5 items-center gap-2 bg-black-background border border-gray-950-1 min-h-[3rem] rounded-md"
    >
      <div class="flex" v-if="!props.edit">
        <div v-for="(chip, i) of chips" :key="i" class="h-auto px-1 py-2">
          <span
            class="text-white text-sm bg-gray-950 px-2 py-2 flex justify-between items-center min-w-[4.3rem]"
            >{{ useI18n().locale.value === "en" ? chip.name.en : chip.name.ka }}
            <button type="button" @click="removeGenre(i)">
              <ExitIcon /></button
          ></span>
        </div>
      </div>

      <div v-else v-for="(chip, b) of chipsProps" :key="b" class="h-auto px-1 py-2">
        <span
          class="text-white text-sm bg-gray-950 px-2 py-2 flex justify-between items-center min-w-[4.3rem]"
          >{{ useI18n().locale.value === "en" ? chip.name.en : chip.name.ka }}
          <button type="button" @click="removeGenre(b)">
            <ExitIcon /></button
        ></span>
      </div>
      <label
        for="genre"
        class="text-white text-xl"
        v-if="chips.length < 1 && editChips.length < 1"
        >{{ $t("add_movie.genre") }}</label
      >
      <input
        v-bind="field"
        type="text"
        name="genre"
        disabled
        id="genre"
        :class="[
          !meta.valid && meta.touched ? 'border-1 border-red-error' : '',
          meta.valid && meta.touched ? 'border-1  border-green-success' : '',
        ]"
        class="hidden"
      />
      <ul
        class="absolute xs:bottom-0 md:bottom-[21rem] px-10 bg-black-background z-[100] rounded-md flex flex-col justify-around py-3"
        v-if="items"
      >
        <div>
          <li
            @click="setGenre(genre)"
            v-for="(genre, i) of MovieStore.genres"
            :key="i"
            class="text-white text-xl cursor-pointer"
          >
            {{ useI18n().locale.value === "en" ? genre.name.en : genre.name.ka }}
          </li>
        </div>
      </ul>
    </div>
  </Field>
</template>

<script setup>
import ExitIcon from "./icons/ExitIcon.vue";
import { Field } from "vee-validate";
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch } from "vue";
import { useMovieStore } from "@/stores/movie";
const MovieStore = useMovieStore();
const props = defineProps(["edit", "propChips"]);
const items = ref(false);
const emit = defineEmits(["chip-update", "remove-genre"]);
const chipsProps = ref(props.propChips);
const showItems = () => {
  items.value = !items.value;
};
const required = () => {
  if (props.edit && chipsProps.value.length > 0) {
    return true;
  } else if (!props.edit && chips.value.length > 0) {
    return true;
  } else {
    return false;
  }
};
const chips = ref([]);
const editChips = ref([]);
watch(chips.value, (chip) => {
  if (!props.edit) {
    emit("chip-update", chip);
  } else {
    emit("chip-update", chipsProps);
  }
});
onMounted(() => {
  if (props.edit) {
    editChips.value = MovieStore.movie.genre;
  }
});
const setGenre = (value) => {
  if (!props.edit) {
    !chips.value.includes(value) && chips.value.push(value);
  } else {
    const exists = chipsProps.value.find((item) => item.id === value.id) !== undefined;
    !exists && chipsProps.value.push(value);
  }
};
const removeGenre = (value) => {
  if (!props.edit) {
    emit("remove-genre", value, chips);
    chips.value.splice(value, 1);
  } else {
    emit("remove-genre", value, chipsProps);
    chipsProps.value.splice(value, 0);
  }
};
</script>
