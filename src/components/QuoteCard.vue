<template>
  <div class="w-full flex flex-col bg-[#11101A] rounded-xl md:p-6 xs:p-8 mt-6">
    <div class="flex items-center">
      <img
        class="xs:w-10 xs:h-10 md:w-[3.25rem] md:h-[3.25rem] object-cover rounded-full"
        :src="avatar(quote.user)"
        alt="avatar"
      />
      <h1 class="text-white md:text-xl ml-3">{{ quote.user.username }}</h1>
    </div>
    <p class="text-white md:text-xl mt-4">
      “{{ quote.title[locale] }}”
      <span class="text-[#DDCCAA] cursor-pointer">{{ quote.movie.name[locale] }}</span>
      ({{ quote.movie.year }})
    </p>
    <img
      class="w-full md:h-[31.25rem] xs:h-48 mt-7"
      :src="image + quote.image"
      alt="quote"
    />
    <div class="flex xs:h-16 md:h-20 items-center border-b border-b-[#EFEFEF4D]">
      <div class="flex">
        <p class="text-white text-xl mr-2">{{ quote?.comments?.length }}</p>
        <CommentIcon />
      </div>
      <div class="flex ml-6">
        <p class="text-xl text-white mr-2">
          {{ quote.likes.length }}
        </p>
        <HeartIcon :color="liked" @click="addLike" />
      </div>
    </div>
    <TheComment v-for="(item, index) in limitedComments" :comment="item" :key="index" />
    <button
      v-if="comments.length > 2"
      @click="toggleComments"
      class="text-white my-2 font-bold"
    >
      {{ showMoreButton ? $t("add_quote.show_more") : $t("add_quote.show_less") }}
    </button>
    <Form @submit="addComment" class="flex flex-col mt-6">
      <div class="w-full flex">
        <img
          class="xs:w-10 xs:h-10 md:w-[3.25rem] md:h-[3.25rem] object-cover text-white shrink-0 rounded-full"
          :src="avatar(AuthStore.author)"
          alt="avatar"
        />
        <Field name="title" v-model="title" v-slot="{ field }">
          <input
            v-bind="field"
            class="w-full text-white xs:h-10 md:h-[3.25rem] ml-6 pl-6 outline-none bg-[#24222F] text-xl rounded-xl"
            type="text"
            placeholder="Write a comment"
          />
        </Field>
      </div>
    </Form>
  </div>
</template>

<script setup>
import TheComment from "./TheComment.vue";
import { CommentIcon, HeartIcon } from "./icons/index";
import { Form, Field } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { image, avatar } from "../services/imagePrefixes";
import { createLike, deleteLike } from "@/services/likeService";
import { createComment } from "@/services/commentService";
const AuthStore = useAuthStore();
const props = defineProps(["quote"]);
const locale = computed(() => {
  return useI18n().locale.value;
});
const title = ref("");
const comments = ref(props.quote.comments);
const commentsToShow = ref(2);
const showMoreButton = computed(() => {
  return comments.value.length > commentsToShow.value;
});
const limitedComments = computed(() => {
  return comments.value.slice(0, commentsToShow.value);
});
const toggleComments = () => {
  if (showMoreButton.value) {
    commentsToShow.value = comments.value.length;
  } else {
    commentsToShow.value = 2;
  }
};
const liked = computed(() => {
  return props.quote?.likes.some((like) => like.author_id === AuthStore.author.id);
});
const addComment = () => {
  const data = {
    user_id: AuthStore.author.id,
    title: title.value,
  };
  createComment(data, props.quote, "feed");
  console.log("quote card");
  title.value = "";
};
const addLike = async () => {
  const data = { quote_id: props.quote.id, user_id: AuthStore.author.id };
  if (liked.value) {
    const like = props.quote.likes.find((like) => like.author_id === AuthStore.author.id);
    deleteLike(like);
  } else {
    createLike(data, props.quote);
  }
};
</script>
