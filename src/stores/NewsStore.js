import { defineStore } from 'pinia'
import axiosInstance from '../config/axios-config'
import { useMovieStore } from './MoviesStore'

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
      const response = await axiosInstance.post('/quotes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const MovieStore = useMovieStore()
      MovieStore.movie.quotes.unshift(response.data.quote)
      return this.quotes.unshift(response.data.quote)
    },
    async updateQuote(data, quote) {
      const MovieStore = useMovieStore()
      const image = data.image === quote.image ? null : quote.image
      const formData = new FormData()
      formData.append('user_id', data.user_id)
      formData.append('movie_id', data.movie_id)
      formData.append('title', JSON.stringify({ en: data.title.en, ka: data.title.ka }))
      if (image) {
        formData.append('image', data.image)
      }
      try {
        const response = await axiosInstance.post(`/quotes/${quote.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const index = MovieStore.movie.quotes.findIndex(item => item.id === quote.id)
        MovieStore.movie.quotes[index] = response.data.quote
      } catch (error) {
        console.log(error);
      }
    },
    async deleteQuote(id) {
      const MovieStore = useMovieStore()
      try {
        await axiosInstance.delete(`/quotes/${id}`)
        const filtered = MovieStore.movie.quotes.filter(quote => quote.id !== id)
        return MovieStore.movie.quotes = filtered
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  }
})
