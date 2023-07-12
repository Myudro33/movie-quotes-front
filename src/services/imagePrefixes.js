import { computed } from 'vue'
export const image = computed(() => {
  return import.meta.env.VITE_API_IMAGE_ENDPOINT + 'images/'
})