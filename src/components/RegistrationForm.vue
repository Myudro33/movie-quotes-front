<template>
  <Form @submit="onSubmit" v-slot="{ errors }" class="w-full">
    <h1
      class="xs:text-2xl md:text-4xl xs:mt-[4.375rem] h-12 md:mt-2 text-white text-center"
    >
      {{ $t("forms.create_account") }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t("forms.start_journey") }}
    </p>
    <div class="mt-4">
      <input-component
        :rules="'required|min:3|max:15|lowercase'"
        v-model="form.username"
        :error="errors.username"
        id="username"
        :label="$t('forms.name')"
        type="text"
        :required="true"
        :placeholder="$t('forms.name_placeholder')"
      />
    </div>
    <div class="mt-4">
      <input-component
        :rules="'required|email'"
        :error="errors.email"
        v-model="form.email"
        type="email"
        id="email"
        :label="$t('forms.email')"
        :required="true"
        :placeholder="$t('forms.email_placeholder')"
      />
    </div>
    <div class="mt-4">
      <input-component
        :rules="'required|min:8|max:15|lowercase'"
        v-model="form.password"
        :error="errors.password"
        type="password"
        id="password"
        :label="$t('forms.password')"
        :required="true"
        :placeholder="$t('forms.password_placeholder')"
      />
    </div>
    <div class="mt-4">
      <input-component
        :rules="'required|confirmed:password'"
        v-model="form.confirmPassword"
        :error="errors.confirmPassword"
        type="password"
        id="confirmPassword"
        :label="$t('forms.confirm_password')"
        :required="true"
        :placeholder="$t('forms.confirm_password_placeholder')"
      />
    </div>
    <p
      class="text-red-500 my2"
      v-if="AuthStore.error && AuthStore.error !== 'Unauthenticated.'"
    >
      {{ AuthStore.error }}
    </p>
    <button class="bg-[#E31221] w-full mb-3 h-[2.375rem] text-white mt-6 rounded-md">
      {{ $t("forms.get_started") }}
    </button>
    <GoogleButton />
    <p class="text-center mt-8 text-[#6C757D]">
      {{ $t("forms.have_account") }}
      <span
        @click="ModalStore.openModal('login')"
        class="text-[#0D6EFD] cursor-pointer underline inline"
        >{{ $t("forms.log_in") }}
      </span>
    </p>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import { useModalStore } from "../stores/ModalStore";
import { useAuthStore } from "../stores/AuthStore";
import { useI18n } from "vue-i18n";
const ModalStore = useModalStore();
const AuthStore = useAuthStore();
import GoogleButton from "./GoogleButton.vue";
const locale = useI18n().locale.value;

import { reactive } from "vue";
const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const onSubmit = () => {
  AuthStore.register(
    {
      username: form.username,
      email: form.email,
      password: form.password,
    },
    locale
  );
};
</script>
