import { defineStore } from "pinia";
import router from "../router";

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
        },
        removeQuery(){
            router.replace({ query: null })
            this.modal=false
        },
        scroll(payload){
            if(payload){
                document.documentElement.classList.add('modal-open');
            }else{
                document.documentElement.classList.remove('modal-open');
            }
          },
    }
})