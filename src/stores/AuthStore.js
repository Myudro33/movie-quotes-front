import { defineStore } from 'pinia'
import router from '../router/index.js'
import { useModalStore } from './ModalStore.js'
import axiosInstance from '../config/axios-config/index.js'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    error: '',
    user: null
  }),
  actions: {
    async login(data) {
      const ModalStore = useModalStore()
      try {
        await this.getToken()
        const response = await axiosInstance.post('/login', data)
        this.user = response.data.user
        router.push({ name: 'news' })
        ModalStore.closeModal()
        this.error = ''
      } catch (error) {
        this.error = error.response.data.message
      }
    },
    async register(data) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.post('/register', data, {
          params: {
            locale: useI18n().locale.value
          }
        })
        ModalStore.openModal('registered')
        this.error = ''
      } catch (error) {
        this.error = error.response.data.message
      }
    },
    async logout() {
      try {
        this.user = null
        await axiosInstance.post('/logout')
        router.push({ name: 'landing' })
        this.error = ''
      } catch (error) {
        alert(error)
      }
    },
    async getToken() {
      try {
        await axios.get(import.meta.env.VITE_API_SANCTUM_URL)
        this.error = ''
      } catch (error) {
        this.error = error
      }
    },
    async getUser() {
      try {
        this.getToken()
        if (!this.user) {
          const data = await axiosInstance.get('/user')
          this.user = data.data
          this.error = ''
        }
      } catch (error) {
        this.error = error.response.data.message
      }
    },
    async passwordReset(email) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.post(`/forgot-password/${email}`, {
          params: {
            locale: useI18n().locale.value
          }
        })
        ModalStore.inner = 'instructions_sent'
        this.error = ''
      } catch (error) {
        this.error = error.response.data.message
      }
    },
    async passwordUpdate(data) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.put(`/password-update/${data.token}`, data)
        ModalStore.inner = 'password-changed'
        this.error = ''
      } catch (error) {
        this.error = error.response.data.message
      }
    },
    async updateUser(form, locale) {
      const ModalStore = useModalStore()
      if (form.avatar !== '') {
        this.uploadAvatar(form.avatar)
      } else {
        try {
          const response = await axiosInstance.post(`/update-user/${this.author.email}`, form, {
            params: {
              locale
            }
          })
          if (form.email !== this.author.email) {
            return (ModalStore.inner = 'update-email-sent')
          }
          this.user = response.data.user
          if (window.innerWidth < 960) {
            ModalStore.mobile = 'updated-succesfully'
          } else {
            ModalStore.inner = 'user-updated'
          }
          this.error = ''
        } catch (error) {
          this.error = error.response?.data.message
        }
      }
    },
    async uploadAvatar(event) {
      const file = event.target.files[0]
      console.log(file)
      const formData = new FormData()
      formData.append('avatar', file)
      try {
        const response = await axiosInstance.post(`/update-user/${this.author.email}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.author.avatar = response.data.avatar
        this.error = ''
      } catch (error) {
        this.error = error.response.data.message
      }
    }
  },
  getters: {
    author: (state) => state.user
  }
})
