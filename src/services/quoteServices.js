import axiosInstance from "../config/axios-config"
import { useMovieStore } from "../stores/MoviesStore"
export const update = async (data, image, id) => {
  const MovieStore = useMovieStore()
  const formData = new FormData()
  formData.append('user_id', data.user_id)
  formData.append('movie_id', data.movie_id)
  formData.append('title', JSON.stringify({ en: data.title.en, ka: data.title.ka }))
  if (image) {
    formData.append('image', data.image)
  }
  try {
    const response = await axiosInstance.post(`/quotes/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const index = MovieStore.movie.quotes.findIndex(quote => quote.id === id)
    MovieStore.movie.quotes[index] = response.data.quote
  } catch (error) {
    alert(error.response.data.error);
  }

}

export const deleteQuote = async (id) => {
  const MovieStore = useMovieStore()
  try {
    await axiosInstance.delete(`/quotes/${id}`)
    const filtered = MovieStore.movie.quotes.filter(quote=>quote.id!==id)
    return MovieStore.movie.quotes=filtered
  } catch (error) {
    alert(error.response.data.error);

  }
}