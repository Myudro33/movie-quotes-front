<template>
  <Form @submit="onSubmit" class="w-full">
    <div class="flex justify-end w-full translate-y-5 md:hidden">
      <ExitIcon @click="ModalStore.closeModal" />
    </div>
    <h1
      class="xs:text-2xl md:text-3xl md:h-16 xs:mt-[2.375rem] md:mt-2 text-white text-center"
    >
      {{ $t("forms.forgot_password") }}
    </h1>
    <p class="text-gray-950 mt-3 text-center">
      {{ $t("forms.forgot_password_paragraph") }}
    </p>
    <div class="mt-4">
      <input-component
        name="email"
        rules="required|email"
        :placeholder="$t('forms.email_placeholder')"
        :label="$t('forms.email')"
        :required="true"
      />
    </div>
    <p
      v-if="AuthStore.error && AuthStore.error !== 'Unauthenticated.'"
      class="text-red-500 mt-2"
    >
      {{ AuthStore.error }}
    </p>
    <the-button class="w-full h-[2.375rem] my-5">
      {{ $t("forms.send_instructions") }}
    </the-button>
    <p
      @click="ModalStore.openModal('login', 'landing-modal')"
      class="flex justify-center items-center cursor-pointer text-[#6C757D] font-normal"
    >
      <ArrowIcon /> {{ $t("forms.back_to_login") }}
    </p>
  </Form>
</template>

<script setup>
import { ExitIcon, ArrowIcon } from "@/components/icons/index.js";
import { Form } from "vee-validate";
import { useModalStore } from "@/stores/modal";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";
const locale = useI18n().locale.value;
const ModalStore = useModalStore();
const AuthStore = useAuthStore();

const onSubmit = (values) => {
  AuthStore.passwordReset(values.email, locale);
};
</script>
