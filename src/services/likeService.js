import { useNewsStore } from '../stores/NewsStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
import axiosInstance from '../config/axios-config/index.js'

export const likeService = async (data, liked) => {
    if (liked.value) {
      deleteLike(data)
    } else {
      addLike(data)
    }
  }
  
  const deleteLike = async (data) => {
    const AuthStore = useAuthStore()
    const NewsStore = useNewsStore()
    const quote = NewsStore.quotes.find((quote) => quote.id === data.quote_id)
    const like = quote.likes.find((like) => like.author_id === AuthStore.author.id)
    await axiosInstance.delete(`/likes/${like.id}`)
    const filtered = quote.likes.filter((like) => like.author_id !== AuthStore.author.id)
    return (quote.likes = filtered)
  }
  
  const addLike = async (data) => {
    const NewsStore = useNewsStore()
    const response = await axiosInstance.post('/likes', data)
    const quote = NewsStore.quotes.find((quote) => quote.id === response.data.like.quote_id)
    return quote.likes.push(response.data.like)
  }