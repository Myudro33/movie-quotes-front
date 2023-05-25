<template>
  <div
    @click="modalStore.closeModal()"
    name="backDrop"
    class="top-0 w-full h-screen absolute z-50 bg-[#00000090] flex justify-center items-center"
  >
    <div
      @click.stop
      name="inner"
      class="xs:w-screen xs:h-screen md:w-[601px] md:h-auto flex flex-col md:px-[120px] xs:px-[34px] md:py-10 bg-[#222030] items-center rounded-[10px]"
    >
      <LoginFormVue v-if="modalStore.inner === 'login'" />
      <RegistrationForm v-else-if="modalStore.inner === 'register'" />
    </div>
  </div>
</template>

<script>
import LoginFormVue from "./LoginForm.vue";
import RegistrationForm from "./RegistrationForm.vue";
import { useModalStore } from "../stores/ModalStore";
export default {
  props: ["modalActive", "inner"],
  components: { LoginFormVue, RegistrationForm },
  setup() {
    const modalStore = useModalStore();
    return { modalStore };
  },
};
</script>
