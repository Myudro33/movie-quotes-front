<template>
  <div
    v-if="ModalStore.mobile !== 'updated-succesfully' && ModalStore.mobile !== 'confirm'"
    class="bg-[#181623] w-full h-full absolute top-[4.375rem] z-30"
  >
    <Form class="w-full">
      <div class="w-full h-10 mt-4 px-10 flex items-center md:hidden">
        <ArrowIcon @click="ModalStore.closeModal" />
      </div>
      <div
        class="bg-[#24222F] px-8 flex flex-col items-center justify-center w-full min-h-[14.688rem] my-5"
      >
        <input-component
          v-if="ModalStore.mobile === 'username'"
          class="w-full"
          rules="required|min:3|max:15|lowercase"
          @change-value="change"
          type="text"
          :label="$t('forms.name')"
          name="username"
        />
        <input-component
          v-else-if="ModalStore.mobile === 'email'"
          class="w-full"
          rules="required|email"
          @change-value="change"
          type="text"
          name="email"
          :label="$t('forms.email')"
        />
        <div class="w-full" v-else-if="ModalStore.mobile === 'password'">
          <div class="mt-4">
            <input-component
              rules="required|min:8|max:15|lowercase"
              :bind="form.password"
              type="password"
              name="password"
              :label="$t('forms.password')"
            />
          </div>
          <div class="mt-4">
            <input-component
              rules="required|confirmed:password"
              type="password"
              name="confirmPassword"
              :label="$t('forms.confirm_password')"
            />
          </div>
        </div>
        <p v-if="AuthStore.error" class="text-red-500">{{ AuthStore.error }}</p>
      </div>
      <div class="w-full flex justify-between px-2">
        <button class="py-2 px-4 text-xl text-[#CED4DA]" @click="ModalStore.mobile = ''">
          {{ $t("profile.cancel") }}
        </button>
        <the-button
          type="button"
          @click="ModalStore.mobile = 'confirm'"
          class="py-2 px-4 text-xl"
        >
          {{ $t("profile.edit") }}
        </the-button>
      </div>
    </Form>
  </div>
  <div
    @click="ModalStore.mobile = ''"
    class="w-full h-screen bg-[#00000050] absolute px-4 py-32 z-30"
    v-else-if="ModalStore.mobile === 'updated-succesfully'"
  >
    <MobileSuccessModal />
  </div>
  <div
    class="mt-16 absolute w-full px-8 z-30 h-screen bg-[#181623]"
    v-else-if="ModalStore.mobile === 'confirm'"
  >
    <div
      class="w-full h-52 mt-14 bg-gradient-to-l rounded-xl from-[#00000060] to-[#00000010]"
    >
      <h1 class="text-white text-center mt-16 mb-11">{{ $t("modal.are_you_sure") }}</h1>
      <hr class="w-full border border-[#CED4DA33]" />
      <div class="w-full mt-4 flex justify-between px-2">
        <button
          class="py-2 px-4 text-xl text-[#CED4DA]"
          @click="ModalStore.mobile = back"
        >
          {{ $t("profile.cancel") }}
        </button>
        <the-button
          type="button"
          @click="AuthStore.updateUser(form)"
          class="py-2 px-4 text-xl"
        >
          {{ $t("profile.confirm") }}
        </the-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobileSuccessModal from "./MobileSuccessModal.vue";
import ArrowIcon from "./icons/ArrowIcon.vue";
import { Form } from "vee-validate";
import { useModalStore } from "@/stores/modal";
import { useAuthStore } from "@/stores/auth";
import { reactive, onMounted, onBeforeUnmount, ref } from "vue";
const ModalStore = useModalStore();
const AuthStore = useAuthStore();
const back = ref("");
const form = reactive({
  username: "",
  email: AuthStore.author.email,
  password: "",
  newPassword: "",
  avatar: "",
});
const change = (event, name) => {
  form[name] = event;
};
onMounted(() => {
  back.value = ModalStore.mobile;
  if (ModalStore.mobile !== "" || ModalStore.inner !== "") {
    ModalStore.scroll(true);
  }
});
onBeforeUnmount(() => {
  ModalStore.scroll(false);
});
</script>
