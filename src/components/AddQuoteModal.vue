<template>
  <div
    v-if="NewsStore.modal"
    class="absolute w-full h-full flex justify-center bg-[#18162380] left-0 top-0 z-[100]"
  >
    <div
      class="w-[60rem] xs:py-2 md:py-10 xs:h-screen md:h-auto bg-[#11101A] md:rounded-xl md:mt-28"
    >
      <div
        class="relative xs:my-5 md:my-0 w-full flex flex-col items-center justify-center"
      >
        <h1 class="text-2xl text-white">Write new quote</h1>
        <hr class="border border-[#EFEFEF33] mt-6 w-full" />
        <ExitIcon
          @click="NewsStore.modal = false"
          class="absolute cursor-pointer right-10 top-2"
        />
      </div>
      <div class="w-full px-8 flex flex-col">
        <div class="flex md:mt-7 items-center">
          <img
            class="xs:w-10 xs:h-10 md:w-16 md:h-16 rounded-full object-cover"
            :src="AuthStore.author.avatar"
            alt="avatar"
          />
          <h1 class="text-white text-lg ml-4">{{ AuthStore?.author.username }}</h1>
        </div>
        <Form @submit="addQuote" enctype="multipart/form-data" class="flex flex-col">
          <div class="relative w-full flex flex-col">
            <Field
              rules="required|en"
              v-model="data.title.en"
              v-slot="{ field }"
              name="title_en"
            >
              <textarea
                placeholder="Start create new quote"
                class="textarea xs:text-base md:text-[1.5rem]"
                v-bind="field"
              >
              </textarea>
              <p class="text-white absolute right-5 top-8 md:text-xl">Eng</p>
              <ErrorMessage class="text-red-500" name="title_en" />
            </Field>
          </div>
          <div class="relative w-full flex flex-col">
            <Field
              rules="required|ka"
              v-model="data.title.ka"
              v-slot="{ field }"
              name="title_ka"
            >
              <textarea
                placeholder="ახალი ციტატა"
                class="textarea xs:text-base md:text-[1.5rem]"
                v-bind="field"
              ></textarea>
              <p class="text-white absolute right-5 top-8 md:text-xl">ქარ</p>
              <ErrorMessage class="text-red-500" name="title_ka" />
            </Field>
          </div>
          <FileUploadInput @selectFile="getFile" @drop.prevent="drop" />
          <div
            class="relative w-full flex items-center bg-[#000000] rounded-sm h-[5.3rem] mt-7 p-4"
          >
            <CameraIcon class="mr-3" color="#fff" />
            <Field
              rules="required"
              v-model="data.movie_id"
              class="text-white bg-transparent h-full w-full text-2xl outline-none"
              name="field"
              as="select"
            >
              <option selected disabled value="">Choose movie</option>
              <option
                v-for="(item, index) in NewsStore.movies"
                :key="index"
                :value="item.id"
              >
                {{ getMovieName(item.name) }}
              </option>
            </Field>
          </div>
          <ErrorMessage class="text-red-500" name="field" />
          <button
            type="submit"
            class="w-full h-12 bg-[#E31221] text-white mt-10 text-xl rounded-[.3rem]"
          >
            Post
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive, onMounted } from "vue";
import { useAuthStore } from "../stores/AuthStore.js";
import { useNewsStore } from "../stores/NewsStore.js";
import { useI18n } from "vue-i18n";
import ExitIcon from "./icons/ExitIcon.vue";
import FileUploadInput from "./FileUploadInput.vue";
import CameraIcon from "./icons/CameraIcon.vue";
const AuthStore = useAuthStore();
const NewsStore = useNewsStore();
const data = reactive({
  user_id: AuthStore.author.id,
  movie_id: "",
  title: { en: "", ka: "" },
  image: null,
});
const getMovieName = (name) => {
  if (useI18n().locale.value === "en") {
    return name.en;
  } else {
    return name.ka;
  }
};
const getFile = (img) => {
  data.image = img.value;
};
onMounted(() => {
  NewsStore.getMovies();
});
const addQuote = () => {
  NewsStore.addQuote(data);
  NewsStore.modal = false;
};
</script>

<style scoped>
select {
  background-color: black;
}
.textarea {
  margin-top: 1.5rem;
  border-radius: 0.25rem;
  border: 1px solid #6c757d;
  outline: none;
  padding: 0.3rem 0.5rem;
  background-color: transparent;
  height: 5.3rem;
  color: white;
}
</style>
