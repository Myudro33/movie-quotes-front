import axiosInstance from "../config/axios-config"
import { useMovieStore } from "../stores/MoviesStore"
export const update  = async(data,image,id) =>{
    const MoviesStore = useMovieStore()
    const formData = new FormData()
    formData.append('user_id', data.user_id)
    formData.append('movie_id', data.movie_id)
    formData.append('title', JSON.stringify({ en: data.title.en, ka: data.title.ka }))
    if(image){
        formData.append('image', data.image)
    }
    try {
        const response = await axiosInstance.post(`/quotes/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          const index = MoviesStore.movie.quotes.findIndex(quote=>quote.id===id)
          MoviesStore.movie.quotes[index]= response.data.quote
    } catch (error) {
    alert(error.response.data.error);
    }

    }