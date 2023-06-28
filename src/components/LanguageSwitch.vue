<template>
  <div class="bg-transparent items-center xs:my-3 md:my-0">
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
        {{ locale === 'en' ? 'Eng' : 'ქარ' }}
      </option>
    </select>
  </div>
</template>

//
<script setup>
import { setLocale } from '@vee-validate/i18n'
import { onMounted } from 'vue'
const changeLocale = ($event) => {
  setLocale($event.target.value)
  localStorage.setItem('locale', $event.target.value)
}
onMounted(() => {
  setLocale(localStorage.getItem('locale'))
})
</script>
