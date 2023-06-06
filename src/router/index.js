import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingPage.vue')
    },
    {
      path:"/feed",
      name: 'feed',
      component: () => import('../views/FeedPage.vue'),
      children:[
        { path: 'news', name: 'news', component: () => import('../views/NewsFeed.vue') },
        { path: 'edit-profile', name: 'editprofile', component: () => import('../views/ProfileEdit.vue') }
      ]
    },

  ]
})

export default router
