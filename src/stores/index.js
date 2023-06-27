import { useAuthStore } from "./AuthStore";
import { useModalStore } from "./ModalStore";
import { useMovieStore } from './MoviesStore'
import { useNewsStore } from './NewsStore'
import { useSidebarStore } from './SidebarStore'

export const AuthStore = useAuthStore()
export const ModalStore = useModalStore()
export const MovieStore = useMovieStore()
export const NewsStore = useNewsStore()
export const SidebarStore = useSidebarStore()
