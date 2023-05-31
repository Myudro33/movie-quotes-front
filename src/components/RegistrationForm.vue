<template>
  <Form  @submit="handleSubmit" v-slot="{ meta, errors }" class="w-full">
    <h1 class="xs:text-2xl md:text-4xl xs:mt-[70px] h-12 md:mt-2 text-white text-center">
      {{ $t("forms.create_account") }}
    </h1>
    <p class="text-[#6C757D] mt-3 text-center">
      {{ $t("forms.start_journey") }}
    </p>
    <div class="mt-4">
      <input-component
        :rules="'required|min:3|max:15|lowercase'"
        v-model="username"
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
        v-model="email"
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
        v-model="password"
        :error="errors.password"
        type="text"
        id="password"
        :label="$t('forms.password')"
        :required="true"
        :placeholder="$t('forms.password_placeholder')"
      />
    </div>
    <div class="mt-4">
      <input-component
        :rules="'required|confirmed:password'"
        v-model="confirmPassword"
        :error="errors.confirmPassword"
        type="text"
        id="confirmPassword"
        :label="$t('forms.confirm_password')"
        :required="true"
        :placeholder="$t('forms.confirm_password_placeholder')"
      />
    </div>
    <button class="bg-[#E31221] w-full mb-3 h-[38px] text-white mt-6 rounded-[4px]">
      {{ $t("forms.get_started") }}
    </button>
      <GoogleButton/>
    <p class="text-center mt-8 text-[#6C757D]">
      {{ $t("forms.have_account") }}
      <p @click="modalStore.openModal('login')" class="text-[#0D6EFD] underline inline">{{
        $t("forms.log_in")
      }}
      </p>
    </p>
  </Form>
</template>

<script>
import { Form } from "vee-validate";
import { useModalStore } from "../stores/ModalStore";
import { useAuthStore } from "../stores/AuthStore";
import GoogleButton from "./GoogleButton.vue";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  setup(){
    const authStore = useAuthStore()
    const modalStore = useModalStore()
    return {modalStore,authStore}
  },
  methods:{
    handleSubmit(){
      this.authStore.register({
        username:this.username,
        email:this.email,
        password:this.password
      })
    }
  },
  components: { Form ,GoogleButton},
};
</script>
