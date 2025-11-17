// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import de ton router


const app = createApp(App);

// On monte le router
app.use(router);

// On monte l'application
app.mount('#app');
