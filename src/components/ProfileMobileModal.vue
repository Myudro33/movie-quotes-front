<template>
  <div
    v-if="
      modalStore.mobile === 'password' ||
      modalStore.mobile !== 'updated-succesfully' ||
      modalStore.mobile !== ''
    "
    class="bg-[#181623] w-full h-full absolute top-[70px] z-30"
  >
    <Form v-slot="{ meta, errors }" class="w-full">
      <div
        class="bg-[#24222F] px-8 flex flex-col items-center justify-center w-full min-h-[235px] my-5"
      >
        <input-component
          v-if="modalStore.mobile === 'username'"
          class="w-full"
          :rules="'required'"
          :error="errors.username"
          v-model="form.username"
          type="text"
          id="username"
          :label="$t('forms.name')"
        />
        <input-component
          v-else-if="modalStore.mobile === 'email'"
          class="w-full"
          :rules="'required|email'"
          :error="errors.email"
          v-model="form.email"
          type="text"
          id="email"
          :label="$t('forms.email')"
        />
        <div class="w-full" v-else-if="modalStore.mobile === 'password'">
          <div class="mt-4">
            <input-component
              :rules="'required|min:8|max:15|lowercase'"
              v-model="form.newPassword"
              :error="errors.password"
              type="password"
              id="password"
              :label="$t('forms.password')"
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
            />
          </div>
        </div>
        <p v-if="AuthStore.error" class="text-red-500">{{ AuthStore.error }}</p>
      </div>
      <div class="w-full flex justify-between px-2">
        <button
          class="mx-6 py-2 px-4 text-xl text-[#CED4DA]"
          @click="modalStore.modal = false"
        >
          {{ $t("profile.cancel") }}
        </button>
        <button
          type="button"
          @click="onSubmit()"
          class="bg-[#E31221] py-2 px-4 text-white text-xl rounded-md disabled:bg-[#E3122140]"
        >
          {{ $t("profile.save_changes") }}
        </button>
      </div>
    </Form>
  </div>
  <div
    @click="modalStore.modal = false"
    class="w-full h-screen bg-[#00000050] absolute px-4 py-32 z-30"
    v-else-if="modalStore.mobile === 'updated-succesfully'"
  >
    <MobileSuccessModal />
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { useModalStore } from "../stores/ModalStore";
import { useAuthStore } from "../stores/AuthStore";
import { reactive, onMounted, onBeforeUnmount } from "vue";
import MobileSuccessModal from "./MobileSuccessModal.vue";
const props = defineProps(["input"]);
const modalStore = useModalStore();
const AuthStore = useAuthStore();
const form = reactive({
  username: "",
  email: "",
  password: "",
  newPassword: "",
});
const onSubmit = () => {
  if (modalStore.mobile === "username") {
    AuthStore.updateUsername({
      username: AuthStore.author.username,
      newUsername: form.username,
    });
  } else if (modalStore.mobile === "email") {
    AuthStore.updateEmail({
      email: AuthStore.author.email,
      new_email: form.email,
    });
  } else {
    AuthStore.updatePassword({
      email: AuthStore.author.email,
      newPassword: form.newPassword,
    });
  }
};
onMounted(() => {
  if (modalStore.modal) {
    modalStore.scroll(true);
  }
});
onBeforeUnmount(() => {
  modalStore.scroll(false);
});
</script>
