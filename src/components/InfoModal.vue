<template>
  <div
    class="w-full xs:bg-[#00000025] md:bg-transparent xs:rounded-[10px] md:rounded-none xs:mt-40 md:mt-0 xs:py-8 md:p-0 flex flex-col items-center"
  >
    <DangerIcon v-if="image === 'danger'" />
    <SendIcon v-else-if="image === 'send'" />
    <SubmitIcon v-else />
    <h1 class="text-[32px] text-white font-medium mt-6">{{ heading }}</h1>
    <p class="text-white text-center mt-8">{{ paragraph }}</p>
    <a
      v-if="link"
      @click="modalStore.closeModal"
      class="xs:w-9/12 md:w-full flex justify-center items-center h-10 mt-8 rounded-[4px] bg-[#E31221] text-white"
      target="_blank"
      :href="link"
      >{{ button }}</a
    >
    <button
      v-else
      @click="onSubmit"
      class="xs:w-9/12 md:w-full h-10 mt-8 rounded-[4px] bg-[#E31221] text-white"
    >
      {{ button }}
    </button>
    <button @click="modalStore.closeModal" class="text-[#6C757D] md:mt-8" v-if="skip">
      {{ skip }}
    </button>
  </div>
</template>

<script setup>
import { useModalStore } from "../stores/ModalStore";
import DangerIcon from "./icons/DangerIcon.vue";
import SendIcon from "./icons/SendIcon.vue";
import SubmitIcon from "./icons/SubmitIcon.vue";
const props = defineProps(["image", "heading", "paragraph", "button", "skip", "link"]);

const modalStore = useModalStore();
const onSubmit = () => {
  if (props.image === "verified") {
    modalStore.removeQuery();
  }
  if (props.button === "Log in" || props.button === "შესვლა") {
    modalStore.inner = "login";
    modalStore.modal = true;
  } else {
    modalStore.closeModal();
  }
};
</script>
