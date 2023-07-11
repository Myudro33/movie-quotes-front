import axiosInstance from "../config/axios-config"

export const createComment= async(data, quote)=> {
  return await axiosInstance.post('/comments', { user_id: data.user_id, quote_id: quote.id, title: data.title, author: quote.user.id })
  }