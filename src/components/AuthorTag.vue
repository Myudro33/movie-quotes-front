<template>
  <div class="flex md:mt-7 items-center">
    <img
      class="xs:w-10 xs:h-10 md:w-16 md:h-16 rounded-full object-cover"
      :src="props.image || avatar(AuthStore.author)"
      alt="avatar"
    />
    <h1 class="text-white text-lg ml-4">
      {{ props.author || AuthStore.author.username }}
    </h1>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/AuthStore";
import { avatar } from "../services/imagePrefixes";
const AuthStore = useAuthStore();
const props = defineProps(["image", "author"]);
</script>
