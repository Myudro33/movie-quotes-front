import { defineStore } from "pinia";
import axiosInstance from "../config/axios-config";
import {useAuthStore} from '../stores/AuthStore'

export const useNewsStore = defineStore('newsStore', {
    state: () => ({
        modal: "",
        quotes: [],
        movies: [],
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
             const response =  await axiosInstance.post('/add-quote', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                const movie = this.movies.find(movie=>movie.id===response.data.quote.movie.id)
                movie.quotes.push(response.data.quote)
               return this.quotes.push(response.data.quote)
        },
        async getMovies() {
            const authStore = useAuthStore()
                    const response = await axiosInstance.get('/movies')
                    this.movies = response.data.data.filter(movie=>movie.author.id===authStore.author.id)
        },
        async like(data) {
            const AuthStore = useAuthStore()
            const quote = this.quotes.find(quote=>quote.id===data.quote_id)
            const exists = quote.likes.some(like=>like.user_id===AuthStore.author.id)
            const like = quote.likes.find(like=>like.user_id===AuthStore.author.id)
            if(exists){
                const response = await axiosInstance.delete(`/deleteLike/${like.id}`)
                const quote = this.quotes.find(quote => quote.id === response.data.like.quote_id)
                const filtered = quote.likes.filter(like => like.user_id !== response.data.like.user_id)
                return quote.likes = filtered
            }else{
                const response = await axiosInstance.post('/addLike', data)
                const quote = this.quotes.find(quote => quote.id === response.data.like.quote_id)
                return quote.likes.push(response.data.like)
            }
        },
        async comment(data) {
            const response = await axiosInstance.post('/add-comment', data)
            const quote = this.quotes.find(quote => quote.id === response.data.comment.quote.id)
            return quote.comments.push(response.data.comment)
        }
    },
})