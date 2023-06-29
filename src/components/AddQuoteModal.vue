<template>
  <ModalWrapper v-if="NewsStore.modal === 'add-quote'">
    <div
      class="xs:w-screen md:w-[60rem] xs:z-40 xs:pt-2 xs:pb-10 md:py-10 md:h-auto bg-[#11101A] md:rounded-xl md:mt-28"
    >
      <div
        class="relative xs:h-16 xs:my-5 md:my-0 w-full flex flex-col items-center justify-center"
      >
        <div
          class="flex absolute xs:left-4 md:left-8 md:h-5/6 top-0 justify-between xs:w-28 md:w-36 rounded-lg items-center px-5"
        >
          <PenIcon
            @click="MovieStore.quoteModal = 'edit'"
            v-if="props.stage === 'view'"
            class="cursor-pointer"
          />
          <hr v-if="props.stage === 'view'" class="border border-[#6C757D] h-5" />
          <div
            @click="deleteQuote(MovieStore.quote.id)"
            class="flex items-center cursor-pointer"
          >
            <TrashIcon v-if="props.stage === 'edit' || props.stage === 'view'" />
            <h1 v-if="props.stage === 'edit'" class="text-white ml-2">
              {{ $t("add_quote.delete_quote") }}
            </h1>
          </div>
        </div>
        <h1 v-if="props.stage !== ''" class="text-2xl xs:hidden md:flex text-white">
          {{
            props.stage === "view"
              ? $t("add_quote.view_quote")
              : $t("add_quote.edit_quote")
          }}
        </h1>
        <h1 v-else class="text-2xl text-white">
          {{ $t("add_quote.create_quote") }}
        </h1>
        <hr class="border border-[#EFEFEF33] mt-6 w-full" />
        <ExitIcon
          @click="NewsStore.modal = ''"
          class="absolute cursor-pointer right-10 xs:top-0 md:top-2"
        />
      </div>
      <div class="w-full px-8 flex flex-col">
        <AuthorTag />
        <Form
          @submit="addQuote"
          enctype="multipart/form-data"
          class="flex flex-col relative"
        >
          <div class="relative w-full flex flex-col">
            <Field
              rules="required|en"
              v-model="data.title.en"
              v-slot="{ field, meta }"
              name="title_en"
            >
              <textarea
                :readonly="props.stage === 'view'"
                placeholder="Start create new quote"
                class="mt-[1.5rem] rounded-[.25rem] border outline-none py-[.3rem] px-[.5rem] bg-transparent h-[5.3rem] text-white xs:text-base md:text-[1.5rem]"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]',
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
              v-model="data.title.ka"
              v-slot="{ field, meta }"
              name="title_ka"
            >
              <textarea
                :readonly="props.stage === 'view'"
                placeholder="ახალი ციტატა"
                class="mt-[1.5rem] rounded-[.25rem] border outline-none py-[.3rem] px-[.5rem] bg-transparent h-[5.3rem] text-white xs:text-base md:text-[1.5rem]"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : 'border-[#6c757d]',
                  meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
                ]"
                v-bind="field"
              ></textarea>
              <p class="text-white absolute right-5 top-8 md:text-xl">ქარ</p>
            </Field>
          </div>
          <FileUploadInput
            :stage="props.stage === 'edit' && true"
            v-if="props.stage !== 'view'"
            @selectFile="getFile"
            @drop.prevent="drop"
          />
          <div
            v-if="props.stage !== 'view' && props.stage !== 'edit'"
            class="relative w-full flex items-center bg-[#000000] rounded-sm h-[5.3rem] mt-7 p-4"
          >
            <CameraIcon class="mr-3" color="#fff" />
            <Field
              rules="required"
              v-model="data.movie_id"
              class="text-white bg-[#000000] h-full w-full text-2xl outline-none"
              name="field"
              as="select"
            >
              <option selected disabled value="">
                {{ $t("add_quote.choose_movie") }}
              </option>
              <option selected v-if="props.inner" :value="props.movie.id">
                {{
                  useI18n().locale.value === "en"
                    ? props.movie.name.en
                    : props.movie.name.ka
                }}
              </option>
              <option
                v-else
                v-for="(item, index) in NewsStore.movies"
                :key="index"
                :value="item.id"
              >
                {{ useI18n().locale.value === "en" ? item.name.en : item.name.ka }}
              </option>
            </Field>
          </div>
          <ErrorMessage class="text-red-500" name="field" />
          <button
            v-if="props.stage !== 'view' && props.stage !== 'edit'"
            type="submit"
            class="w-full h-12 bg-[#E31221] text-white mt-10 text-xl rounded-[.3rem]"
          >
            {{ $t("add_quote.post") }}
          </button>
          <img
            v-if="props.stage === 'view' || props.stage === 'edit'"
            :src="image + data.image"
            alt="quote img"
            class="w-full md:h-[32rem] xs:h-80 rounded-xl xs:my-6"
          />
        </Form>
        <button
          @click="quoteUpdate"
          v-if="props.stage === 'edit'"
          type="button"
          class="w-full h-12 bg-[#E31221] text-white mt-10 text-xl rounded-[.3rem]"
        >
          {{ $t("add_quote.save_changes") }}
        </button>
        <div v-if="props.stage === 'view'" class="flex">
          <div class="flex">
            <h1 class="text-white text-2xl mr-2">
              {{ MovieStore.quote.comments?.length }}
            </h1>
            <CommentIcon />
          </div>
          <div class="flex">
            <h1 class="text-white text-2xl ml-4 mr-2">
              {{ MovieStore.quote.likes?.length }}
            </h1>
            <HeartIcon :color="liked" @click="addLike()" class="cursor-default" />
          </div>
        </div>
        <hr v-if="props.stage !== 'edit'" class="border w-full border-[#EFEFEF33] mt-6" />
        <div v-if="props.stage === 'view'">
          <TheComment
            v-for="(item, index) in MovieStore.quote.comments"
            :comment="item"
            :key="index"
          />
        </div>
        <Form
          v-if="props.stage === 'view'"
          @submit="addComment"
          class="flex flex-col mt-6"
        >
          <div class="w-full flex">
            <img
              class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover text-white shrink-0 rounded-full"
              :src="avatar + AuthStore.author.avatar"
              alt="avatar"
            />
            <Field rules="required" name="title" v-model="title" v-slot="{ field }">
              <input
                v-bind="field"
                class="w-full text-white xs:h-10 md:h-[52px] ml-6 pl-6 outline-none bg-[#24222F] text-xl rounded-[10px]"
                type="text"
                placeholder="Write a comment"
              />
            </Field>
          </div>
          <ErrorMessage class="text-red-500 ml-20" name="title" />
        </Form>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import { deleteQuote } from "../services/quoteServices";
