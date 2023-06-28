import { computed } from 'vue'
import { useModalStore } from '../stores/ModalStore.js'
import router from '../router'
import axiosInstance from '../config/axios-config'
import { useNewsStore } from '../stores/NewsStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
export const avatar = computed(() => {
  return import.meta.env.VITE_API_IMAGE_ENDPOINT + 'avatars/'
})
export const image = computed(() => {
  return import.meta.env.VITE_API_IMAGE_ENDPOINT + 'images/'
})

export const verify = async (url) => {
  const ModalStore = useModalStore()
  if (url.query.email === 'email') {
    await axiosInstance.get(`/verify-email/${url.params.token}`).then((response) => {
      router.push({ name: 'landing' })
      ModalStore.inner = response.data.stage
    })
  } else if (url.query.email === 'reset-password') {
    await axiosInstance.get(`/password-update/${url.params.token}`).then((response) => {
      router.push(`?email=${response.data.email}&token=${response.data.token}`)
      ModalStore.inner = response.data.stage
    })
  } else if (url.query.email === 'email-update') {
    await axiosInstance
      .post(`/update-email/${url.params.token}`, {
        new_email: url.query.new
      })
      .then((response) => {
        ModalStore.inner = response.data.stage
        router.push({ name: 'news' })
      })
  }
}

export const likeService = async (data, liked) => {
  if (liked.value) {
    deleteLike(data)
  } else {
    addLike(data)
  }
}

const deleteLike = async (data) => {
  const AuthStore = useAuthStore()
  const NewsStore = useNewsStore()
  const quote = NewsStore.quotes.find((quote) => quote.id === data.quote_id)
  const like = quote.likes.find((like) => like.author_id === AuthStore.author.id)
  await axiosInstance.delete(`/likes/${like.id}`)
  const filtered = quote.likes.filter((like) => like.author_id !== AuthStore.author.id)
  return (quote.likes = filtered)
}

const addLike = async (data) => {
  const NewsStore = useNewsStore()
  const response = await axiosInstance.post('/likes', data)
  const quote = NewsStore.quotes.find((quote) => quote.id === response.data.like.quote_id)
  return quote.likes.push(response.data.like)
}
