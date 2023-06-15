import { defineStore } from "pinia";
import axiosInstance from "../config/axios-config";

export const useNewsStore = defineStore('newsStore',{
    state: () => ({
        quotes:[]
    }),
    actions:{
       async getQuotes(){
            try {
                const response = await axiosInstance.get('/quotes')
                this.quotes=response.data.data
            } catch (error) {
                alert(error)
            }
    },
    async like(data){
        try {
            await axiosInstance.post('/addLike',data)
            this.getQuotes()
        } catch (error) {
         alert(error)   
        }
    },
    async comment(data){
        try {
            await axiosInstance.post('/add-comment',data)
            this.getQuotes()
        } catch (error) {
            alert(error)
        }
    }
    },
})