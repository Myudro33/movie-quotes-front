<template>
  <div class="bg-[#24222F] md:hidden w-full h-screen flex flex-col items-center p-6">
    <img
      class="w-48 h-48 rounded-full"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxazzXBuYA1QspMPnqi7BlvoK8FASFVNRtmQ&usqp=CAU"
      alt="avatar"
    />
    <input id="file" hidden type="file" />
    <input
      class="mt-2 text-white text-xl cursor-pointer"
      type="button"
      id="loadFileXml"
      :value="$t('profile.upload_photo')"
      onclick="document.getElementById('file').click();"
    />
    <Form v-slot="{ meta, errors }" class="w-full">
      <div class="text-white w-full mt-8 relative flex">
        <mobile-input
          class="w-full"
          :error="errors.username"
          v-model="form.username"
          :rules="'required'"
          type="text"
          :label="$t('forms.name')"
          id="mobileUsername"
        />
        <button
          @click="editForm('username')"
          type="button"
          class="absolute right-0 top-8"
        >
          {{ $t("profile.edit") }}
        </button>
      </div>
      <div class="text-white w-full mt-8 relative flex">
        <mobile-input
          class="w-full"
          :error="errors.email"
          v-model="form.email"
          :rules="'required|email'"
          type="text"
          :label="$t('forms.email')"
          id="mobileEmail"
        />
        <button
          @click="editForm('email')"
          type="button"
          v-if="googleAuthor"
          class="absolute right-0 top-8"
        >
          {{ $t("profile.edit") }}
        </button>
      </div>
      <div v-if="googleAuthor" class="text-white w-full mt-8 relative flex">
        <mobile-input
          class="w-full"
          :error="errors.password"
          v-model="form.password"
          :rules="'required|min:8|max:15|lowercase'"
          type="password"
          :label="$t('forms.password')"
          id="mobilePassword"
        />
        <button
          @click="editForm('password')"
          type="button"
          v-if="googleAuthor"
          class="absolute right-0 top-8"
        >
          {{ $t("profile.edit") }}
        </button>
      </div>
      <h1 class="text-2xl text-white">{{ form.username }}</h1>
    </Form>
    <ProfileMobileModal input="username" />
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { computed, reactive } from "vue";
import { useAuthStore } from "../stores/AuthStore";
import ProfileMobileModal from "../components/ProfileMobileModal.vue";
import { useModalStore } from "../stores/ModalStore";
const AuthStore = useAuthStore();
const modalStore = useModalStore();
const googleAuthor = computed(() => AuthStore.author?.google_id === null);
const form = reactive({
  username: "",
  email: "",
  password: "dummy_password",
  newPassword: "",
  confirmPassword: "",
});
setTimeout(() => {
  mobileUsername.value = AuthStore.author.username;
  mobileEmail.value = AuthStore.author.email;
  console.log("fetched", form);
}, 100);
const editForm = (value) => {
  modalStore.mobile = value;
  modalStore.modal = true;
};
</script>
