import { defineStore } from "pinia";
import actions from "./actions";

export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        modal: false,
        notifications: [],
        quantity:0
    }),
    actions
})
