import { useNewsStore } from '../stores/NewsStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
import axiosInstance from '../config/axios-config/index.js'

export const deleteLike = async (data,quote,page) => {
    const AuthStore = useAuthStore()
    const NewsStore = useNewsStore()
    const like = quote.likes.find((like) => like.author_id === AuthStore.author.id)
    await axiosInstance.delete(`/likes/${like.id}`)
    const filtered = quote.likes.filter((like) => like.author_id !== AuthStore.author.id)
    const newsQuotes = NewsStore.quotes.find(quote=>quote.id===data.quote_id)
    if(page==='feed'){
        const newsQuote = newsQuotes.likes.filter((like)=>like.author_id!==AuthStore.author.id)
        return  newsQuotes.likes = newsQuote
    }else{
        newsQuotes.likes = newsQuotes.likes.filter((like)=>like.author_id!==AuthStore.author.id)
        return quote.likes = filtered
    }
}

export const createLike = async (data,quote,page) => {
    console.log(page);
    const NewsStore = useNewsStore()
    const newsQuotes = NewsStore.quotes.find(quote=>quote.id===data.quote_id)
    const response = await axiosInstance.post('/likes', data)
    if(page==='feed'){
     return newsQuotes.likes.push(response.data.like)
    }else{
        newsQuotes.likes.push(response.data.like)
        return quote.likes.push(response.data.like)
    }
}