import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../src/assets/style.css'
import App from './App.vue'
import router from './router'
import './config/vee-validate/rules'
import './config/vee-validate/messages'
import i18n from './config/i18n'

// Global Components
import TheInput from './components/TheInput.vue'
import TheModal from './components/TheModal.vue'
import TheLabel from './components/TheLabel.vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.provide('$t', i18n.global.t);
app.component('input-component', TheInput)
app.component('modal-component', TheModal)
app.component('label-component', TheLabel)


app.mount('#app')
