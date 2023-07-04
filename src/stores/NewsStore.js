import { defineStore } from 'pinia'
import axiosInstance from '../config/axios-config'
import { useMovieStore } from './MoviesStore'
import { useAuthStore } from './AuthStore'
const AuthStore = useAuthStore()
export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    modal: '',
    quotes: [],
    currentPage: 1,
    perPage: 10,
    isLoading: true,
    isLastPage: false,
    user:AuthStore.author
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
      const MovieStore = useMovieStore()
      const formData = new FormData()
      formData.append('user_id', this.user.id)
      formData.append('movie_id', MovieStore.movie.id)
      formData.append('title', JSON.stringify({ en: data.title.en, ka: data.title.ka }))
      formData.append('image', data.image)
      const response = await axiosInstance.post('/quotes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      MovieStore.movie.quotes.unshift(response.data.quote)
      return this.quotes.unshift(response.data.quote)
    },
    async updateQuote(data, img) {
      const MovieStore = useMovieStore()
      const formData = new FormData()
      formData.append('user_id', this.user.id)
      formData.append('movie_id', MovieStore.movie.id)
      formData.append('title', JSON.stringify({ en: data.title.en, ka: data.title.ka }))
      img.name===undefined ? null :  formData.append('image', img)
        const response = await axiosInstance.post(`/quotes/${MovieStore.quote.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const index = MovieStore.movie.quotes.findIndex(item => item.id === MovieStore.quote.id)
        MovieStore.movie.quotes[index] = response.data.quote
    },
    async deleteQuote(id) {
      const MovieStore = useMovieStore()
        await axiosInstance.delete(`/quotes/${id}`)
        const filtered = MovieStore.movie.quotes.filter(quote => quote.id !== id)
        return MovieStore.movie.quotes = filtered
    }
  }
})
