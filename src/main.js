import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import i18n from "@/i18n";
import PrimeVue from "primevue/config";

createApp(App)
    .use(PrimeVue)
    .use(i18n)
    .mount('#app');
