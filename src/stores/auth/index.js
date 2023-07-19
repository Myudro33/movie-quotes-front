import { defineStore } from 'pinia'
import actions from './actions'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    error: '',
    user: null
  }),
  actions,
  getters: {
    author: (state) => state.user
  }
})
