import { computed } from "vue";
import { useAuthStore } from "../stores/AuthStore";
const AuthStore = useAuthStore()
export const avatar = computed(() => {
    return import.meta.env.VITE_API_IMAGE_ENDPOINT +'avatars/';
})
export const image = computed(()=>{
    return import.meta.env.VITE_API_IMAGE_ENDPOINT+'images/'
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