import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingPage.vue'),
      meta: { auth: false }
    },
    {
      path: "/feed",
      name: 'feed',
      meta: { auth: true },
      component: () => import('../views/FeedPage.vue'),
      children: [
        { path: '', name: 'news', meta: { auth: true }, component: () => import('../views/NewsFeed.vue') },
        { path: 'edit-profile', name: 'editprofile', meta: { auth: true }, component: () => import('../views/ProfileEdit.vue') }
      ]
    },

  ]
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  await authStore.getUser()
  if (to.meta.auth && !authStore.author) {
    router.push({ name: "landing" })
  } else if (authStore.author && !to.meta.auth) {
    router.back()
  }
  else {
    next()
  }
})
export default router
