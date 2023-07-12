import { defineStore } from 'pinia'
import router from '../router/index.js'
import { useModalStore } from './ModalStore.js'
import axiosInstance from '../config/axios-config/index.js'
import axios from 'axios'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    error: '',
    user: null
  }),
  actions: {
    async login(data,locale) {
      const ModalStore = useModalStore()
      try {
        await this.getToken()
        const response = await axiosInstance.post('/login', data)
        this.user = response.data.user
        router.push({ name: 'news' })
        ModalStore.closeModal('news')
        this.error = ''
      } catch (error) {
        if(error.response.status===401){
          this.error = locale==='en'?'Email or password is incorrect':'იმეილი ან პაროლი არასწორია'
        }else if(error.response.status===403){
          this.error = locale==='en'?'You must verify your account first':'თქვენი ანგარიში გასააქტიურებელია'
        }

      }
    },
    async register(data,locale) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.post('/register', data, {
          params: {
            locale
          }
        })
        ModalStore.openModal('registered','landing-modal')
        this.error = ''
      } catch (error) {
        this.error = error.response.data.errors[Object.keys(error.response.data.errors)[0]][0][locale];
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
    async passwordReset(email,locale) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.post('/forgot-password',{email}, {
          params: {
            locale
          }
        })
        ModalStore.openModal('instructions_sent','landing-modal')
        this.error = ''
      } catch (error) {
        this.error = error.response.data.message
      }
    },
    async passwordUpdate(data) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.put(`/password-update/${data.token}`, data)
        ModalStore.openModal('password-changed','landing-modal')
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
            return ModalStore.openModal('update-email-sent','news-modal')
          }
          this.user = response.data.user
          if (window.innerWidth < 960) {
            ModalStore.mobile = 'updated-succesfully'
          } else {
            ModalStore.openModal('user-updated','news-modal')
          }
          this.error = ''
        } catch (error) {
          alert(error)
          this.error = error.response?.data.message
        }
      }
    },
    async uploadAvatar(event) {
      const file = event.target.files[0]
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
