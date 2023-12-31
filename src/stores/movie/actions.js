import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/config/axios-config'
import router from '@/router'
import { useModalStore } from '@/stores/modal'


export default {
  async getMovies() {
    const response = await axiosInstance.get('/movies')
    this.movies = response.data.movies
    this.filteredMovies = response.data.movies
  },
  searchMovies(query) {
    if (query) {
      this.filteredMovies = this.movies.filter((movie) => {
        const enName = movie.name.en.toLowerCase();
        const kaName = movie.name.ka.toLowerCase();
        return enName.includes(query) || kaName.includes(query);
      })
    } else {
      this.filteredMovies = this.movies
    }
  },
  async addMovie(data, genre) {
    const AuthStore = useAuthStore()
    const formData = new FormData()
    formData.append('user_id', AuthStore.author.id)
    formData.append('name', JSON.stringify({ en: data.movie_name_en, ka: data.movie_name_ka }))
    formData.append('year', data.year)
    formData.append('image', data.image)
    formData.append('genre', JSON.stringify(genre))
    formData.append(
      'description',
      JSON.stringify({ en: data.movie_description_en, ka: data.movie_description_ka })
    )
    formData.append('director', JSON.stringify({ en: data.director_name_en, ka: data.director_name_ka }))
    try {
      const response = await axiosInstance.post('/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return this.movies.push(response.data.movie)
    } catch (error) {
      alert(error.response.statusText);

    }
  },
  async updateMovie(data, image, genre) {
    const AuthStore = useAuthStore()
    const ModalStore = useModalStore()
    const formData = new FormData()
    formData.append('user_id', AuthStore.author.id)
    formData.append('name', JSON.stringify({ en: data.movie_name_en, ka: data.movie_name_ka }))
    formData.append('year', data.year)
    if (image !== this.movie.image) {
      formData.append('image', image.value)
    } else {
      formData.append('image', null)
    }
    formData.append('genre', JSON.stringify(genre))
    formData.append(
      'description',
      JSON.stringify({ en: data.movie_description_en, ka: data.movie_description_ka })
    )
    formData.append('director', JSON.stringify({ en: data.director_name_en, ka: data.director_name_ka }))
    try {
      const response = await axiosInstance.post(`/movies/${this.movie.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const index = this.movies.findIndex(movie => movie.id === this.movie.id)
      this.movies[index] = response.data.movie
      this.movie = response.data.movie
      ModalStore.closeModal()
    } catch (error) {
      alert(error.response.statusText);
    }
  },
  async getMovie() {
    const id = router.currentRoute.value.params.id
    try {
      const response = await axiosInstance.get(`/movies/${id}`)
      this.movie = response.data.movie
    } catch (error) {
      error.response.status === 403 && router.push({ name: 'forbidden' })
    }
  },
  async getGenres() {
    const response = await axiosInstance.get('/genres')
    this.genres = response.data.genres
  },
  async deleteMovie() {
    await axiosInstance.delete(`/movies/${this.movie.id}`)
    const filtered = this.movies.filter(item => item.id !== this.movie.id)
    this.movies = filtered
    this.filteredMovies = filtered
    router.push({ name: 'films' })
  },
  likeInteractions(quote, like, stage, data, response) {
    if (stage) {
      const moviequotes = this.movie.quotes.find(item => item.id === quote.id)
      const filtered = moviequotes.likes.filter(item => item.id !== like.id)
      moviequotes.likes = filtered
    } else {
      const Moviequotes = this.movie.quotes.find(item => item.id === data.quote_id)
      if (!Moviequotes.likes.some((like) => like.author_id === response.data.like.author_id)) {
        Moviequotes.likes.push(response.data.like)
      }
    }
  },
  addCommentOnMovieQuote(data, quote) {
    const singleQuote = this.movie.quotes.find(item => item.id === quote.id)
    singleQuote.comments.unshift(data)
  }
}