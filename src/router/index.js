import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingPage.vue'),
      meta:{auth:false}
    },
    {
      path:"/feed",
      name: 'feed',
      meta:{auth:true},
      component: () => import('../views/FeedPage.vue'),
      children:[
        { path: '', name: 'news', component: () => import('../views/NewsFeed.vue') },
        { path: 'edit-profile', name: 'editprofile', component: () => import('../views/ProfileEdit.vue') }
      ]
    },

  ]
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  setTimeout(() => {
  if(to.meta.auth&&!authStore.author){
    router.push({name:"landing"})
  }else{
    next()
  }
  }, 300);
  
})
export default router
