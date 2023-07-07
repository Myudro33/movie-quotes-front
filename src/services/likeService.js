import axiosInstance from "../config/axios-config"
import { useAuthStore } from "../stores/AuthStore"
import { useMovieStore } from "../stores/MoviesStore";

export const createLike= async(data, quote,page)=>{
    const MovieStore = useMovieStore()
    const response = await axiosInstance.post('/likes', { quote_id: data.quote_id, user_id: data.user_id, author: quote.user.id })
   if(page==='movie'){
    MovieStore.likeInteractions(quote,'','create',data,response)
    }
}

export const deleteLike= async(quote,page)=>{
    const AuthStore = useAuthStore()
    const MovieStore = useMovieStore()
    const like = quote.likes.find((like) => like.author_id === AuthStore.author.id)
    axiosInstance.delete(`/likes/${like.id}`)
    if(page==='movie'){
    MovieStore.likeInteractions(quote,like,'delete')
    }
}