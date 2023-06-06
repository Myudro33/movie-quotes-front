import { defineStore } from "pinia";
import router from "../router";

export const useModalStore = defineStore('modalStore',{
    state:()=>({
        modal:false,
        inner:'',
        mobile:""
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
       async queryBasedModal(){
            const modalStore = useModalStore()
            await router.isReady()
            if (router.currentRoute.value.query.stage) {
                modalStore.modal = true;
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