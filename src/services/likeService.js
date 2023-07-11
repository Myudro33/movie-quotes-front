import axiosInstance from "../config/axios-config"

export const createLike= async(data, quote)=>{
    return await axiosInstance.post('/likes', { quote_id: quote.id, user_id: data.user_id, author: quote.user.id })
}

export const deleteLike= async(like)=>{
    axiosInstance.delete(`/likes/${like.id}`)
}