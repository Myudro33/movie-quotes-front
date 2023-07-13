<template>
  <ModalWrapper v-if="ModalStore.formModal === 'add-quote'">
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
            @click="queryModal('edit')"
            v-if="props.mode === 'view'"
            class="cursor-pointer"
          />
          <hr v-if="props.mode === 'view'" class="border border-[#6C757D] h-5" />
          <div
            @click="NewsStore.deleteQuote(NewsStore.quote.id)"
            class="flex items-center cursor-pointer"
          >
            <TrashIcon v-if="props.mode === 'edit' || props.mode === 'view'" />
            <h1 v-if="props.mode === 'edit'" class="text-white ml-2">
              {{ $t("add_quote.delete_quote") }}
            </h1>
          </div>
        </div>
        <h1 v-if="props.mode !== undefined" class="text-2xl xs:hidden md:flex text-white">
          {{
            props.mode === "view"
              ? $t("add_quote.view_quote")
              : $t("add_quote.edit_quote")
          }}
        </h1>
        <h1 v-else class="text-2xl text-white">
          {{ $t("add_quote.create_quote") }}
        </h1>
        <hr class="border border-[#EFEFEF33] mt-6 w-full" />
        <ExitIcon
          @click="queryModal('close')"
          class="absolute cursor-pointer right-10 xs:top-0 md:top-2"
        />
      </div>
      <div class="w-full px-8 flex flex-col">
        <AuthorTag
          :author="
            props.mode !== undefined
              ? NewsStore.quote.user?.username
              : AuthStore.author.username
          "
          :image="
            props.mode !== undefined
              ? avatar(NewsStore.quote?.user)
              : avatar(AuthStore.author)
          "
        />
        <Form
          @submit="onSubmit"
          enctype="multipart/form-data"
          class="flex flex-col relative"
        >
          <div
            v-if="props.inner && props.mode !== 'view' && props.mode !== 'edit'"
            class="w-full md:h-[9.8rem] flex my-3 xs:bg-[#000] md:bg-transparent xs:p-4 md:p-0 rounded-md"
          >
            <img
              class="xs:w-[7rem] xs:h-[5.1rem] md:h-full md:w-[18.1rem] rounded-md"
              :src="image + MovieStore.movie.image"
              alt=""
            />
            <div class="flex flex-col xs:ml-2 md:ml-5">
              <h1 class="md:text-2xl text-[#DDCCAA] md:mt-2">
                {{
                  useI18n().locale.value === "en"
                    ? MovieStore.movie.name?.en
                    : MovieStore.movie.name?.ka
                }}
                ({{ MovieStore.movie.year }})
              </h1>
              <div class="flex xs:flex-col-reverse md:flex-col">
                <div class="flex flex-wrap xs:gap-1 md:gap-3 xs:my-1 md:my-4">
                  <span
                    v-for="item in MovieStore.movie.genre"
                    :key="item.id"
                    class="xs:p-[.3rem] md:p-2 bg-[#6C757D] text-white rounded-md xs:text-xs md:text-base"
                  >
                    {{ useI18n().locale.value === "en" ? item.name.en : item.name.ka }}
                  </span>
                </div>
                <h2 class="text-white flex md:text-xl">
                  {{ $t("add_movie.director") }}
                  <p class="ml-2">
                    {{
                      useI18n().locale.value === "en"
                        ? MovieStore.movie.director?.en
                        : MovieStore.movie.director?.ka
                    }}
                  </p>
                </h2>
              </div>
            </div>
          </div>
          <TheField
            :readonly="props.mode === 'view'"
            name="title.en"
            :rules="props.mode !== 'view' && 'required|en'"
            placeholder="Start create new quote"
            lang="Eng"
            type="textarea"
            :bind="getFieldInputBinds('title.en').value.value"
          />
          <TheField
            :readonly="props.mode === 'view'"
            name="title.ka"
            :rules="props.mode !== 'view' && 'required|ka'"
            placeholder="ახალი ციტატა"
            lang="ქარ"
            type="textarea"
            :bind="getFieldInputBinds('title.ka').value.value"
          />

          <FileUploadInput
            name="image"
            :mode="props.mode === 'edit'"
            v-if="props.mode !== 'view'"
            @selectFile="getFile"
            @drop.prevent="drop"
          />
          <div
            v-if="props.mode !== 'view' && props.mode !== 'edit' && !props.inner"
            class="relative w-full flex items-center bg-[#000000] rounded-sm h-[5.3rem] mt-7 p-4"
          >
            <CameraIcon class="mr-3" color="#fff" />
            <Field
              :rules="!props.inner && 'required'"
              :v-model="props.mode === 'edit' && MovieStore.movie.id"
              class="text-white bg-[#000000] h-full w-full text-2xl outline-none"
              name="field"
              as="select"
            >
              <option v-if="!props.inner" selected disabled value="">
                {{ $t("add_quote.choose_movie") }}
              </option>
              <option disabled selected value="" v-if="props.inner">
                {{
                  useI18n().locale.value === "en"
                    ? props.movie.name.en
                    : props.movie.name.ka
                }}
              </option>
              <option
                v-else
                v-for="(item, index) in MovieStore.movies"
                :key="index"
                :value="item.id"
              >
                {{ useI18n().locale.value === "en" ? item.name.en : item.name.ka }}
              </option>
            </Field>
          </div>
          <ErrorMessage class="text-red-500" name="field" />
          <the-button
            type="submit"
            v-if="props.mode !== 'view' && props.mode !== 'edit'"
            class="w-full mt-10 text-xl"
          >
            {{ $t("add_quote.post") }}
          </the-button>
          <img
            v-if="props.mode === 'view' || props.mode === 'edit'"
            :src="image + NewsStore.quote.image"
            alt="quote img"
            class="w-full md:h-[32rem] xs:h-80 rounded-xl xs:my-6"
          />
          <the-button
            v-if="props.mode === 'edit'"
            type="submit"
            class="w-full mt-10 text-xl"
          >
            {{ $t("add_quote.save_changes") }}
          </the-button>
        </Form>
        <div v-if="props.mode === 'view'" class="flex">
          <div class="flex">
            <h1 class="text-white text-2xl mr-2">
              {{ NewsStore.quote.comments?.length }}
            </h1>
            <CommentIcon />
          </div>
          <div class="flex">
            <h1 class="text-white text-2xl ml-4 mr-2">
              {{ NewsStore.quote.likes?.length }}
            </h1>
            <HeartIcon :color="liked" @click="addLike()" class="cursor-default" />
          </div>
        </div>
        <hr v-if="props.mode !== 'edit'" class="border w-full border-[#EFEFEF33] mt-6" />
        <div v-if="props.mode === 'view'" class="flex flex-col items-center">
          <TheComment
            v-for="(item, index) in limitedComments"
            :comment="item"
            :key="index"
          />
          <button
            v-if="comments.length > 2"
            @click="toggleComments"
            class="text-white my-2 font-bold"
          >
            {{ showMoreButton ? $t("add_quote.show_more") : $t("add_quote.show_less") }}
          </button>
        </div>
        <Form
          v-if="props.mode === 'view'"
          @submit="addComment"
          class="flex flex-col mt-6"
        >
          <div class="w-full flex">
            <img
              class="xs:w-10 xs:h-10 md:w-[3.25rem] md:h-[3.25rem] object-cover text-white shrink-0 rounded-full"
              :src="avatar(AuthStore.author)"
              alt="avatar"
            />
            <Field name="title" v-model="title" v-slot="{ field }">
              <input
                v-bind="field"
                class="w-full text-white xs:h-10 md:h-[3.25rem] ml-6 pl-6 outline-none bg-[#24222F] text-xl rounded-[.6rem]"
                type="text"
                placeholder="Write a comment"
              />
            </Field>
          </div>
        </Form>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import TheField from "./TheField.vue";
