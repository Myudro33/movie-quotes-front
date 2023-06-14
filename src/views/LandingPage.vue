<template>
  <div>
    <div class="w-screen h-[70vh] flex justify-center items-center">
      <div class="flex flex-col items-center">
        <h1
          v-html="$t('landing.landing_title')"
          class="text-[#DDCCAA] xs:text-2xl md:text-6xl text-center h-32 font-bold tracking-wider leading-10"
        ></h1>
        <button
          @click="modalStore.inner = 'register'"
          class="xs:w-28 md:w-36 h-12 text-white rounded-[4px] bg-[#E31221] text-xl mt-6"
        >
          {{ $t("landing.get_started") }}
        </button>
      </div>
    </div>
    <LandingParallax />
  </div>
</template>

<script setup>
import LandingParallax from "../components/LandingParallax.vue";
import { useModalStore } from "../stores/ModalStore";
const modalStore = useModalStore();
</script>
