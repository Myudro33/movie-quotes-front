import { defineStore } from "pinia";
import router from "../router";

export const useModalStore = defineStore('modalStore',{
    state:()=>({
        inner:'',
        mobile:""
    }),
    actions:{
        closeModal(){
            this.inner=''
            this.mobile=''
        },
        openModal(payload){
            this.inner = payload
            this.modal = true
        },
        removeQuery(){
            router.replace({ query: null })
            this.inner=''
        },
       async queryBasedModal(){
            const modalStore = useModalStore()
            await router.isReady()
            if (router.currentRoute.value.query.stage) {
                modalStore.inner = router.currentRoute.value.query.stage;
            }
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