import TheComment from "../components/TheComment.vue";
import { image, avatar } from "../services/imagePrefixes";
import { useMovieStore } from "../stores/MoviesStore";
import { useAuthStore } from "../stores/AuthStore";
import { useNewsStore } from "../stores/NewsStore";
import ModalWrapper from "./ModalWrapper.vue";
const ModalStore = useModalStore();
import {
  PenIcon,
  TrashIcon,
  ExitIcon,
  CameraIcon,
  CommentIcon,
  HeartIcon,
} from "../components/icons/index.js";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { reactive, onMounted, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import FileUploadInput from "./FileUploadInput.vue";
import AuthorTag from "./AuthorTag.vue";
import { createLike, deleteLike } from "../services/likeService";
import { createComment } from "../services/commentService";
import { useModalStore } from "../stores/ModalStore";
const MovieStore = useMovieStore();
const AuthStore = useAuthStore();
const NewsStore = useNewsStore();
const props = defineProps(["inner", "movie", "mode"]);
const data = reactive({
  image: null,
});
const liked = computed(() => {
  return NewsStore.quote.likes.some((like) => like.author_id === AuthStore.author.id);
});
const comments = ref(NewsStore.quote.comments);
const commentsToShow = ref(2);
const limitedComments = computed(() => {
  return comments.value.slice(0, commentsToShow.value);
});
const showMoreButton = computed(() => {
  return comments.value.length > commentsToShow.value;
});
const toggleComments = () => {
  if (showMoreButton.value) {
    commentsToShow.value = comments.value.length;
  } else {
    commentsToShow.value = 2;
  }
};

onMounted(() => {
  if (props.mode !== "") {
    data.image = MovieStore?.quote?.image;
  }
});
const { setValues, defineInputBinds } = useForm({
  initialValues: props.mode !== "" && NewsStore.quote,
});
const getFile = (img) => {
  data.image = img.value;
  setValues({
    image: img.value,
  });
};
const getFieldInputBinds = (field) => defineInputBinds(field);
const onSubmit = (values) => {
  if (props.mode === "edit") {
    setValues({
      title: values.title,
    });
    NewsStore.updateQuote(values, data.image);
    ModalStore.closeModal();
    return;
  }
  NewsStore.addQuote(values, props.inner);
  ModalStore.closeModal();
};
const addComment = async (values) => {
  const data = {
    user_id: AuthStore.author.id,
    title: values.title,
  };
  const response = await createComment(data, NewsStore.quote, "movie");
  MovieStore.addCommentOnMovieQuote(response.data.comment, NewsStore.quote);
};
const addLike = async () => {
  const data = { quote_id: NewsStore?.quote.id, user_id: AuthStore.author.id };
  if (liked.value) {
    const like = NewsStore.quote.likes.find(
      (like) => like.author_id === AuthStore.author.id
    );
    deleteLike(like);
    MovieStore.likeInteractions(NewsStore.quote, like, true);
  } else {
    const response = await createLike(data, NewsStore.quote);
    MovieStore.likeInteractions(NewsStore.quote, "", false, data, response);
  }
};
const queryModal = (val) => {
  if (val === "edit") {
    ModalStore.openModal("add-quote", "inner-film-modal", val, NewsStore.quote.id);
  } else if (val === "close") {
    ModalStore.closeModal();
  }
};
</script>
