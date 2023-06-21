<template>
    <div >
    </div>
</template>


<script setup>
import { onMounted } from 'vue';
import {useVerifyStore} from '../stores/VerifyStore'
import router from '../router';
const VerifyStore = useVerifyStore()
onMounted(async()=>{
const params = router.currentRoute.value
VerifyStore.verify(params)
     
})
</script>