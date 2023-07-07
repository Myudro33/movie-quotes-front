import { defineStore } from "pinia";
import { useAuthStore } from './AuthStore'
import { useNewsStore } from './NewsStore.js'
import axiosInstance from "../config/axios-config";
export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        modal: false,
        notifications: []
    }),
    actions: {
        async getNotifications() {
            const AuthStore = useAuthStore()
            const response = await axiosInstance.get(`/notifications/${AuthStore.author.email}`)
            this.notifications = response.data.notifications;
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
