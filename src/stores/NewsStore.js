import { defineStore } from "pinia";
import axiosInstance from "../config/axios-config";

export const useNewsStore = defineStore('newsStore', {
    state: () => ({
        modal: false,
        quotes: [],
        movies: []
    }),
    actions: {
        async getQuotes() {
            try {
                const response = await axiosInstance.get('/quotes')
                this.quotes = response.data.data
            } catch (error) {
                alert(error)
            }
        },
        async addQuote(data) {
            const formData = new FormData();
            formData.append("user_id", data.user_id);
            formData.append("movie_id", data.movie_id);
            formData.append("title", JSON.stringify({ en: data.title.en, ka: data.title.ka }));
            formData.append("image", data.image);
            try {
                await axiosInstance.post('/add-quote', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            } catch (error) {
                alert(error)
            }
        },
        async getMovies() {
            try {
                const response = await axiosInstance.get('/movies')
                this.movies = response.data.data
            } catch (error) {
                alert(error)
            }
        },
        async like(data) {
            try {
                const response = await axiosInstance.post('/addLike', data)
                if (response.status === 201) {
                    const quote = this.quotes.find(quote=> quote.id===response.data.like.quote.id)
                    return quote.likes.push(response.data.like)
                } else {
                    const quote = this.quotes.find(quote=> quote.id===response.data.like.quote.id)
                    const filtered= quote.likes.filter(like=>like.author.id!==response.data.like.author.id)
                    return quote.likes = filtered
                }
            } catch (error) {
                alert(error)
            }
        },
        async comment(data) {
            try {
               const response = await axiosInstance.post('/add-comment', data)
               this.quotes[response.data.comment.quote.id-1].comments.push(response.data.comment)
            } catch (error) {
                alert(error)
            }
        }
    },
})