import { computed } from 'vue'
import { useAuthStore } from '../stores/AuthStore.js'
const AuthStore = useAuthStore()
export const avatar = computed(() => {
  return AuthStore.author.google_id===null?import.meta.env.VITE_API_IMAGE_ENDPOINT + 'avatars/':''
})
export const image = computed(() => {
  return import.meta.env.VITE_API_IMAGE_ENDPOINT + 'images/'
})




export const openQuoteModal = (num,quoteModal)=>{
  quoteModal.value===num?quoteModal.value='':quoteModal.value=num
}