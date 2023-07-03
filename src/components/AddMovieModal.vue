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
        <Form @submit="addQuote" enctype="multipart/form-data" class="flex flex-col">
          <div class="relative w-full flex flex-col">
            <Field
              v-model="data.movie_name.en"
              v-slot="{ field, meta }"
              rules="required|min:3|max:50|en"
              name="movie_name.en"
            >
              <input
                v-bind="field"
                type="text"
                class="bg-transparent border mt-[1.25rem] placeholder:text-white outline-none h-12 text-white md:text-xl px-2 rounded-md"
                placeholder="Movie name"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]-1',
                  meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
                ]"
              />
            </Field>
            <p class="text-white absolute right-5 top-8 md:text-xl">Eng</p>
          </div>
          <div class="relative w-full flex flex-col">
            <Field
              v-model="data.movie_name.ka"
              v-slot="{ field, meta }"
              rules="required|min:3|max:50|ka"
              name="movie_name.ka"
            >
              <input
                v-bind="field"
                type="text"
                class="bg-transparent my-5 border placeholder:text-white outline-none h-12 text-white md:text-xl px-2 rounded-md"
                placeholder="ფილმის სახელი"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]-1',
                  meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
                ]"
              />
            </Field>
            <p class="text-white absolute right-5 top-8 md:text-xl">ქარ</p>
          </div>
          <ChipInput
            :edit="props.edit"
            @chip-update="addChips"
            @remove-genre="removeGenre"
          />
          <div class="relative w-full flex flex-col">
            <Field
              v-model="data.year"
              v-slot="{ field, meta }"
              rules="required|number"
              name="year"
              class="w-full"
            >
              <input
                v-bind="field"
                type="text"
                class="bg-transparent mt-6 border placeholder:text-white outline-none h-12 text-white md:text-xl px-2 rounded-md"
                :placeholder="$t('add_movie.year')"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]-1',
                  meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
                ]"
              />
            </Field>
          </div>
          <div class="relative w-full flex flex-col">
            <Field
              v-model="data.director.en"
              v-slot="{ field, meta }"
              rules="required|min:3|max:50|en"
              name="director_name.en"
              class="w-full"
            >
              <input
                v-bind="field"
                type="text"
                class="bg-transparent mt-6 border placeholder:text-white outline-none h-12 text-white md:text-xl px-2 rounded-md"
                placeholder="Director"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]-1',
                  meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
                ]"
              />
              <p class="text-white absolute right-5 top-8 md:text-xl">Eng</p>
            </Field>
          </div>
          <div class="relative w-full flex flex-col">
            <Field
              v-model="data.director.ka"
              v-slot="{ field, meta }"
              rules="required|min:3|max:50|ka"
              name="director_name.ka"
              class="w-full"
            >
              <input
                v-bind="field"
                type="text"
                class="bg-transparent mt-6 border placeholder:text-white outline-none h-12 text-white md:text-xl px-2 rounded-md"
                placeholder="რეჟისორი"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]-1',
                  meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
                ]"
              />
              <p class="text-white absolute right-5 top-8 md:text-xl">ქარ</p>
            </Field>
          </div>
          <div class="relative w-full flex flex-col">
            <Field
              rules="required|en"
              v-model="data.movie_description.en"
              v-slot="{ field, meta }"
              name="title_en"
            >
              <textarea
                placeholder="Movie description"
                class="mt-6 rounded-md border placeholder:text-white outline-none py-[.3rem] px-2 bg-transparent h-[5.3rem] text-white xs:text-base md:text-2xl"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]-1',
                  meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
                ]"
                v-bind="field"
              >
              </textarea>
              <p class="text-white absolute right-5 top-8 md:text-xl">Eng</p>
            </Field>
          </div>
          <div class="relative w-full flex flex-col">
            <Field
              rules="required|ka"
              v-model="data.movie_description.ka"
              v-slot="{ field, meta }"
              name="title_ka"
            >
              <textarea
                placeholder="ფილმის აღწერა"
                class="mt-[1.5rem] rounded-[.25rem] border placeholder:text-white outline-none py-[.3rem] px-[.5rem] bg-transparent h-[5.3rem] text-white xs:text-base md:text-[1.5rem]"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]-1',
                  meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
                ]"
                v-bind="field"
              ></textarea>
              <p class="text-white absolute right-5 top-8 md:text-xl">ქარ</p>
            </Field>
          </div>
          <FileUploadInput
            :edit="props.edit"
            :image="image + MovieStore.movie.image"
            @selectFile="getFile"
            @drop.prevent="drop"
          />
          <button
            @click="post"
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
import { Form, Field } from "vee-validate";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/AuthStore.js";
import { useMovieStore } from "../stores/MoviesStore";
const MovieStore = useMovieStore();
import { ExitIcon } from "./icons/index.js";
import FileUploadInput from "./FileUploadInput.vue";
import ChipInput from "./ChipInput.vue";
import { image } from "../services";
const props = defineProps(["edit"]);
const AuthStore = useAuthStore();
const data = ref({
  user_id: AuthStore.author.id,
  movie_name: { en: "", ka: "" },
  genre: [],
  year: "",
  director: { en: "", ka: "" },
  movie_description: { en: "", ka: "" },
  image: null,
});
const getFile = (img) => {
  data.value.image = img.value;
};

onMounted(() => {
  const movie = MovieStore.movie;
  if (props.edit && movie !== "") {
    data.value.movie_name = movie.name;
    data.value.director = movie.director;
    data.value.genre = movie.genre;
    data.value.year = movie.year;
    data.value.movie_description = movie.description;
    data.value.image = movie.image;
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
const post = () => {
  if (data.value.genre.length > 0) {
    if (!props.edit) {
      MovieStore.addMovie(data.value);
    } else {
      MovieStore.updateMovie(data.value);
    }
    MovieStore.modal = "";
  }
};
</script>
