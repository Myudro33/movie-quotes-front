import { defineStore } from 'pinia'
import axiosInstance from '../config/axios-config'
import { useMovieStore } from './MoviesStore'
import { useAuthStore } from './AuthStore'
import router from '../router'
const AuthStore = useAuthStore()
export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    modal: '',
    quotes: [],
    currentPage: 1,
    perPage: 10,
    isLoading: true,
    isLastPage: false,
    user: AuthStore.author
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
      img.name === undefined ? null : formData.append('image', img)
      try {
        const response = await axiosInstance.post(`/quotes/${MovieStore.quote.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const index = MovieStore.movie.quotes.findIndex(item => item.id === MovieStore.quote.id)
        MovieStore.movie.quotes[index] = response.data.quote

      } catch (error) {
        error.response.status === 403 && router.push({ name: 'forbidden' })

      }
    },
    async deleteQuote(id) {
      const MovieStore = useMovieStore()
      try {
        await axiosInstance.delete(`/quotes/${id}`)
        const filtered = MovieStore.movie.quotes.filter(quote => quote.id !== id)
        return MovieStore.movie.quotes = filtered
      } catch (error) {
        error.response.status === 403 && router.push({ name: 'forbidden' })

      }
    },
    async deleteLike(data, quote, page) {
      const AuthStore = useAuthStore()
      const like = quote.likes.find((like) => like.author_id === AuthStore.author.id)
      await axiosInstance.delete(`/likes/${like.id}`)
      const filtered = quote.likes.filter((like) => like.author_id !== AuthStore.author.id)
      const newsQuotes = this.quotes.find(quote => quote.id === data.quote_id)
      if (page === 'feed') {
        const newsQuote = newsQuotes.likes.filter((like) => like.author_id !== AuthStore.author.id)
        return newsQuotes.likes = newsQuote
      } else {
        newsQuotes.likes = newsQuotes.likes.filter((like) => like.author_id !== AuthStore.author.id)
        return quote.likes = filtered
      }
    },
    async createLike(data, quote, page) {
      console.log(data,quote);
      const newsQuotes = this.quotes.find(quote => quote.id === data.quote_id)
      const response = await axiosInstance.post('/likes', { quote_id: data.quote_id, user_id: data.user_id, author: quote.user.id })
      if (page === 'feed') {
        return newsQuotes.likes.push(response.data.like)
      } else {
        newsQuotes.likes.push(response.data.like)
        return quote.likes.push(response.data.like)
      }
    },
    async createComment(data, quote, page) {
      const newsQuote = this.quotes.find(quotes => quotes.id === quote.id)
      const response = await axiosInstance.post('/comments', { user_id: data.user_id, quote_id: quote.id, title: data.title, author: quote.user.id })
      if (page !== 'feed') {
        newsQuote.comments.push(response.data.comment)
        return quote.comments.push(response.data.comment)
      } else {
        newsQuote.comments.push(response.data.comment)
      }
    }
  }
})
