import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { initializeApp } from "firebase/app";


// Create Vue App
const app = createApp(App);

// Configure PrimeVue with Aura theme
app.use(PrimeVue, { theme: { preset: Aura } });

// Use Vue Router
app.use(router);

// Mount the app to the DOM
app.mount('#app');