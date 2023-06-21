import { defineStore } from "pinia";
import { useModalStore } from "./ModalStore";
import router from "../router";
import axiosInstance from "../config/axios-config";

export const useVerifyStore = defineStore('verifyStore',{
    state: () => ({
    }),
    actions:{
        async verify(url){
            const modalStore = useModalStore()
            try {
                if(url.query.email==='email'){
                    await axiosInstance.get(`/verify-email/${url.params.token}`).then(response=>{
                        router.push({name:'landing'})
                        modalStore.inner=response.data.stage;
                    })
                }else if(url.query.email==='reset-password'){
                    await axiosInstance.get(`/password-update/${url.params.token}`).then(response=>{
                        router.push(`?email=${response.data.email}&token=${response.data.token}`)
                        modalStore.inner=response.data.stage;
                    })
                }else if(url.query.email==='email-update'){
                    await axiosInstance.post(`/update-email/${url.params.token}`,
                    {
                        new_email:url.query.new
                    }
                    ).then(response=>{
                        modalStore.inner=response.data.stage;
                        router.push({name:'news'})
                    })
                }
            } catch (error) {
                alert(error)
            }
        }
    }
})