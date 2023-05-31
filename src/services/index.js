import axiosInstance from '../config/axios-config/axios.js'
import { useAuthStore } from '../stores/AuthStore.js';
export const login=async(data)=> {
  await axiosInstance.get('sanctum/csrf-cookie')
  await axiosInstance.post('/login', data)
  window.location.reload()
}
export function register(data) {
    return axiosInstance.post('/api/register', data)
  }
export const getUser=async()=>{
  await axiosInstance.get('/user').then((response)=>{
  const authStore = useAuthStore()
  authStore.$state.user = response.data
  })
}

export const logout= async()=>{
    await axiosInstance.post('/logout')   
}