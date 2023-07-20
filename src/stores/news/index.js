import { defineStore } from 'pinia'
import actions from './actions'

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    modal: '',
    quotes: [],
    quote:"",
    currentPage: 1,
    perPage: 10,
    isLoading: true,
    isLastPage: false,
  }),
  actions
})
