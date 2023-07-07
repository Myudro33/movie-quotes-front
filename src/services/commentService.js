import axiosInstance from "../config/axios-config"
import { useMovieStore } from "../stores/MoviesStore"

export const createComment= async(data, quote,page)=> {
  const MovieStore = useMovieStore()
   const response= await axiosInstance.post('/comments', { user_id: data.user_id, quote_id: quote.id, title: data.title, author: quote.user.id })
  if(page==='movie'){
    MovieStore.addCommentOnMovieQuote(response.data.comment,quote)
  }
  }