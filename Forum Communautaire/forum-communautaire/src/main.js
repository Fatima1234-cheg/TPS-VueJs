import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createBootstrap } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)

// Configuration Firebase
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBQGUWhDLya5fV3tqro_LHqC8NEPTeVsmg",
  authDomain: "forum-communautaire-b79bd.firebaseapp.com",
  projectId: "forum-communautaire-b79bd",
  storageBucket: "forum-communautaire-b79bd.firebasestorage.app",
  messagingSenderId: "876778222272",
  appId: "1:876778222272:web:da61f035822e556b773325",
  measurementId: "G-848C8BY3P6"
}

initializeApp(firebaseConfig)

app.use(router)
app.use(createBootstrap())
app.mount('#app')