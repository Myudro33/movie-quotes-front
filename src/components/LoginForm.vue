<template>
  <Form @submit="onSubmit" class="w-full">
    <div class="flex justify-end w-full translate-y-5 md:hidden">
      <ExitIcon @click="ModalStore.closeModal" />
    </div>
    <h1
      class="xs:text-2xl md:text-4xl h-12 xs:mt-[4.375rem] md:mt-2 text-white text-center"
    >
      {{ $t("forms.create_account") }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t("forms.welcome_back") }}
    </p>
    <div class="mt-4">
      <input-component
        name="username"
        rules="required"
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
    <p
      v-if="AuthStore.error && AuthStore.error !== 'Unauthenticated.'"
      class="text-red-500 mt-2"
    >
      {{ AuthStore.error }}
    </p>
    <div class="w-full flex items-center justify-between mt-2">
      <div>
        <input
          @change="remember = !remember"
          id="remember"
          name="remember"
          type="checkbox"
        />
        <label class="text-white ml-2" for="remember">{{
          $t("forms.remember_me")
        }}</label>
      </div>
      <p
        @click="ModalStore.openModal('forgot_password')"
        class="text-[#0D6EFD] cursor-pointer underline inline-block text-sm"
      >
        {{ $t("forms.forgot_password") }}
      </p>
    </div>
    <the-button type="submit" class="w-full h-[2.375rem] my-4">
      {{ $t("forms.sign_in") }}
    </the-button>
    <GoogleButton type="signin" />
    <p class="text-center mt-8 text-[#6C757D]">
      {{ $t("forms.dont_have_account") }}
      <span
        @click="ModalStore.openModal('register')"
        class="text-[#0D6EFD] cursor-pointer underline inline"
      >
        {{ $t("forms.sign_up") }}
      </span>
    </p>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import { useAuthStore } from "../stores/AuthStore";
import { useModalStore } from "../stores/ModalStore";
import { ExitIcon } from "../components/icons/index.js";
import { ref } from "vue";
const ModalStore = useModalStore();
const AuthStore = useAuthStore();
import GoogleButton from "../components/GoogleButton.vue";
import { useI18n } from "vue-i18n";
const remember = ref(false);
const locale = useI18n().locale.value;
const onSubmit = (values) => {
  AuthStore.login(
    {
      username: values.username,
      password: values.password,
      remember: remember.value,
    },
    locale
  );
};
</script>
