<template>
  <button
    type="button"
    class="w-full h-[38px] rounded-[4px] border border-white text-white"
  >
    <a
      class="flex justify-center items-center"
      v-if="type === 'signin'"
      href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=37851918678-61ji1i9sj49h1pllmbjb5vkht2mob92e.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fgoogle%2Fcallback&scope=openid%20profile%20email&response_type=code&service=lso&o2v=1&flowName=GeneralOAuthFlow"
    >
      <GoogleIcon /> {{ $t("forms.google_signin") }}
    </a>
    <a
      class="flex justify-center items-center"
      v-else
      href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=37851918678-61ji1i9sj49h1pllmbjb5vkht2mob92e.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fgoogle%2Fcallback&scope=openid%20profile%20email&response_type=code&service=lso&o2v=1&flowName=GeneralOAuthFlow"
    >
      <GoogleIcon />
      {{ $t("forms.google_signup") }}
    </a>
  </button>
</template>

<script setup>
import GoogleIcon from "./icons/GoogleIcon.vue";
const props = defineProps(["type"]);
</script>
