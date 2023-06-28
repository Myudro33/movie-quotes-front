import { defineStore } from 'pinia'
import axiosInstance from '../config/axios-config'
import { useAuthStore } from './AuthStore'

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    modal: '',
    quotes: [],
    currentPage: 1,
    perPage: 10,
    isLoading: true,
    isLastPage: false
  }),
  actions: {
    async getQuotes() {
      if (this.isLastPage) {
        this.isLastPage = true
        return
      }
      this.isLoading = true
      await axiosInstance
        .get('/quotes', {
          params: {
            page: this.currentPage,
            perPage: this.perPage
          }
        })
        .then((response) => {
          this.quotes = this.quotes.concat(response.data.quotes.data)
          this.currentPage = response.data.quotes.meta.pagination.current_page + 1
          this.isLoading = false
          if (
            response.data.quotes.meta.pagination.current_page >=
            response.data.quotes.meta.pagination.last_page
          ) {
            this.isLastPage = true
          }
        })
    },
    handleScroll() {
      const scrollThreshold = 50
      const windowBottom = window.innerHeight + window.pageYOffset
      const documentHeight = document.documentElement.scrollHeight

      if (documentHeight - windowBottom < scrollThreshold && !this.isLoading) {
        this.getQuotes()
      }
    },
    async addQuote(data) {
      const formData = new FormData()
      formData.append('user_id', data.user_id)
      formData.append('movie_id', data.movie_id)
      formData.append('title', JSON.stringify({ en: data.title.en, ka: data.title.ka }))
      formData.append('image', data.image)
      const response = await axiosInstance.post('/quote', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const movie = this.movies.find((movie) => movie.id === response.data.quote.movie.id)
      movie.quotes.unshift(response.data.quote)
      return this.quotes.unshift(response.data.quote)
    },
    async like(data) {
      const AuthStore = useAuthStore()
      const quote = this.quotes.find((quote) => quote.id === data.quote_id)
      const exists = quote.likes.some((like) => like.author_id === AuthStore.author.id)
      const like = quote.likes.find((like) => like.author_id === AuthStore.author.id)
      if (exists) {
        await axiosInstance.delete(`/delete-like/${like.id}`)
        const filtered = quote.likes.filter((like) => like.author_id !== AuthStore.author.id)
        return (quote.likes = filtered)
      } else {
        const response = await axiosInstance.post('/add-like', data)
        const quote = this.quotes.find((quote) => quote.id === response.data.like.quote_id)
        return quote.likes.push(response.data.like)
      }
    },
    async comment(data) {
      const response = await axiosInstance.post('/comment', data)
      const quote = this.quotes.find((quote) => quote.id === response.data.comment.quote_id)
      return quote.comments.push(response.data.comment)
    }
  }
})
