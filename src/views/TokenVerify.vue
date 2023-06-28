<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { verify } from '../services'
import router from '../router'
onMounted(async () => {
  const params = router.currentRoute.value
  verify(params)
})
</script>
