<template>
  <ModalWrapper v-if="ModalStore.formModal === 'add-movie'">
    <div
      class="xs:w-screen md:w-[60rem] xs:pt-2 xs:pb-10 md:py-10 xs:h-screen md:h-auto bg-[#11101A] md:rounded-xl md:mt-28"
    >
      <div
        class="relative xs:my-5 md:my-0 w-full flex flex-col items-center justify-center"
      >
        <h1 class="text-2xl text-white">
          {{ props.edit ? $t("add_movie.edit_movie") : $t("add_movie.add_movie") }}
        </h1>
        <hr class="border border-[#EFEFEF33] mt-6 w-full" />
        <ExitIcon @click="closeModal" class="absolute cursor-pointer right-10 top-2" />
      </div>
      <div class="w-full px-8 flex flex-col">
        <AuthorTag />
        <Form @submit="onSubmit" enctype="multipart/form-data" class="flex flex-col">
          <TheField
            name="movie_name_en"
            rules="required|min:3|max:50|en"
            placeholder="Movie name"
            lang="Eng"
            :bind="getFieldInputBinds('name.en').value.value"
          />
          <TheField
            name="movie_name_ka"
            rules="required|min:3|max:50|ka"
            placeholder="ფილმის სახელი"
            lang="ქარ"
            :bind="getFieldInputBinds('name.ka').value.value"
          />
          <ChipInput
            :propChips="getFieldInputBinds('genre').value.value || MovieStore.movie.genre"
            name="genre"
            :edit="props.edit"
            @chip-update="addChips"
            @remove-genre="removeGenre"
          />
          <TheField
            name="year"
            rules="required|number"
            placeholder="წელი"
            :bind="getFieldInputBinds('year').value.value"
          />
          <TheField
            name="director_name_en"
            rules="required|min:3|max:50|en"
            placeholder="Director"
            lang="Eng"
            :bind="getFieldInputBinds('director.en').value.value"
          />
          <TheField
            name="director_name_ka"
            rules="required|min:3|max:50|ka"
            placeholder="რეჟისორი"
            lang="ქარ"
            :bind="getFieldInputBinds('director.ka').value.value"
          />
          <TheField
            name="movie_description_en"
            rules="required|en"
            placeholder="Movie description"
            lang="Eng"
            type="textarea"
            :bind="getFieldInputBinds('description.en').value.value"
          />
          <TheField
            name="movie_description_ka"
            rules="required|ka"
            placeholder="ფილმის აღწერა"
            lang="ქარ"
            type="textarea"
            :bind="getFieldInputBinds('description.ka').value.value"
          />
          <FileUploadInput
            name="image"
            :edit="props.edit"
            :image="props.edit && image + MovieStore.movie.image"
            @selectFile="getFile"
            @drop.prevent="drop"
          />
          <the-button @click="submit" type="submit" class="w-full mt-10 text-xl">
            {{ props.edit ? $t("add_movie.edit_movie") : $t("add_movie.add_movie") }}
          </the-button>
        </Form>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "./ModalWrapper.vue";
import AuthorTag from "./AuthorTag.vue";
import TheField from "./TheField.vue";
import ChipInput from "./ChipInput.vue";
import FileUploadInput from "./FileUploadInput.vue";
import { Form, useForm } from "vee-validate";
import { ref } from "vue";
import { ExitIcon } from "./icons/index.js";
import { image } from "@/services/imagePrefixes";
import { useMovieStore } from "@/stores/movie";
import { useModalStore } from "@/stores/modal";
const MovieStore = useMovieStore();
const newImage = ref("");
const props = defineProps(["edit"]);
const { defineInputBinds, setValues } = useForm({
  initialValues: props.edit && MovieStore.movie,
});
const ModalStore = useModalStore();
const getFile = (img) => {
  setValues({
    image: img.value,
  });
  newImage.value = img.value;
};
const getFieldInputBinds = (field) => defineInputBinds(field);
const addChips = (event) => {
  if (props.edit) {
    getFieldInputBinds("genre").value.value = event.value;
  } else {
    setValues({
      genre: event,
    });
  }
};
const removeGenre = (event, chips) => {
  if (props.edit) {
    getFieldInputBinds("genre").value.value.splice(event, 1);
    setValues({
      genre: getFieldInputBinds("genre").value.value,
    });
  } else {
    getFieldInputBinds("genre").value.value = chips;
    setValues({
      genre: chips,
    });
  }
};
const onSubmit = (values) => {
  if (!props.edit) {
    MovieStore.addMovie(values, getFieldInputBinds("genre").value.value);
  } else {
    MovieStore.updateMovie(values, newImage, getFieldInputBinds("genre").value.value);
  }
  ModalStore.formModal = "";
};
const submit = () => {
  setValues({
    genre: getFieldInputBinds("genre").value.value,
    image: getFieldInputBinds("image").value.value,
  });
};
const closeModal = () => {
  ModalStore.formModal = "";
  ModalStore.closeModal();
};
</script>
