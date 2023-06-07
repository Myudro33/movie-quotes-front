import { defineStore } from "pinia";
import router from "../router/index.js";
import { useModalStore } from "./ModalStore.js";
import axiosInstance from "../config/axios-config/index.js";
import { ref } from "vue";
const windowWidth = ref(window.innerWidth);


export const useAuthStore = defineStore('authStore', {
    state: () => ({
        error: '',
        user: null,
    }),
    actions: {
        async login(data) {
            const modalStore = useModalStore()
            try {
                await axiosInstance.post('/login', data)
                window.location.reload()
                modalStore.closeModal()
                router.push({ name: 'feed' })
            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async register(data) {
            try {
                await axiosInstance.post('/api/register', data)
                const modalStore = useModalStore()
                modalStore.openModal('registered')
            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async logout() {
            try {
                this.user = null
                await axiosInstance.post('/logout')
            } catch (error) {
                alert(error)
            }

        },
        async getToken() {
            await axiosInstance.get("/sanctum/csrf-cookie")
        },
        async getUser() {
            this.getToken()
            const data = await axiosInstance.get('/user')
            this.user = data.data
        },
        async passwordReset(email) {
            const modalStore = useModalStore()
            await axiosInstance.post('/forgot-password', { email: email })
            modalStore.inner = "instructions_sent";
        },
        async passwordUpdate(data) {
            const modalStore = useModalStore()
            try {
                await axiosInstance.post(`/password-update/${data.token}`, data)
                modalStore.inner = "password-changed";
            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async updateUsername(data) {
            const modalStore = useModalStore()

            try {
                await axiosInstance.put('/update-username', {
                    username: data.username,
                    newUsername: data.newUsername
                })
                if (windowWidth.value > 960) {
                    modalStore.inner = 'username-changed'
                    modalStore.modal = true
                } else {
                    modalStore.modal = true
                    modalStore.mobile = 'updated-succesfully'
                }
            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async updateEmail(data) {
            const modalStore = useModalStore()
            try {
                if (data.new_email !== "") {
                    await axiosInstance.post('/email-update', {
                        email: data.email,
                        new_email: data.new_email
                    })
                    if (windowWidth.value > 960) {
                        modalStore.inner = "update-email-sent";
                        modalStore.modal = true;
                    } else {
                        modalStore.modal = true
                        modalStore.mobile = 'updated-succesfully'
                    }
                }
                this.error = 'please provide new email'
            } catch (error) {
                this.error = error.response.data.message

            }
        },
        async updatePassword(data) {
            const modalStore = useModalStore()
            try {
                await axiosInstance.put("/update-password", {
                    email: data.email,
                    newPassword: data.newPassword,
                });
                if (windowWidth.value > 960) {
                    modalStore.inner = 'password-changed'
                    modalStore.modal = true
                } else {
                    modalStore.modal = true
                    modalStore.mobile = 'updated-succesfully'
                }
            } catch (error) {
                this.error = error.response.data.message
            }
        }
    },
    getters: {
        author: (state) => state.user
    }
})