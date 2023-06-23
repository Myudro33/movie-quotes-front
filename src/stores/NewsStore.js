import { defineStore } from "pinia";
import axiosInstance from "../config/axios-config";
import { useAuthStore } from '../stores/AuthStore'
import router from "../router";

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    modal: "",
    quotes: [],
    movies: [],
    movie:"",
    genres: [
      {
        en: "Thriller", ka: 'თრილერი'
      }
      , {
        en: "Drama", ka: 'დრამა'
      },
      {
        en: "Action", ka: 'ექშენი'
      },
      {
        en: "Fantasy", ka: 'ფანტაზია'
      },
      {
        en: "Fiction", ka: 'ფიქცია'
      },
      {
        en: "Comedy", ka: 'კომედია'
      },
      {
        en: "Horror", ka: 'საშიში'
      },
      {
        en: "Animated", ka: 'ანიმაცია'
      },
      {
        en: "Crime", ka: 'კრიმინალური'
      },
      {
        en: "Documentary", ka: 'დოკუმენტური'
      }
    ]
  }),
  actions: {
    async getQuotes() {
      if (this.quotes.length < 1) {
        const response = await axiosInstance.get('/quotes')
        this.quotes = response.data.quotes
      }
    },
    async addQuote(data) {
      const formData = new FormData();
      formData.append("user_id", data.user_id);
      formData.append("movie_id", data.movie_id);
      formData.append("title", JSON.stringify({ en: data.title.en, ka: data.title.ka }));
      formData.append("image", data.image);
      const response = await axiosInstance.post('/quote', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      const movie = this.movies.find(movie => movie.id === response.data.quote.movie.id)
      movie.quotes.push(response.data.quote)
      return this.quotes.push(response.data.quote)
    },
    async like(data) {
      const AuthStore = useAuthStore()
      const quote = this.quotes.find(quote => quote.id === data.quote_id)
      const exists = quote.likes.some(like => like.author_id === AuthStore.author.id)
      const like = quote.likes.find(like => like.author_id === AuthStore.author.id)
      if (exists) {
        const response = await axiosInstance.delete(`/deleteLike/${like.id}`)
        const filtered = quote.likes.filter(like => like.author_id !== response.data.like.author_id)
        return quote.likes = filtered
      } else {
        const response = await axiosInstance.post('/addLike', data)
        const quote = this.quotes.find(quote => quote.id === response.data.like.quote_id)
        return quote.likes.push(response.data.like)
      }
    },
    async addMovieQuoteLike(data){
      const AuthStore = useAuthStore()
      const quote = this.movie.quotes.find(quote => quote.id === data.quote_id)
      const newsPageQuote = this.quotes.find(quote=>quote.id ===data.quote_id)
      const exists = quote.likes.some(like => like.author_id === AuthStore.author.id)
      const like = quote.likes.find(like => like.author_id === AuthStore.author.id)
      if (exists) {
        const response = await axiosInstance.delete(`/deleteLike/${like.id}`)
        quote.likes=  quote.likes.filter(like=>like.author_id!==response.data.like.author_id)
        newsPageQuote.likes = newsPageQuote.likes.filter(like=>like.author_id!==response.data.like.author_id)
      }else{
        const response = await axiosInstance.post('/addLike', data)
        quote.likes.push(response.data.like)
        newsPageQuote.likes.push(response.data.like)
      }
    },
    async comment(data) {
      const response = await axiosInstance.post('/comment', data)
      const quote = this.quotes.find(quote => quote.id === response.data.comment.quote.id)
      return quote.comments.push(response.data.comment)
    },
    requiredGenre(chips) {
      if (chips.value.length < 1) {
        return false;
      }
      return true;
    },
    setGenre(chips, value) {
      if (chips.value.includes(value)) {
        return;
      } else {
        chips.value.push(value);
      }
    },
    async getMovies() {
        const authStore = useAuthStore()
        const response = await axiosInstance.get('/movies')
        this.movies = response.data.data.filter(movie => movie.author.id === authStore.author.id)
    },
    async addMovie(data) {
      const formData = new FormData();
      formData.append("user_id", data.user_id);
      formData.append("name", JSON.stringify({ en: data.movie_name.en, ka: data.movie_name.ka }));
      formData.append("year", data.year);
      formData.append("image", data.image);
      formData.append("genre", JSON.stringify(data.genre));
      formData.append("description", JSON.stringify({ en: data.movie_description.en, ka: data.movie_description.ka }));
      formData.append("director", JSON.stringify({ en: data.director.en, ka: data.director.ka }));
      const response = await axiosInstance.post('/movie', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return this.movies.push(response.data.movie)
    },
    async getMovie(){
      const id = router.currentRoute.value.params.id
       const response = await axiosInstance.get(`/movies/${id}`)
       this.movie = response.data.movie
    }
  },
})