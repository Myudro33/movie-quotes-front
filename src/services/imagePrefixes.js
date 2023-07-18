import { computed } from 'vue'
export const image = computed(() => {
  return import.meta.env.VITE_API_IMAGE_ENDPOINT + 'images/'
})
export const avatar = (user)=>{
  if(user.avatar.startsWith('https')){
    return user.avatar
  }
  return import.meta.env.VITE_API_IMAGE_ENDPOINT+'avatars/'+user.avatar
}