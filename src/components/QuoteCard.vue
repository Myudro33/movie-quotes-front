<template>
  <div class="w-full flex flex-col bg-[#11101A] rounded-xl md:p-6 xs:p-8 mt-6">
    <div class="flex items-center">
      <img
        class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover rounded-full"
        :src="quote.user.avatar"
        alt="avatar"
      />
      <h1 class="text-white md:text-xl ml-3">{{ quote.user.username }}</h1>
    </div>
    <p class="text-white md:text-xl mt-4">
      “{{ quote.title[locale] }}”
      <span class="text-[#DDCCAA] cursor-pointer">{{ quote.movie.name[locale] }}</span>
      ({{ quote.movie.year }})
    </p>
    <img class="w-full md:h-[500px] xs:h-48 mt-7" :src="quote.image" alt="quote" />
    <div class="flex xs:h-16 md:h-20 items-center border-b border-b-[#EFEFEF4D]">
      <div class="flex">
        <p class="text-white text-xl mr-2">{{ quote.comments.length }}</p>
        <CommentIcon />
      </div>
      <div class="flex ml-6">
        <p class="text-xl text-white mr-2">
          {{ quote.likes.length }}
        </p>
        <HeartIcon :color="liked" @click="addLike" />
      </div>
    </div>
    <TheComment v-for="(item, index) in quote.comments" :comment="item" :key="index" />
    <Form v-slot="{ errors }" @submit="addComment" class="flex flex-col mt-6">
      <div class="w-full flex">
        <img
          class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover text-white shrink-0 rounded-full"
          :src="authStore.author.avatar"
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
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useAuthStore } from "../stores/AuthStore";
import CommentIcon from "./icons/CommentIcon.vue";
import HeartIcon from "./icons/HeartIcon.vue";
import TheComment from "./TheComment.vue";
import { useNewsStore } from "../stores/NewsStore";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps(["quote"]);
const authStore = useAuthStore();
const NewsStore = useNewsStore();
const locale = computed(() => {
  return useI18n().locale.value;
});
const title = ref("");
const liked = computed(() => {
  return props.quote?.likes.some((like) => like.author.id === authStore.author.id);
});
const addComment = () => {
  NewsStore.comment({
    user_id: authStore.author.id,
    quote_id: props.quote.id,
    title: title.value,
  });
  title.value = "";
};
const addLike = () => {
  NewsStore.like({
    user_id: authStore.author.id,
    quote_id: props.quote.id,
  });
};
</script>
