import { defineStore } from "pinia";
import { AuthStore } from "./index.js";
import axiosInstance from "../config/axios-config";
import router from "../router";

export const useMovieStore = defineStore('MoviesStore',{
    state: () => ({
        modal:'',
        movies: [],
        movie:"",
        genres: []
    }),
    actions:{
        async getMovies() {
            const response = await axiosInstance.get('/movies')
            this.movies = response.data.movies.filter(movie => movie.author.id === AuthStore.author.id)
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
          async updateMovie(data) {
            const formData = new FormData();
            formData.append("user_id", data.user_id);
            formData.append("name", JSON.stringify({ en: data.movie_name.en, ka: data.movie_name.ka }));
            formData.append("year", data.year);
            if(data.image!==this.movie.image){
              formData.append("image",data.image); 
            }else{
              formData.append("image",null);
            }
            formData.append("genre", JSON.stringify(data.genre));
            formData.append("description", JSON.stringify({ en: data.movie_description.en, ka: data.movie_description.ka }));
            formData.append("director", JSON.stringify({ en: data.director.en, ka: data.director.ka }));
            const response = await axiosInstance.post(`/movie-update/${this.movie.id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            return this.movies.push(response.data.movie)
          },
        async addMovieQuoteLike(data){
            const quote = this.movie.quotes.find(quote => quote.id === data.quote_id)
            const newsPageQuote = this.quotes.find(quote=>quote.id ===data.quote_id)
            const exists = quote.likes.some(like => like.author_id === AuthStore.author.id)
            const like = quote.likes.find(like => like.author_id === AuthStore.author.id)
            if (exists) {
              await axiosInstance.delete(`/delete-like/${like.id}`)
              quote.likes=  quote.likes.filter(like=>like.author_id!==like.author_id)
              newsPageQuote.likes = newsPageQuote.likes.filter(like=>like.author_id!==like.author_id)
            }else{
              const response = await axiosInstance.post('/add-like', data)
              quote.likes.push(response.data.like)
              newsPageQuote.likes.push(response.data.like)
            }
          },
          async getMovie(){
            const id = router.currentRoute.value.params.id
             const response = await axiosInstance.get(`/movies/${id}`)
             this.movie = response.data.movie
          },
          async getGenres(){
            const response = await axiosInstance.get('/genres')
            this.genres = response.data.genres
          },
          async deleteMovie(){
            await axiosInstance.delete(`/delete-movie/${this.movie.id}`)
            router.back()
          }
    }
})