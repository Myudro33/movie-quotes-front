<template>
  <div
    @click="closeModal"
    name="backDrop"
    class="top-0 backdrop w-full h-screen absolute z-50 bg-[#00000090] flex justify-center items-center"
  >
    <div
      @click.stop
      name="inner"
      class="xs:w-screen xs:h-screen md:w-[601px] md:h-auto flex flex-col md:px-[120px] xs:px-[34px] md:py-10 bg-[#222030] items-center rounded-[10px]"
    >
      <LoginFormVue v-if="modalStore.inner === 'login'" />
      <RegistrationForm v-else-if="modalStore.inner === 'register'" />
      <PasswordUpdateModal v-else-if="modalStore.inner === 'forgot_password'" />
      <PasswordResetModal v-else-if="modalStore.inner === 'password_reset'" />
      <InfoModal
        v-if="modalStore.inner === 'registered'"
        image="send"
        link="https://mailtrap.io/inboxes/2178525/messages/"
        :heading="$t('modal.check_email')"
        :paragraph="$t('modal.check_email_paragraph')"
        :button="$t('modal.go_to_email')"
      />
      <InfoModal
        v-else-if="modalStore.inner === 'instructions_sent'"
        image="send"
        link="https://mailtrap.io/inboxes/2178525/messages/"
        :heading="$t('modal.check_email')"
        :paragraph="$t('modal.check_email_paragraph')"
        :button="$t('modal.go_to_email')"
        :skip="$t('modal.confirm_later')"
      />
      <InfoModal
        v-else-if="modalStore.inner === 'verified'"
        image="verified"
        :heading="$t('modal.thank_you')"
        :paragraph="$t('modal.account_activated')"
        :button="$t('modal.go_to_news_feed')"
      />
    </div>
  </div>
</template>

<script setup>
import LoginFormVue from "./LoginForm.vue";
import RegistrationForm from "./RegistrationForm.vue";
import PasswordUpdateModal from "./PasswordUpdateModal.vue";
import { useModalStore } from "../stores/ModalStore";
import { onMounted, onBeforeUnmount } from "vue";
import InfoModal from "./InfoModal.vue";
import PasswordResetModal from "./PasswordResetModal.vue";
import { useRouter } from "vue-router";
const props = defineProps(["modalActive", "inner"]);

const modalStore = useModalStore();
const router = useRouter();
onMounted(() => {
  if (modalStore.modal) {
    modalStore.scroll(true);
  }
});
onBeforeUnmount(() => {
  modalStore.scroll(false);
});
const closeModal = () => {
  modalStore.removeQuery();
};
</script>
