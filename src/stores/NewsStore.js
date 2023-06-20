import { defineStore } from "pinia";
import axiosInstance from "../config/axios-config";
import {useAuthStore} from '../stores/AuthStore'

export const useNewsStore = defineStore('newsStore', {
    state: () => ({
        modal: false,
        quotes: [],
        movies: []
    }),
    actions: {
        async getQuotes() {
            if (this.quotes.length < 1) {
                try {
                    const response = await axiosInstance.get('/quotes')
                    this.quotes = response.data.quotes
                } catch (error) {
                    alert(error)
                }
            }
        },
        async addQuote(data) {
            const formData = new FormData();
            formData.append("user_id", data.user_id);
            formData.append("movie_id", data.movie_id);
            formData.append("title", JSON.stringify({ en: data.title.en, ka: data.title.ka }));
            formData.append("image", data.image);
            try {
             const response =  await axiosInstance.post('/add-quote', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
               return this.quotes.push(response.data.quote)
            } catch (error) {
                alert(error)
            }
        },
        async getMovies() {
            if (this.movies.length < 1) {
                try {
                    const response = await axiosInstance.get('/movies')
                    this.movies = response.data.data
                } catch (error) {
                    alert(error)
                }
            }
        },
        async like(data) {
            const AuthStore = useAuthStore()
            const quote = this.quotes.find(quote=>quote.id===data.quote_id)
            const exists = quote.likes.some(like=>like.author.id===AuthStore.author.id)
            if(exists){
                const response = await axiosInstance.post('/deleteLike', data)
                const quote = this.quotes.find(quote => quote.id === response.data.like.quote.id)
                const filtered = quote.likes.filter(like => like.author.id !== response.data.like.author.id)
                return quote.likes = filtered
            }else{
                const response = await axiosInstance.post('/addLike', data)
                const quote = this.quotes.find(quote => quote.id === response.data.like.quote.id)
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