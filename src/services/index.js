import { computed } from "vue";
import { useModalStore } from "../stores/ModalStore";
import router from "../router";
import axiosInstance from "../config/axios-config";
export const avatar = computed(() => {
    return import.meta.env.VITE_API_IMAGE_ENDPOINT + 'avatars/';
})
export const image = computed(() => {
    return import.meta.env.VITE_API_IMAGE_ENDPOINT + 'images/'
})

export const newGenre = (chips, value, props, editChips) => {
    if (!props.edit) {
        if (chips.value.includes(value)) {
            return;
        } else {
            chips.value.push(value);
        }
    } else {
        if (editChips.value.includes(value)) {
            return;
        } else {
            if (chips.value.includes(value)) {
                return;
            } else {
                chips.value.push(value);
            }
            editChips.value.push(value);
        }
    }
}
export const verify = async (url) => {
    const modalStore = useModalStore()
        if (url.query.email === 'email') {
            await axiosInstance.get(`/verify-email/${url.params.token}`).then(response => {
                router.push({ name: 'landing' })
                modalStore.inner = response.data.stage;
            })
        } else if (url.query.email === 'reset-password') {
            await axiosInstance.get(`/password-update/${url.params.token}`).then(response => {
                router.push(`?email=${response.data.email}&token=${response.data.token}`)
                modalStore.inner = response.data.stage;
            })
        } else if (url.query.email === 'email-update') {
            await axiosInstance.post(`/update-email/${url.params.token}`,
                {
                    new_email: url.query.new
                }
            ).then(response => {
                modalStore.inner = response.data.stage;
                router.push({ name: 'news' })
            })
        }
}