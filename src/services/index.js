import { computed } from "vue";
import { useAuthStore } from "../stores/AuthStore";
const AuthStore =useAuthStore()
export const avatar =computed(()=>{
    return import.meta.env.VITE_API_IMAGE_ENDPOINT + AuthStore.author.avatar;
})