<template>
  <div class="bg-transparent items-center xs:hidden md:flex">
    <select
      class="text-white bg-transparent active:outline-none text-xl"
      v-model="$i18n.locale"
      @change="changeLocale"
    >
      <option
        class="text-black"
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale === "en" ? "Eng" : "Geo" }}
      </option>
    </select>
  </div>
</template>

//
<script>
import { setLocale } from "@vee-validate/i18n";
export default {
  methods: {
    changeLocale($event) {
      setLocale($event.target.value);
      localStorage.setItem("locale", $event.target.value);
    },
  },
  created() {
    setLocale(localStorage.getItem("locale"));
  },
};
</script>
