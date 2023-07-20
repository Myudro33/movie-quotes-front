import { defineStore } from 'pinia'
import actions from './actions'

export const useMovieStore = defineStore('MoviesStore', {
  state: () => ({
    modal: '',
    movies: [],
    filteredMovies: [],
    movie: '',
    genres: [],
  }),
  actions
})
