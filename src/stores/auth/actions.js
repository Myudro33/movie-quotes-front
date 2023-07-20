import router from '@/router/index.js'
import { useModalStore } from '@/stores/modal'
import { useNewsStore } from '@/stores/news'
import axiosInstance from '@/config/axios-config/index.js'
import axios from 'axios'
export default {
    async login(data, locale) {
      const ModalStore = useModalStore()
      try {
        await axios.get(import.meta.env.VITE_API_BACKEND_URL+'/sanctum/csrf-cookie')
        const response = await axiosInstance.post('/login', data)
        this.user = response.data.user
        router.push({ name: 'news' })
        ModalStore.closeModal('news')
        this.error = ''
      } catch (error) {
        if (error.response.status === 401) {
          this.error = locale === 'en' ? 'Email or password is incorrect' : 'იმეილი ან პაროლი არასწორია'
        } else if (error.response.status === 403) {
          this.error = locale === 'en' ? 'You must verify your account first' : 'თქვენი ანგარიში გასააქტიურებელია'
        }

      }
    },
    async register(data, locale) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.post('/register', data, {
          params: {
            locale
          }
        })
        ModalStore.openModal('registered', 'landing-modal')
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
        await axios.get(import.meta.env.VITE_API_SANCTUM_URL)
        this.error = ''
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
    async passwordReset(email, locale) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.post('/forgot-password', { email }, {
          params: {
            locale
          }
        })
        ModalStore.openModal('instructions_sent', 'landing-modal')
        this.error = ''
      } catch (error) {
        this.error = error.response.data.errors[Object.keys(error.response.data.errors)[0]][0][locale];
      }
    },
    async passwordUpdate(data) {
      const ModalStore = useModalStore()
      try {
        await axiosInstance.put(`/password-update/${data.token}`, data)
        ModalStore.openModal('password-changed', 'landing-modal')
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
        const data = {
          username: this.author.username!==form.username?form.username:null,
          email:this.author.email!==form.email?form.email:null,
          password:form.password!==''?form.password:null,
          password_confirmation:form.password_confirmation!==''?form.password_confirmation:null
        }
        if(this.areAllPropertiesNull(data)){
          return
        }
        try {
          const response = await axiosInstance.post(`/update-user/${this.author.email}`, data, {
            params: {
              locale
            }
          })
          if (form.email !== this.author.email) {
            return ModalStore.openModal('update-email-sent', 'profile-modal')
          }
          this.user = response.data.user
          if (window.innerWidth < 960) {
            ModalStore.mobile = 'updated-succesfully'
          } else {
          this.getUser()
            ModalStore.openModal('user-updated', 'profile-modal')
          }
          this.error = ''
        } catch (error) {
          this.error = error.response.data.errors[Object.keys(error.response.data.errors)[0]][0][locale];
        }
      }
    },
    async uploadAvatar(event) {
      const NewsStore = useNewsStore()
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
        for(let i =0;i<NewsStore.quotes.length;i++){
          if(NewsStore.quotes[i].user.id===this.user.id){
            NewsStore.quotes[i].user.avatar=response.data.avatar
          }
        }
        this.error = ''
      } catch (error) {
        this.error = error.response.data.message
      }
    },
    areAllPropertiesNull(obj) {
      return Object.values(obj).every(value => value === null);
    }
  }