import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingPage.vue'),
      children:[
        {path:'/:modal',name:'landing-modal'}
      ],
      meta: { auth: false }
    },
    {
      path: '/verify/:token',
      meta: { auth: false },
      name: 'verify',
      component: () => import('../views/TokenVerify.vue')
    },
    {
      path: '/auth/google/callback',
      meta: { auth: false },
      name: 'google',
      component: () => import('../views/GoogleAuth.vue')
    },
    {
      path: '/feed',
      name: 'feed',
      meta: { auth: true },
      component: () => import('../views/FeedPage.vue'),
      children: [
        {
          path: '/feed/news',
          name: 'news',
          meta: { auth: true },
          component: () => import('../views/NewsFeed.vue'),
          children:[
            {path:'/feed/news/:modal',name:'news-modal'}
          ]
        },
        {
          path: '/profile',
          name: 'editprofile',
          meta: { auth: true },
          component: () => import('../views/ProfileEdit.vue'),
          children:[
            {path:'/profile/:modal',name:'profile-modal'}
          ]
        },
        {
          path: '/feed/films/:id',
          name: 'film',
          meta: { auth: true },
          component: () => import('../views/MovieInfo.vue'),
          children:[
            {path:'/feed/films/:id/inner/:modal',name:'inner-film-modal'}
          ]
        },
        {
          path: 'films',
          name: 'films',
          meta: { auth: true },
          component: () => import('../views/MoviesList.vue'),
          children:[
            {path:'/feed/films/out/:modal',name:'films-modal'}
          ]
        },
        
      ]
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      meta: { auth: false },
      component: () => import('../views/ForbiddenPage.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: () => import('../views/NotFound.vue')
    },
  ]
})

router.beforeEach(async (to, _, next) => {
  const AuthStore = useAuthStore()
  await AuthStore.getUser()
  if (to.meta.auth && !AuthStore.author) {
    router.push({ name: 'forbidden' })
  } else {
    next()
  }
})
export default router