import TheComment from "../components/TheComment.vue";
import { createComment } from "../services/commentService";
import { image, avatar } from "../services";
import { deleteLike, createLike } from "../services/likeService";
import { useMovieStore } from "../stores/MoviesStore";
import { useAuthStore } from "../stores/AuthStore";
import { useNewsStore } from "../stores/NewsStore";
import ModalWrapper from "./ModalWrapper.vue";
import PenIcon from "../components/icons/PenIcon.vue";
import TrashIcon from "../components/icons/TrashIcon.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive, onMounted, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import ExitIcon from "./icons/ExitIcon.vue";
import FileUploadInput from "./FileUploadInput.vue";
import CameraIcon from "./icons/CameraIcon.vue";
import CommentIcon from "../components/icons/CommentIcon.vue";
import HeartIcon from "../components/icons/HeartIcon.vue";
import AuthorTag from "./AuthorTag.vue";
const MovieStore = useMovieStore();
const AuthStore = useAuthStore();
const NewsStore = useNewsStore();
const props = defineProps(["inner", "movie", "stage"]);
const title = ref("");
const data = reactive({
  user_id: AuthStore.author.id,
  movie_id: props.inner ? props.movie.id : "",
  title: { en: "", ka: "" },
  image: null,
});
const liked = computed(() => {
  return MovieStore.quote.likes.some((like) => like.author_id === AuthStore.author.id);
});
const getFile = (img) => {
  data.image = img.value;
};
onMounted(() => {
  MovieStore.getMovies();
  if (props.stage !== "") {
    data.title = { en: MovieStore.quote.title?.en, ka: MovieStore.quote.title?.ka };
    data.image = MovieStore?.quote?.image;
  }
});
const addQuote = () => {
  NewsStore.addQuote(data);
  NewsStore.modal = "";
};
const quoteUpdate = () => {
  NewsStore.updateQuote(data, MovieStore.quote);
  NewsStore.modal = "";
};
const addComment = () => {
  const data = {
    user_id: AuthStore.author.id,
    title: title.value,
  };
  createComment(data, MovieStore.quote);
  title.value = "";
};
const addLike = () => {
  const data = { quote_id: MovieStore?.quote.id, user_id: AuthStore.author.id };
  liked.value ? deleteLike(data, MovieStore.quote) : createLike(data, MovieStore.quote);
};
</script>
