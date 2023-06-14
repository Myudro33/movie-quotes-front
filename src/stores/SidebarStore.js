import { defineStore } from "pinia"
export const useSidebarStore = defineStore('sidebarStore', {
    state: () => ({
        isHidden: true,
    })
})