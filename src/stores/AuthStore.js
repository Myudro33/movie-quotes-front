import { defineStore } from "pinia";
import router from "../router/index.js";
import { useModalStore } from "./ModalStore.js";
import axiosInstance from "../config/axios-config/index.js";
import axios from "axios";


export const useAuthStore = defineStore('authStore', {
    state: () => ({
        error: '',
        user: null,
        email: "test@example.com"
    }),
    actions: {
        async login(data) {
            const modalStore = useModalStore()
            try {
                await this.getToken()
                const response = await axiosInstance.post('/login', data)
                this.user = response.data.user
                router.push({ name: "news" })
                modalStore.closeModal()
                this.error = ''

            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async register(data) {
            try {
                await axiosInstance.post('/register', data)
                const modalStore = useModalStore()
                modalStore.openModal('registered')
                this.error = ''

            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async logout() {
            try {
                this.user = null
                await axiosInstance.post('/logout')
                router.push({ name: "landing" })
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
            try {
                const modalStore = useModalStore()
                await axiosInstance.post('/forgot-password', { email: email })
                modalStore.inner = "instructions_sent";
                this.error = ''

            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async passwordUpdate(data) {
            const modalStore = useModalStore()
            try {
                await axiosInstance.put(`/password-update/${data.token}`, data)
                modalStore.inner = "password-changed";
                this.error = ''

            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async uploadAvatar(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("avatar", file);
            formData.append("email", this.author.email);
            try {
                const response = await axiosInstance
                    .post("/upload-avatar", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                this.author.avatar = response.data.avatar
                this.error = ''

            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async updateUser(form) {
            const modalStore = useModalStore()
            try {
                const response = await axiosInstance.put(`/update-user/${this.author.id}`, form)
                if(form.email!==this.author.email){
                   return modalStore.inner='update-email-sent'
                }
                this.user = response.data.user
                if (window.innerWidth < 960) {
                    modalStore.mobile = 'updated-succesfully'
                } else {
                    modalStore.inner = 'user-updated'
                }
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