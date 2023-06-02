import { defineStore } from "pinia";
import { route } from '../main.js'
import { useModalStore } from "./ModalStore.js";
import axiosInstance from "../config/axios-config/index.js";

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
                route.push({ name: 'feed' })
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
            const modalStore = useModalStore()
            await route.isReady()
            if (route.currentRoute.value.query.token === "verified") {
                modalStore.modal = true;
                modalStore.inner = "verified";
            }
            const data = await axiosInstance.get('/user')
            this.user = data.data
        }
    },
    getters: {
        author: (state) => state.user
    }
})