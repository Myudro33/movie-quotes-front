import { defineStore } from 'pinia'
import actions from './actions'

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    inner: '',
    mobile: '',
    quoteModal: "",
    formModal: ""
  }),
  actions
})
