import { defineStore } from "pinia";
import {useAuthStore} from './AuthStore'
import axiosInstance from "../config/axios-config";
export const useNotificationStore = defineStore('notificationStore',{
    state:()=>({
        modal:false,
        notifications:[]
    }),
    actions:{
        async getNotifications(){
            const AuthStore = useAuthStore()
            const response = await axiosInstance.get(`/notifications/${AuthStore.author.email}`)
            this.notifications = response.data.notifications;
        }
    }
})
