<template>
  <div
    @click="closeModal"
    name="backDrop"
    class="top-0 backdrop w-full h-full absolute z-50 bg-[#00000090] flex justify-center items-center"
  >
    <div
      @click.stop
      name="inner"
      class="xs:w-screen xs:h-screen md:w-[37.563rem] md:h-auto flex flex-col md:px-[7.5rem] xs:px-[2.125rem] md:py-10 bg-[#222030] items-center rounded-xl"
    >
      <LoginFormVue v-if="ModalStore.inner === 'login'" />
      <RegistrationForm v-else-if="ModalStore.inner === 'register'" />
      <PasswordUpdateModal v-else-if="ModalStore.inner === 'forgot_password'" />
      <PasswordResetModal v-else-if="ModalStore.inner === 'reset-email-verified'" />
      <InfoModal
        v-if="ModalStore.inner === 'registered'"
        image="send"
        :link="mailLink"
        :heading="$t('modal.check_email')"
        :paragraph="$t('modal.thank_you_paragraph')"
        :button="$t('modal.go_to_email')"
      />
      <InfoModal
        v-if="ModalStore.inner === 'update-email-sent'"
        image="send"
        :link="mailLink"
        :heading="$t('modal.check_email')"
        :paragraph="$t('modal.email_update_paragraph')"
        :button="$t('modal.go_to_email')"
      />
      <InfoModal
        v-else-if="ModalStore.inner === 'instructions_sent'"
        image="send"
        :link="mailLink"
        :heading="$t('modal.check_email')"
        :paragraph="$t('modal.check_email_paragraph')"
        :button="$t('modal.go_to_email')"
        :skip="$t('modal.confirm_later')"
      />
      <InfoModal
        v-else-if="ModalStore.inner === 'verified'"
        image="verified"
        :heading="$t('modal.thank_you')"
        :paragraph="$t('modal.account_activated')"
        :button="$t('modal.go_to_news_feed')"
      />
      <InfoModal
        v-else-if="ModalStore.inner === 'user-updated'"
        image="verified"
        :heading="$t('modal.success')"
        :paragraph="$t('modal.changes_updated_successfully')"
        :button="$t('modal.go_to_news_feed')"
      />
      <InfoModal
        v-else-if="ModalStore.inner === 'email-updated'"
        image="verified"
        :heading="$t('modal.success')"
        :paragraph="$t('modal.email_success_paragraph')"
        :button="$t('modal.go_to_news_feed')"
      />
      <InfoModal
        v-else-if="ModalStore.inner === 'password-changed'"
        image="verified"
        :heading="$t('modal.success')"
        :paragraph="$t('modal.password_success_paragraph')"
        :button="$t('modal.log_in')"
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
const mailLink = import.meta.env.VITE_API_GMAIL_URL;
const ModalStore = useModalStore();
onMounted(() => {
  if (ModalStore.inner !== "" || ModalStore.mobile !== "") {
    ModalStore.scroll(true);
  }
});
onBeforeUnmount(() => {
  ModalStore.scroll(false);
});
const closeModal = () => {
  ModalStore.closeModal();
  ModalStore.removeQuery();
};
</script>
