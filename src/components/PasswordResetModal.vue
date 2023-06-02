<template>
  <Form @submit="onSubmit" v-slot="{ meta, errors }" class="w-full">
    <h1
      class="xs:text-2xl md:text-4xl h-auto xs:mt-[70px] md:mt-2 text-white text-center"
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
    <button class="w-full h-[38px] my-5 bg-[#E31221] rounded-[4px] text-white">
      {{ $t("forms.reset_password") }}
    </button>
    <p
      @click="modalStore.inner = 'login'"
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
import { useModalStore } from "../stores/ModalStore";
const modalStore = useModalStore();
const form = reactive({
  password: "",
  confirmPassword: "",
});
</script>
