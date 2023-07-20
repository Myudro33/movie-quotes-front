import axiosInstance from '@/config/axios-config'
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modal'
export default {
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
  async addQuote(data, page) {
    const AuthStore = useAuthStore()
    const MovieStore = useMovieStore()
    const formData = new FormData()
    formData.append('user_id', AuthStore.author.id)
    formData.append('movie_id', page ? MovieStore.movie.id : data.field)
    formData.append('title', JSON.stringify({ en: data.title_en, ka: data.title_ka }))
    formData.append('image', data.image)
    try {
      const response = await axiosInstance.post('/quotes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      page && MovieStore.movie.quotes.unshift(response.data.quote)
      const movieId = page?MovieStore.movie.id:data.field
      const movie = MovieStore.movies.find((item)=>item.id===movieId)
      movie.quotes.unshift(response.data.quote)
      return this.quotes.unshift(response.data.quote)
    } catch (error) {
      alert(error.response.statusText);
    }

  },
  async updateQuote(data, img) {
    const AuthStore = useAuthStore()
    const MovieStore = useMovieStore()
    const formData = new FormData()
    formData.append('user_id', AuthStore.author.id)
    formData.append('movie_id', MovieStore.movie.id)
    formData.append('title', JSON.stringify({ en: data.title_en, ka: data.title_ka }))
    img === undefined ? null : formData.append('image', img)
    try {
      const response = await axiosInstance.post(`/quotes/${this.quote.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const index = MovieStore.movie.quotes.findIndex(item => item.id === this.quote.id)
      MovieStore.movie.quotes[index] = response.data.quote

    } catch (error) {
      if (error.response.status === 413) {
        alert(error.response.statusText);
      }
      error.response.status === 403 && router.push({ name: 'forbidden' })
    }
  },
  async deleteQuote(id, page) {
    const MovieStore = useMovieStore()
    const ModalStore = useModalStore()
    try {
      await axiosInstance.delete(`/quotes/${id}`)
      const filtered = MovieStore.movie.quotes.filter(quote => quote.id !== id)
      if (!page) {
        ModalStore.closeModal()
      }
      const movie = MovieStore.movies.find(item=>item.id===MovieStore.movie.id)
      movie.quotes=filtered
      return MovieStore.movie.quotes = filtered
    } catch (error) {
      error.response.status === 403 && router.push({ name: 'forbidden' })
    }
  },
}