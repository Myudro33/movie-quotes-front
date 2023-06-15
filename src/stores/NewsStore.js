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
        }
    }
})