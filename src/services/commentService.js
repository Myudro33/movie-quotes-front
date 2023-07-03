import axiosInstance from "../config/axios-config"
import { useNewsStore } from "../stores/NewsStore";
export const createComment =async (data,quote,page) =>{
    const NewsStore = useNewsStore()
    const newsQuote = NewsStore.quotes.find(quotes=>quotes.id===quote.id)
    const response = await axiosInstance.post('/comments', {user_id:data.user_id,quote_id:quote.id,title:data.title})
if(page!=='feed'){
    newsQuote.comments.push(response.data.comment)
    return quote.comments.push(response.data.comment)
}else{
    newsQuote.comments.push(response.data.comment)
}
}