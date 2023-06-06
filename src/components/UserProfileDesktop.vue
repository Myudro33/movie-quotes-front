<template>
  <div class="w-full h-full xs:hidden md:block">
    <h1 class="text-2xl text-white ml-6 xs:hidden md:flex">
      {{ $t("profile.my_profile") }}
    </h1>

    <div
      class="w-full min-h-[700px] bg-[#11101A] mt-24 rounded-3xl flex flex-col items-center px-48"
    >
      <img
        class="w-48 h-48 border border-black rounded-full top-36 absolute"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxazzXBuYA1QspMPnqi7BlvoK8FASFVNRtmQ&usqp=CAU"
        alt="avatar"
      />
      <input id="file" hidden type="file" />
      <input
        class="mt-32 text-white text-xl cursor-pointer"
        type="button"
        id="loadFileXml"
        :value="$t('profile.upload_photo')"
        onclick="document.getElementById('file').click();"
      />
      <Form @submit="submitForm" v-slot="{ meta, errors }" class="w-full">
        <div class="w-full mt-10 flex relative">
          <input-component
            class="w-10/12"
            :error="errors.username"
            v-model="form.username"
            type="text"
            :label="$t('forms.name')"
            id="username"
            :placeholder="$t('forms.name_placeholder')"
          />
          <button
            @click="form.stage = 'username'"
            type="button"
            class="text-white mx-8 text-xl absolute -right-6 top-8"
          >
            {{ $t("profile.edit") }}
          </button>
        </div>
        <div class="mt-4 flex relative">
          <input-component
            class="w-10/12"
            :rules="'required|email'"
            :error="errors.email"
            v-model="form.email"
            type="text"
            id="email"
            :label="$t('forms.email')"
            :placeholder="$t('forms.email_placeholder')"
          />
          <button
            v-if="googleAuthor"
            @click="form.stage = 'email'"
            type="button"
            class="text-white mx-8 text-xl absolute -right-6 top-8"
          >
            {{ $t("profile.edit") }}
          </button>
        </div>
        <div v-if="googleAuthor" class="w-full mt-4 flex relative">
          <input-component
            class="w-10/12"
            :rules="'required|min:8|max:15|lowercase'"
            v-model="form.password"
            :error="errors.password"
            type="password"
            id="pass"
            :label="$t('forms.password')"
            :placeholder="$t('forms.password_placeholder')"
          />
          <button
            @click="form.stage = 'password'"
            type="button"
            class="text-white mx-8 text-xl absolute -right-6 top-8"
          >
            {{ $t("profile.edit") }}
          </button>
        </div>
        <div v-if="form.stage === 'password'" class="w-full h-auto my-10 mt-8">
          <div class="border border-white rounded-[4px] p-6 text-white">
            <h1>{{ $t("profile.password_requirements") }}</h1>
            <ul>
              <li>{{ $t("profile.password_min") }}</li>
              <li>{{ $t("profile.password_max") }}</li>
            </ul>
          </div>
          <div class="mt-4">
            <input-component
              :rules="'required|min:8|max:15|lowercase'"
              v-model="form.newPassword"
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
        </div>
      </Form>
      <p class="text-red-500 text-xl" v-if="AuthStore.error">{{ AuthStore.error }}</p>
    </div>
    <div v-if="form.stage !== ''" class="flex justify-end my-16">
      <button class="mx-6 py-2 px-4 text-xl text-[#CED4DA]" @click="form.stage = ''">
        {{ $t("profile.cancel") }}
      </button>
      <button
        @click="onSubmit(form.stage)"
        class="bg-[#E31221] py-2 px-4 text-white text-xl rounded-md disabled:bg-[#E3122140]"
      >
        {{ $t("profile.save_changes") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { computed, reactive } from "vue";
import { useAuthStore } from "../stores/AuthStore";
import { useModalStore } from "../stores/ModalStore";
import UserProfileMobile from "../components/UserProfileMobile.vue";
const AuthStore = useAuthStore();
const modalStore = useModalStore();
const googleAuthor = computed(() => AuthStore.author?.google_id === null);
const form = reactive({
  username: "",
  email: "",
  password: "dummy_password",
  newPassword: "",
  confirmPassword: "",
  stage: "",
});
setTimeout(() => {
  username.value = AuthStore.author.username;
  email.value = AuthStore.author.email;
}, 100);
const onSubmit = (value) => {
  if (value === "username") {
    AuthStore.updateUsername({
      username: AuthStore.author.username,
      newUsername: form.username,
    });
  } else if (value === "email") {
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
</script>
