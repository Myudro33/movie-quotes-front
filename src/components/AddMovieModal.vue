<template>
  <ModalWrapper v-if="MovieStore.modal === 'add-movie'">
    <div
      class="xs:w-screen md:w-[60rem] xs:pt-2 xs:pb-10 md:py-10 xs:h-screen md:h-auto bg-[#11101A] md:rounded-xl md:mt-28"
    >
      <div
        class="relative xs:my-5 md:my-0 w-full flex flex-col items-center justify-center"
      >
        <h1 class="text-2xl text-white">{{ $t("add_movie.add_movie") }}</h1>
        <hr class="border border-[#EFEFEF33] mt-6 w-full" />
        <ExitIcon
          @click="MovieStore.modal = ''"
          class="absolute cursor-pointer right-10 top-2"
        />
      </div>
      <div class="w-full px-8 flex flex-col">
        <AuthorTag />
        <Form
          @submit="onSubmit"
          v-slot="{ getValues, values, setValues }"
          enctype="multipart/form-data"
          class="flex flex-col"
        >
          <TheFIeld
            name="movie_name.en"
            rules="required|min:3|max:50|en"
            placeholder="Movie name"
            lang="Eng"
          />
          <TheFIeld
            name="movie_name.ka"
            rules="required|min:3|max:50|ka"
            placeholder="ფილმის სახელი"
            lang="ქარ"
          />
          <ChipInput
            name="genre"
            :edit="props.edit"
            @chip-update="addChips"
            @remove-genre="removeGenre"
          />
          <TheFIeld :bind="year" name="year" rules="required|number" placeholder="წელი" />
          <TheFIeld
            name="director_name.en"
            rules="required|min:3|max:50|en"
            placeholder="Director"
            lang="Eng"
          />
          <TheFIeld
            name="director_name.ka"
            rules="required|min:3|max:50|ka"
            placeholder="რეჟისორი"
            lang="ქარ"
          />
          <TheFIeld
            name="movie_description.en"
            rules="required|en"
            placeholder="Movie description"
            lang="Eng"
            type="textarea"
          />
          <TheFIeld
            name="movie_description.ka"
            rules="required|ka"
            placeholder="ფილმის აღწერა"
            lang="ქარ"
            type="textarea"
          />
          <FileUploadInput
            name="image"
            :edit="props.edit"
            :image="image + MovieStore.movie.image"
            @selectFile="getFile"
            @drop.prevent="drop"
          />
          <button
            @click="submit(setValues)"
            type="submit"
            class="w-full h-12 bg-[#E31221] text-white mt-10 text-xl rounded-[.3rem]"
          >
            {{ $t("add_movie.add_movie") }}
          </button>
        </Form>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "./ModalWrapper.vue";
import AuthorTag from "./AuthorTag.vue";
import { Form, useForm } from "vee-validate";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/AuthStore.js";
import { useMovieStore } from "../stores/MoviesStore";
const MovieStore = useMovieStore();
import { ExitIcon } from "./icons/index.js";
import FileUploadInput from "./FileUploadInput.vue";
import ChipInput from "./ChipInput.vue";
import { image } from "../services";
import TheFIeld from "./icons/TheFIeld.vue";
const props = defineProps(["edit"]);
const AuthStore = useAuthStore();
const data = ref({
  genre: [],
  image: null,
});
const getFile = (img) => {
  data.value.image = img.value;
};
const { setValues, values, defineInputBinds } = useForm();
const year = defineInputBinds("year");

onMounted(() => {
  const movie = MovieStore.movie;
  if (props.edit && movie !== "") {
    setValues(MovieStore.movie);
    console.log(values);
  }
});
const addChips = (event) => {
  if (props.edit) {
    data.value.genre = event.value;
  } else {
    data.value.genre = event;
  }
};
const removeGenre = (event) => {
  data.value.genre.splice(event, 1);
};
const onSubmit = async (values) => {
  if (!props.edit) {
    MovieStore.addMovie(values);
  } else {
    MovieStore.updateMovie(values);
  }
  MovieStore.modal = "";
};

const submit = (setValues) => {
  setValues({ genre: data.value.genre, image: data.value.image });
};
</script>
