import { defineStore } from "pinia";

export const useModalStore = defineStore('modalStore',{
    state:()=>({
        modal:false,
        inner:''
    }),
    actions:{
        closeModal(){
            this.modal = false
        },
        openModal(payload){
            this.inner = payload
            this.modal = true
        }
    }
})