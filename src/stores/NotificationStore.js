import { defineStore } from "pinia";
import { useAuthStore } from './AuthStore'
import { useNewsStore } from './NewsStore.js'
import axiosInstance from "../config/axios-config";
export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        modal: false,
        notifications: [],
        quantity:0
    }),
    actions: {
        async getNotifications() {
            const AuthStore = useAuthStore()
            const response = await axiosInstance.get(`/notifications/${AuthStore.author.email}`)
            this.notifications = response.data.notifications;
            this.notifications.map((item)=>{
                if(!item.seen){
                    this.quantity++
                }
            })
        },
        async markAsRead(item){
            if(item.id&&!item.seen){
                this.quantity--
                await axiosInstance.put('/notifications',{id:item.id})
                const notification = this.notifications.find(x=>x.id===item.id)
                notification.seen=true
            }else{
                const seen = (e) => e.seen==false;
                const alreadySeen = this.notifications.some(seen)
                if(alreadySeen){
                    this.quantity = 0
                    await axiosInstance.put('/notifications',{post_author:item})
                    for (let index = 0; index < this.notifications.length; index++) {
                            this.notifications[index].seen=true
                        }
                    }
            }
        },
        publicInteractions(data) {
            const NewsStore = useNewsStore()
            const quote = NewsStore.quotes.find(quote => quote.id === data.notification.quote_id)
            if (data.notification.title) {
                quote.comments.unshift(data.notification)
            } else {
                if (data.type) {
                    if (!quote.likes.some((like) => like.author_id === data.notification.author_id)) {
                        quote.likes.push(data.notification)
                    }
                } else {
                    const filtered = quote.likes.filter((like) => like.author_id !== data.notification.author_id)
                    quote.likes = filtered
                }
            }
        }
    }
})
