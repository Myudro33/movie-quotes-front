<template>
  <Form @submit="onSubmit" class="w-full">
    <div class="flex justify-end w-full translate-y-5 md:hidden">
      <ExitIcon @click="ModalStore.closeModal" />
    </div>
    <h1
      class="xs:text-2xl md:text-4xl xs:mt-[2.375rem] h-12 md:mt-2 text-white text-center"
    >
      {{ $t("forms.create_account") }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t("forms.start_journey") }}
    </p>
    <div class="mt-4">
      <input-component
        name="username"
        rules="required|min:3|max:15|lowercase"
        :placeholder="$t('forms.name_placeholder')"
        :label="$t('forms.name')"
        :required="true"
      />
    </div>
    <div class="mt-4">
      <input-component
        name="email"
        rules="required|email"
        :placeholder="$t('forms.email_placeholder')"
        :label="$t('forms.email')"
        :required="true"
      />
    </div>
    <div class="mt-4">
      <input-component
        name="password"
        type="password"
        rules="required|min:8|max:15|lowercase"
        :placeholder="$t('forms.password_placeholder')"
        :label="$t('forms.password')"
        :required="true"
      />
    </div>
    <div class="mt-4">
      <input-component
        name="password_confirmation"
        type="password"
        rules="required|confirmed:password"
        :placeholder="$t('forms.confirm_password_placeholder')"
        :label="$t('forms.confirm_password')"
        :required="true"
      />
    </div>
    <p
      class="text-red-500 my-2"
      v-if="AuthStore.error && AuthStore.error !== 'Unauthenticated.'"
    >
      {{ AuthStore.error }}
    </p>
    <the-button class="w-full mb-3 h-[2.375rem] mt-6">
      {{ $t("forms.get_started") }}
    </the-button>
    <GoogleButton />
    <p class="text-center mt-8 text-[#6C757D]">
      {{ $t("forms.have_account") }}
      <span
        @click="ModalStore.openModal('login', 'landing-modal')"
        class="text-[#0D6EFD] cursor-pointer underline inline"
        >{{ $t("forms.log_in") }}
      </span>
    </p>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import { useI18n } from "vue-i18n";
import { ExitIcon } from "@/components/icons/index.js";
import { useModalStore } from "@/stores/modal";
import { useAuthStore } from "@/stores/auth";
const ModalStore = useModalStore();
const AuthStore = useAuthStore();
import GoogleButton from "./GoogleButton.vue";
const locale = useI18n().locale.value;
const onSubmit = (values) => {
  AuthStore.register(
    {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    },
    locale
  );
};
</script>
