<template>
  <div>
    <div class="w-screen h-[70vh] flex justify-center items-center">
      <div class="flex flex-col items-center">
        <h1
          v-html="$t('landing.landing_title')"
          class="text-[#DDCCAA] xs:text-2xl md:text-6xl text-center h-32 font-bold tracking-wider leading-10"
        ></h1>
        <button
          class="xs:w-28 md:w-36 h-12 text-white rounded-[4px] bg-[#E31221] text-xl mt-6"
        >
          Get started
        </button>
      </div>
    </div>
    <LandingParallax />
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar.vue";
import TheModal from "../components/TheModal.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import LoginForm from "../components/LoginForm.vue";
import LandingParallax from "../components/LandingParallax.vue";

export default {
  components: { TheNavbar, TheModal, RegistrationForm, LoginForm, LandingParallax },
};
</script>
