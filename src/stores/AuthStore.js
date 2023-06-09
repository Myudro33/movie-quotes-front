import { defineStore } from "pinia";
import router from "../router/index.js";
import { useModalStore } from "./ModalStore.js";
import axiosInstance from "../config/axios-config/index.js";
import { ref } from "vue";
import axios from "axios";
const windowWidth = ref(window.innerWidth);


export const useAuthStore = defineStore('authStore', {
    state: () => ({
        error: '',
        user: null,
        email:"test@example.com"
    }),
    actions: {
        async login(data) {
            const modalStore = useModalStore()
            try {
                await this.getToken()
                await axiosInstance.post('/login', data)
                window.location.replace('/feed/')
                modalStore.closeModal()
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
                router.push({name:"landing"})
            } catch (error) {
                alert(error)
            }

        },
        async getToken() {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie")
        },
        async getUser() {
            this.getToken()
            if(this.user===null){
                const data = await axiosInstance.get('/user')
                this.user = data.data
            }
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
                this.error = ""

            } catch (error) {
                this.error = error.response.data.message
                if (windowWidth.value < 960) {
                    modalStore.mobile = 'username'
                }
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
                this.error = ""
            } catch (error) {
                this.error = error.response.data.message
                if (windowWidth.value < 960) {
                    modalStore.mobile = 'email'
                }
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
                this.error = ""
            } catch (error) {
                this.error = error.response.data.message
                if (windowWidth.value < 960) {
                    modalStore.mobile = 'password'
                }
            }
        },
        async uploadAvatar(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("avatar", file);
            formData.append("email", this.author.email);
            try {
                await axiosInstance
                    .post("/upload-avatar", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
            } catch (error) {
                this.error = error.response.data.message
            }
        },
        getAvatar(form){
                axiosInstance
                .get(`/get-avatar?email=${this.author.email}`)
                .then((response) => {
                  form.avatar = response.data.avatar;
                })
        },
        submit(back,form){
            if (back === "username") {
                this.updateUsername({
                  username: this.author.username,
                  newUsername: form.username,
                });
              } else if (back === "email") {
                this.updateEmail({
                  email: this.author.email,
                  new_email: form.email,
                });
              } else {
                this.updatePassword({
                  email: this.author.email,
                  newPassword: form.password,
                });
              }
        }
    },
    getters: {
        author: (state) => state.user
    }
})