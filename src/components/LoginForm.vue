<template>
  <Form v-slot="{ meta, errors }" class="w-full">
    <h1 class="xs:text-2xl md:text-4xl xs:mt-[70px] md:mt-2 text-white text-center">
      {{ $t("forms.create_account") }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t("forms.welcome_back") }}
    </p>
    <div class="mt-4">
      <input-component
        :rules="'required'"
        :error="errors.email"
        v-model="email"
        type="email"
        id="email"
        :label="$t('forms.name')"
        :placeholder="$t('forms.email_placeholder')"
      />
    </div>
    <div class="mt-4">
      <input-component
        :rules="'required|min:8|max:15|lowercase'"
        v-model="password"
        :error="errors.password"
        type="text"
        id="password"
        :label="$t('forms.password')"
        :placeholder="$t('forms.password_placeholder')"
      />
    </div>
    <div class="w-full flex items-center justify-between mt-2">
      <div>
        <input id="remember" type="checkbox" />
        <label class="text-white ml-2" for="remember">{{
          $t("forms.remember_me")
        }}</label>
      </div>
      <p @click="modalStore.openModal('forgot_password')" class="text-[#0D6EFD] underline inline-block">{{
        $t("forms.forgot_password")
      }}</p>
    </div>
    <button class="w-full h-[38px] my-4 bg-[#E31221] rounded-[4px] text-white">
      {{ $t("forms.sign_in") }}
    </button>
    <button class="w-full h-[38px] rounded-[4px] border border-white text-white">
      {{ $t("forms.google_signup") }}
    </button>
    <p class="text-center mt-8 text-[#6C757D]">
      {{ $t("forms.dont_have_account") }}
      <p @click="modalStore.openModal('register')" class="text-[#0D6EFD] underline inline">
      {{$t("forms.sign_up")}}
      </p>
    </p>
  </Form>
</template>

<script>
import { Form } from "vee-validate";
import { useModalStore } from "../stores/ModalStore";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  setup(){
    const modalStore = useModalStore()
    return {modalStore}
  },
  components: { Form },
};
</script>
