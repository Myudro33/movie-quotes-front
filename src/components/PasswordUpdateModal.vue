<template>
  <Form @submit="onSubmit" v-slot="{ errors }" class="w-full">
    <h1 class="xs:text-2xl md:text-4xl h-auto xs:mt-[70px] md:mt-2 text-white text-center">
      {{ $t('forms.forgot_password') }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t('forms.forgot_password_paragraph') }}
    </p>
    <div class="mt-4">
      <input-component
        :rules="'required|email'"
        :error="errors.email"
        v-model="form.email"
        type="text"
        id="email"
        :label="$t('forms.email')"
        :placeholder="$t('forms.email_placeholder')"
      />
    </div>
    <button class="w-full h-[38px] my-5 bg-[#E31221] rounded-[4px] text-white">
      {{ $t('forms.send_instructions') }}
    </button>
    <p
      @click="ModalStore.inner = 'login'"
      class="flex justify-center items-center cursor-pointer text-[#6C757D] font-normal"
    >
      <ArrowIcon /> {{ $t('forms.back_to_login') }}
    </p>
  </Form>
</template>

<script setup>
import ArrowIcon from '../components/icons/ArrowIcon.vue'
import { Form } from 'vee-validate'
import { reactive } from 'vue'
import { useModalStore } from '../stores/ModalStore'
import { useAuthStore } from '../stores/AuthStore'
const ModalStore = useModalStore()
const AuthStore = useAuthStore()
const form = reactive({
  email: ''
})
const onSubmit = () => {
  AuthStore.passwordReset(form.email)
}
</script>
