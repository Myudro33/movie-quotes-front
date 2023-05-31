import { defineStore } from "pinia";
import { route } from '../main.js'
import {getUser, login,register} from "../services/index.js";
import { useModalStore } from "./ModalStore.js";
import axiosInstance from "../config/axios-config/axios.js";

export const useAuthStore = defineStore('authStore',{
    state:()=>({
        error:'',
        user:null
    }),
    actions:{
       login(data){
        try {
            login(data)
            const modalStore = useModalStore()
            modalStore.closeModal()
            route.push({ name: 'feed' })
        } catch (error) {
            this.error = error.response.data.message
        }
        },
        async register(data){
            try {
                await register(data)
            const modalStore = useModalStore()
                modalStore.openModal('registered')
            } catch (error) {
                this.error = error.response.data.message
            }
        },
        async logout(){
            try {
                await axiosInstance.post('/logout')   
            } catch (error) {
                console.log(error);
            }
        },
        fetchUser(){
          getUser()
        },
    }
})