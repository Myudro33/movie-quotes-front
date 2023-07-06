import { computed } from 'vue'
import { useAuthStore } from '../stores/AuthStore.js'
export const avatar = computed(() => {
  const AuthStore = useAuthStore()
  return AuthStore.author.google_id===null?import.meta.env.VITE_API_IMAGE_ENDPOINT + 'avatars/':''
})
export const image = computed(() => {
  return import.meta.env.VITE_API_IMAGE_ENDPOINT + 'images/'
})




