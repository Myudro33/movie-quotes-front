<template>
  <div
    class="w-full xs:bg-[#00000025] md:bg-transparent xs:rounded-xl md:rounded-none xs:mt-40 md:mt-0 xs:py-8 md:p-0 flex flex-col items-center"
  >
    <div class="flex justify-end w-full -translate-y-4 -translate-x-5 md:hidden">
      <ExitIcon @click="ModalStore.closeModal" />
    </div>
    <DangerIcon v-if="image === 'danger'" />
    <SendIcon v-else-if="image === 'send'" />
    <SubmitIcon v-else />
    <h1 class="text-[2rem] text-white font-medium mt-6">{{ heading }}</h1>
    <p class="text-white text-center mt-8">{{ paragraph }}</p>
    <a
      v-if="link"
      class="xs:w-9/12 md:w-full flex justify-center items-center h-10 mt-8 rounded-md bg-[#E31221] text-white"
      target="_blank"
      :href="link"
      >{{ button }}</a
    >
    <the-button v-else @click="onSubmit" class="xs:w-9/12 md:w-full h-10 mt-8">
      {{ button }}
    </the-button>
    <button
      @click="ModalStore.closeModal()"
      class="text-[#6C757D] xs:mt-3 md:mt-8"
      v-if="skip"
    >
      {{ skip }}
    </button>
  </div>
</template>

<script setup>
import router from "@/router";
import { useModalStore } from "@/stores/modal";
import DangerIcon from "./icons/DangerIcon.vue";
import SendIcon from "./icons/SendIcon.vue";
import ExitIcon from "./icons/ExitIcon.vue";
import SubmitIcon from "./icons/SubmitIcon.vue";
import { useI18n } from "vue-i18n";
const ModalStore = useModalStore();
const { t } = useI18n();
const props = defineProps(["image", "heading", "paragraph", "button", "skip", "link"]);

const onSubmit = () => {
  if (props.button === t("modal.go_to_news_feed")) {
    ModalStore.closeModal();
    router.push({ name: "news" });
  } else if (props.button === t("modal.log_in")) {
    ModalStore.openModal("login", "landing-modal");
  } else if (props.button === t("modal.another_link")) {
    router.replace({ name: "landing" });
    ModalStore.closeModal();
  } else {
    ModalStore.closeModal();
  }
};
</script>
