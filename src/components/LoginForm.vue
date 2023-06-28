<template>
  <Form @submit="submitForm" v-slot="{ meta, errors }" class="w-full">
    <h1 class="xs:text-2xl md:text-4xl h-12 xs:mt-[70px] md:mt-2 text-white text-center">
      {{ $t('forms.create_account') }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t('forms.welcome_back') }}
    </p>
    <div class="mt-4">
      <input-component
        :rules="'required'"
        :error="errors.username"
        v-model="form.username"
        type="text"
        id="username"
        :label="$t('forms.email')"
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
        :placeholder="$t('forms.password_placeholder')"
      />
    </div>
    <p v-if="AuthStore.error && AuthStore.error !== 'Unauthenticated.'" class="text-red-500 mt-2">
      {{ AuthStore.error }}
    </p>
    <div class="w-full flex items-center justify-between mt-2">
      <div>
        <input @change="!form.remember" v-model="form.remember" id="remember" type="checkbox" />
        <label class="text-white ml-2" for="remember">{{ $t('forms.remember_me') }}</label>
      </div>
      <p
        @click="ModalStore.openModal('forgot_password')"
        class="text-[#0D6EFD] cursor-pointer underline inline-block"
      >
        {{ $t('forms.forgot_password') }}
      </p>
    </div>
    <button
      type="submit"
      :disabled="!meta.valid"
      class="w-full h-[38px] my-4 bg-[#E31221] disabled:bg-[#e31220a7] rounded-[4px] text-white"
    >
      {{ $t('forms.sign_in') }}
    </button>
    <GoogleButton type="signin" />
    <p class="text-center mt-8 text-[#6C757D]">
      {{ $t('forms.dont_have_account') }}
      <span
        @click="ModalStore.openModal('register')"
        class="text-[#0D6EFD] cursor-pointer underline inline"
      >
        {{ $t('forms.sign_up') }}
      </span>
    </p>
  </Form>
</template>

<script setup>
import { Form } from 'vee-validate'
import { useAuthStore } from '../stores/AuthStore'
import { useModalStore } from '../stores/ModalStore'
const ModalStore = useModalStore()
const AuthStore = useAuthStore()
import GoogleButton from '../components/GoogleButton.vue'
import { reactive } from 'vue'
const form = reactive({
  username: '',
  password: '',
  remember: false
})
const submitForm = () => {
  AuthStore.login(form)
}
</script>
