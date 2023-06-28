<template>
  <div class="w-full flex flex-col bg-[#11101A] rounded-xl md:p-6 xs:p-8 mt-6">
    <div class="flex items-center">
      <img
        class="xs:w-10 xs:h-10 md:w-[52px] md:h-[52px] object-cover rounded-full"
        :src="avatar + quote.user.avatar"
        alt="avatar"
      />
      <h1 class="text-white md:text-xl ml-3">{{ quote.user.username }}</h1>
    </div>
    <p class="text-white md:text-xl mt-4">
      “{{ quote.title[locale] }}”
      <span class="text-[#DDCCAA] cursor-pointer">{{ quote.movie.name[locale] }}</span>
      ({{ quote.movie.year }})
    </p>
    <img class="w-full md:h-[500px] xs:h-48 mt-7" :src="image + quote.image" alt="quote" />
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
    <button v-if="comments.length > 2" @click="toggleComments" class="text-white my-2 font-bold">
      {{ showMoreButton ? $t('addquote.show_more') : $t('addquote.show_less') }}
    </button>
    <Form @submit="addComment" class="flex flex-col mt-6">
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
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useAuthStore } from '../stores/AuthStore'
import { useNewsStore } from '../stores/NewsStore'
import CommentIcon from './icons/CommentIcon.vue'
import HeartIcon from './icons/HeartIcon.vue'
import TheComment from './TheComment.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { avatar, image } from '../services/index.js'
const AuthStore = useAuthStore()
const NewsStore = useNewsStore()
const props = defineProps(['quote'])
const locale = computed(() => {
  return useI18n().locale.value
})
const title = ref('')
const comments = ref(props.quote.comments)
const commentsToShow = ref(2)
const showMoreButton = computed(() => {
  return comments.value.length > commentsToShow.value
})
const limitedComments = computed(() => {
  return comments.value.slice(0, commentsToShow.value)
})
const toggleComments = () => {
  if (showMoreButton.value) {
    commentsToShow.value = comments.value.length
  } else {
    commentsToShow.value = 2
  }
}
const liked = computed(() => {
  return props.quote?.likes.some((like) => like.author_id === AuthStore.author.id)
})
const addComment = () => {
  NewsStore.comment({
    user_id: AuthStore.author.id,
    quote_id: props.quote.id,
    title: title.value
  })
  title.value = ''
}
const addLike = () => {
  NewsStore.like({
    user_id: AuthStore.author.id,
    quote_id: props.quote.id
  })
}
</script>
