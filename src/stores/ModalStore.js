import { defineStore } from 'pinia'
import router from '../router'
import { useNewsStore } from './NewsStore'
import { useMovieStore } from './MoviesStore'

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    inner: '',
    mobile: '',
    quoteModal: "",
    formModal: ""
  }),
  actions: {
    closeModal(page) {
      if (page) {
        this.inner = ''
        return
      }
      else if (router.currentRoute.value.matched.length < 3) {
        router.push({ name: router.currentRoute.value.matched[0].name })
      } else {
        router.push({ name: router.currentRoute.value.matched[1].name })
      }
      this.formModal = ''
      this.inner = ''
      this.mobile = ''
      this.quoteModal = ''
    },
    openModal(payload, page, val, index) {
      if (payload !== 'reset-email-verified') {
        router.push({ name: page, params: { modal: payload }, query: { mode: val, quote: index } })
        this.queryBasedModal(payload)
      } else if (payload === 'reset-email-verified') {
        const route = router.currentRoute.value
        router.push({ path: '/reset-email-verified', params: { modal: payload }, query: { email: route.query.user, token: route.params.token } })
        this.inner = payload
      }
    },
    async queryBasedModal(payload) {
      const NewsStore = useNewsStore()
      const MovieStore = useMovieStore()
      await router.isReady()
      const modal = router.currentRoute.value.params.modal
      const route = router.currentRoute.value
      if (route.query.mode === 'view' || route.query.mode === 'edit') {
        await NewsStore.getQuotes()
        const quote = NewsStore.quotes.find(item => item.id === Number(route.query.quote))
        NewsStore.quote = quote
        this.formModal = 'add-quote'
        return
      } else if (route.query.mode === 'movie-edit') {
        await MovieStore.getMovie()
        this.formModal = 'add-movie'
        return
      }
      else if (payload === 'add-quote' || payload === 'add-movie') {
        this.formModal = payload
        return
      }
      else if (payload !== undefined) {
        this.inner = payload
        return
      }
      else if (modal) {
        if (modal === 'add-quote' || modal === 'add-movie') {
          this.formModal = modal
          return
        } else if (route.name !== 'films-modal') {
          this.inner = modal
        }
      }
      else if (route.query.stage) {
        this.inner = route.query.stage
      }
    },
    scroll(payload) {
      if (payload) {
        document.documentElement.classList.add('modal-open')
      } else {
        document.documentElement.classList.remove('modal-open')
      }
    },
    openQuoteModal(num) {
      this.quoteModal === num ? this.quoteModal = '' :
        this.quoteModal = num
    }
  }
})
