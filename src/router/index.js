import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path:'/',
    name:'landing',
    component: ()=>import('../views/LandingPage.vue')
   },
   {
    path:'/feed',
    name:'feed',
    component:()=>import('../views/FeedPage.vue')
   }
  ]
})

export default router
