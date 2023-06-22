<template>
  <div
    @click="closeModal"
    class="absolute w-full h-full flex justify-center bg-[#18162380] left-0 top-0 z-[100]"
  >
    <div @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useNewsStore } from "../stores/NewsStore";
import { useModalStore } from "../stores/ModalStore";
import { onMounted, onBeforeUnmount } from "vue";
const NewsStore = useNewsStore();
const modalStore = useModalStore();
const closeModal = () => {
  NewsStore.modal = "";
};
onMounted(() => {
  if (NewsStore.modal !== "") {
    modalStore.scroll(true);
  }
});
onBeforeUnmount(() => {
  modalStore.scroll(false);
});
</script>
