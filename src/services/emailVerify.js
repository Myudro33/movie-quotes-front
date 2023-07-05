import { useModalStore } from '../stores/ModalStore.js'
import router from '../router'
import axiosInstance from '../config/axios-config'


export const verify = async (url) => {
    const ModalStore = useModalStore()
    if (url.query.email === 'email') {
      await axiosInstance.get(`/verify-email/${url.params.token}`).then((response) => {
        router.push({ name: 'landing' })
        ModalStore.inner = response.data.stage
      })
    } else if (url.query.email === 'reset-password') {
      router.replace(`/?email=${url.query.user}&token=${url.params.token}`)
      ModalStore.inner = 'reset-email-verified'
    } else if (url.query.email === 'email-update') {
      await axiosInstance
        .post(`/update-email/${url.params.token}`, {
          new_email: url.query.new
        })
        .then((response) => {
          ModalStore.inner = response.data.stage
          router.push({ name: 'news' })
        })
    }
  }