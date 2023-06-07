<template>
  <div
    v-if="
      modalStore.modal &&
      modalStore.mobile !== 'updated-succesfully' &&
      modalStore.mobile !== 'confirm'
    "
    class="bg-[#181623] w-full h-full absolute top-[70px] z-30"
  >
    <Form v-slot="{ meta, errors }" class="w-full">
      <div class="w-full h-10 mt-4 px-10 flex items-center md:hidden">
        <ArrowIcon @click="modalStore.modal = false" />
      </div>
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
          class="py-2 px-4 text-xl text-[#CED4DA]"
          @click="modalStore.modal = false"
        >
          {{ $t("profile.cancel") }}
        </button>
        <button
          type="button"
          @click="modalStore.mobile = 'confirm'"
          class="bg-[#E31221] py-2 px-4 text-white text-xl rounded-md disabled:bg-[#E3122140]"
        >
          {{ $t("profile.edit") }}
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
  <div
    class="mt-16 absolute w-full px-8 z-30 h-screen bg-[#181623]"
    v-else-if="modalStore.mobile === 'confirm'"
  >
    <div
      class="w-full h-52 mt-14 bg-gradient-to-l rounded-xl from-[#00000060] to-[#00000010]"
    >
      <h1 class="text-white text-center mt-16 mb-11">Are you sure to make changes ?</h1>
      <hr class="w-full border border-[#CED4DA33]" />
      <div class="w-full mt-4 flex justify-between px-2">
        <button
          class="py-2 px-4 text-xl text-[#CED4DA]"
          @click="modalStore.mobile = form.back"
        >
          {{ $t("profile.cancel") }}
        </button>
        <button
          type="button"
          @click="onSubmit()"
          class="bg-[#E31221] py-2 px-4 text-white text-xl rounded-md disabled:bg-[#E3122140]"
        >
          {{ $t("profile.confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowIcon from "./icons/ArrowIcon.vue";
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
  back: "",
});
const onSubmit = () => {
  if (form.back === "username") {
    AuthStore.updateUsername({
      username: AuthStore.author.username,
      newUsername: form.username,
    });
  } else if (form.back === "email") {
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
  form.back = modalStore.mobile;
  if (modalStore.modal) {
    modalStore.scroll(true);
  }
});
onBeforeUnmount(() => {
  modalStore.scroll(false);
});
</script>
