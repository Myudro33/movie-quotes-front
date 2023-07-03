<template>
  <div class="w-full h-full lg:ml-20">
    <h1 class="text-2xl text-white ml-6 xs:hidden md:flex">
      {{ $t("profile.my_profile") }}
    </h1>
    <div class="w-full h-12 px-10 flex items-center md:hidden">
      <ArrowIcon @click="$router.back()" />
    </div>
    <div
      class="md:w-[62.3rem] xs:min-h-screen md:min-h-[43.75rem] xs:bg-[#24222F] md:bg-[#11101A] md:mt-24 md:rounded-3xl flex flex-col items-center xs:px-8 md:px-48"
    >
      <img
        class="w-48 h-48 object-cover rounded-full xs:mt-6 md:mt-0 md:top-36 z-10 md:absolute"
        :src="avatar + AuthStore.author.avatar"
        id="avatar"
        alt="avatar"
      />
      <input id="file" hidden type="file" @change="handleFileUpload" />
      <input
        class="xs:mt-5 md:mt-32 text-white text-xl cursor-pointer"
        type="button"
        id="loadFileXml"
        :value="$t('profile.upload_photo')"
        onclick="document.getElementById('file').click();"
      />
      <Form v-slot="{ errors }" class="w-full">
        <div class="w-full mt-10 flex relative">
          <input-component
            class="xs:w-full md:w-10/12"
            :error="errors.username"
            v-model="form.username"
            type="text"
            :label="$t('forms.name')"
            id="username"
            :placeholder="$t('forms.name_placeholder')"
            :style="true"
          />
          <button
            @click="editForm('username')"
            type="button"
            class="text-white mx-8 text-xl absolute -right-6 top-8"
          >
            {{ $t("profile.edit") }}
          </button>
        </div>
        <div class="mt-4 flex relative">
          <input-component
            class="xs:w-full md:w-10/12"
            :rules="'required|email'"
            :error="errors.email"
            v-model="form.email"
            type="text"
            id="email"
            :label="$t('forms.email')"
            :placeholder="$t('forms.email_placeholder')"
            :style="true"
            :readonly="!googleAuthor"
          />
          <button
            v-if="googleAuthor"
            @click="editForm('email')"
            type="button"
            class="text-white mx-8 text-xl absolute -right-6 top-8"
          >
            {{ $t("profile.edit") }}
          </button>
        </div>
        <div v-if="googleAuthor" class="w-full mt-4 flex relative">
          <input-component
            class="xs:w-full md:w-10/12"
            :rules="'required|min:8|max:15|lowercase'"
            v-model="form.fake_password"
            :error="errors.fake_password"
            type="password"
            id="fake_password"
            :label="$t('forms.password')"
            :placeholder="$t('forms.password_placeholder')"
            :style="true"
          />
          <button
            @click="editForm('password')"
            type="button"
            class="text-white mx-8 text-xl absolute -right-6 top-8"
          >
            {{ $t("profile.edit") }}
          </button>
        </div>
        <div v-if="form.stage === 'password'" class="w-full h-auto my-10 mt-8">
          <div class="border border-white rounded-md p-6 text-white">
            <h1>{{ $t("profile.password_requirements") }}</h1>
            <ul>
              <li class="flex">
                <p class="mr-2" :class="passwordValidation.min">•</p>
                {{ $t("profile.password_min") }}
              </li>
              <li class="flex">
                <p class="mr-2" :class="passwordValidation.max">•</p>
                {{ $t("profile.password_max") }}
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <input-component
              :rules="'required|min:8|max:15|lowercase'"
              v-model="form.password"
              :error="errors.password"
              type="password"
              id="password"
              @update:errorMessage="errorDots"
              :label="$t('forms.password')"
              :required="true"
              :placeholder="$t('forms.password_placeholder')"
              :style="true"
            />
          </div>
          <div class="mt-4">
            <input-component
              :rules="'required|confirmed:password'"
              v-model="form.password_confirmation"
              :error="errors.password_confirmation"
              type="password"
              id="password_confirmation"
              :label="$t('forms.confirm_password')"
              :required="true"
              :placeholder="$t('forms.confirm_password_placeholder')"
              :style="true"
            />
          </div>
        </div>
      </Form>
      <p class="text-red-500 text-xl xs:hidden md:flex" v-if="AuthStore.error">
        {{ AuthStore.error }}
      </p>
    </div>
    <div v-if="form.stage !== ''" class="flex justify-end my-16">
      <button class="mx-6 py-2 px-4 text-xl text-[#CED4DA]" @click="form.stage = ''">
        {{ $t("profile.cancel") }}
      </button>
      <button
        @click="AuthStore.updateUser(form, locale)"
        class="bg-[#E31221] py-2 px-4 text-white text-xl rounded-md disabled:bg-[#E3122140]"
      >
        {{ $t("profile.save_changes") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";
import { useModalStore } from "../stores/ModalStore";
import {ArrowIcon} from "../components/icons/index.js";
import { avatar } from "../services/index.js";
import { useI18n } from "vue-i18n";
const AuthStore = useAuthStore();
const ModalStore = useModalStore();
const googleAuthor = computed(() => AuthStore.author?.google_id === null);
const form = reactive({
  username: AuthStore.author.username,
  email: AuthStore.author.email,
  fake_password: "password",
  password: "",
  password_confirmation: "",
  stage: "",
  avatar: "",
});
const passwordValidation = reactive({
  min: "",
  max: "",
});
const errorDots = (errorMessage) => {
  if (errorMessage) {
    if (errorMessage.includes("8")) {
      passwordValidation.min = "text-red-500";
    } else if (errorMessage.includes("15")) {
      passwordValidation.max = "text-red-500";
    }
  }
  if (errorMessage === undefined) {
    passwordValidation.min = "text-green-500";
    passwordValidation.max = "text-green-500";
  }
};
const locale = useI18n().locale.value;
const windowWidth = ref(window.innerWidth);
const editForm = (value) => {
  if (windowWidth.value < 960) {
    ModalStore.mobile = value;
  } else {
    form.stage = value;
  }
};
const handleFileUpload = (event) => {
  form.avatar = event;
  AuthStore.updateUser({
    avatar: form.avatar,
  });
  form.avatar = "";
};
</script>
