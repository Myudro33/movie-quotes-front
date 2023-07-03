<template>
  <Form @submit="onSubmit" v-slot="{ errors }" class="w-full">
    <h1
      class="xs:text-2xl md:text-4xl h-auto xs:mt-[4.375rem] md:mt-2 text-white text-center"
    >
      {{ $t("forms.create_new_password") }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t("forms.create_new_password_paragraph") }}
    </p>
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
      class="text-red-500"
      v-if="AuthStore.error && AuthStore.error !== 'Unauthenticated.'"
    >
      {{ AuthStore.error }}
    </p>
    <button class="w-full h-[2.375rem] my-5 bg-[#E31221] rounded-md text-white">
      {{ $t("forms.reset_password") }}
    </button>
    <p
      @click="ModalStore.inner = 'login'"
      class="flex justify-center items-center cursor-pointer text-[#6C757D] font-normal"
    >
      <ArrowIcon /> {{ $t("forms.back_to_login") }}
    </p>
  </Form>
</template>

<script setup>
import ArrowIcon from "../components/icons/ArrowIcon.vue";
import { Form } from "vee-validate";
import { reactive } from "vue";
import { useAuthStore } from "../stores/AuthStore";
import { useModalStore } from "../stores/ModalStore";
import router from "../router";
const AuthStore = useAuthStore();
const ModalStore = useModalStore();
const form = reactive({
  password: "",
  confirmPassword: "",
});
const onSubmit = () => {
  AuthStore.passwordUpdate({
    token: router.currentRoute.value.query.token,
    email: router.currentRoute.value.query.email,
    password: form.password,
  });
};
</script>
