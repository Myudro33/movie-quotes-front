<template>
  <Form @submit="onSubmit" class="w-full">
    <div class="flex justify-end w-full translate-y-5 md:hidden">
      <ExitIcon @click="ModalStore.closeModal" />
    </div>
    <h1
      class="xs:text-2xl md:text-4xl md:h-24 xs:mt-[2.375rem] md:mt-2 text-white text-center"
    >
      {{ $t("forms.create_new_password") }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t("forms.create_new_password_paragraph") }}
    </p>
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
        rules="required|confirmed:password"
        type="password"
        name="confirmPassword"
        :label="$t('forms.confirm_password')"
        :required="true"
        :placeholder="$t('forms.confirm_password_placeholder')"
      />
    </div>
    <p
      class="text-red-500"
      v-if="AuthStore.error && AuthStore.error !== 'Unauthenticated.'"
    >
      {{ AuthStore.error }}
    </p>
    <the-button type="submit" class="w-full h-[2.375rem] my-5">
      {{ $t("forms.reset_password") }}
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
import { ArrowIcon, ExitIcon } from "../components/icons/index.js";
import { Form } from "vee-validate";
import { useAuthStore } from "../stores/AuthStore";
import { useModalStore } from "../stores/ModalStore";
import router from "../router";
const AuthStore = useAuthStore();
const ModalStore = useModalStore();
const onSubmit = (values) => {
  AuthStore.passwordUpdate({
    token: router.currentRoute.value.query.token,
    email: router.currentRoute.value.query.email,
    password: values.password,
  });
};
</script>
