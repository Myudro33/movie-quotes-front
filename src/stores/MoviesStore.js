import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore.js'
import axiosInstance from '../config/axios-config'
import router from '../router'

export const useMovieStore = defineStore('MoviesStore', {
  state: () => ({
    modal: '',
    quoteModal:"",
    movies: [],
    movie: '',
    quote:"",
    genres: []
  }),
  actions: {
    async getMovies() {
      const AuthStore = useAuthStore()
      const response = await axiosInstance.get('/movies')
      this.movies = response.data.movies.filter((movie) => movie.author.id === AuthStore.author.id)
    },
    async addMovie(data) {
      const formData = new FormData()
      formData.append('user_id', data.user_id)
      formData.append('name', JSON.stringify({ en: data.movie_name.en, ka: data.movie_name.ka }))
      formData.append('year', data.year)
      formData.append('image', data.image)
      formData.append('genre', JSON.stringify(data.genre))
      formData.append(
        'description',
        JSON.stringify({ en: data.movie_description.en, ka: data.movie_description.ka })
      )
      formData.append('director', JSON.stringify({ en: data.director.en, ka: data.director.ka }))
      const response = await axiosInstance.post('/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return this.movies.push(response.data.movie)
    },
    async updateMovie(data) {
      const formData = new FormData()
      formData.append('user_id', data.user_id)
      formData.append('name', JSON.stringify({ en: data.movie_name.en, ka: data.movie_name.ka }))
      formData.append('year', data.year)
      if (data.image !== this.movie.image) {
        formData.append('image', data.image)
      } else {
        formData.append('image', null)
      }
      formData.append('genre', JSON.stringify(data.genre))
      formData.append(
        'description',
        JSON.stringify({ en: data.movie_description.en, ka: data.movie_description.ka })
      )
      formData.append('director', JSON.stringify({ en: data.director.en, ka: data.director.ka }))
      const response = await axiosInstance.post(`/movies/${this.movie.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return this.movies.push(response.data.movie)
    },
    async getMovie() {
      const id = router.currentRoute.value.params.id
      const response = await axiosInstance.get(`/movies/${id}`)
      this.movie = response.data.movie
    },
    async getGenres() {
      const response = await axiosInstance.get('/genres')
      this.genres = response.data.genres
    },
    async deleteMovie() {
      await axiosInstance.delete(`/movies/${this.movie.id}`)
      router.back()
    }
  }
})
