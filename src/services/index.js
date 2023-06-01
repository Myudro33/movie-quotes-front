import axiosInstance from '../config/axios-config'
import { useAuthStore } from '../stores/AuthStore.js';
export const login=async(data)=> {
  await axiosInstance.get('/sanctum/csrf-cookie')
  await axiosInstance.post('/login', {username:data.username,password:data.password,remember:data.remember})
  window.location.reload()
}
export function register(data) {
    return axiosInstance.post('/api/register', data)
  }
export const getUser=async()=>{
  const authStore = useAuthStore()
    await axiosInstance.get('/user').then((response)=>{
      authStore.$state.user = response.data
    })
}

export const logout= async()=>{
    await axiosInstance.post('/logout')   
}