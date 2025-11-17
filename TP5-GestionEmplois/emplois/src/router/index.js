
import { createRouter, createWebHistory } from 'vue-router'
import AddJob from "../views/AddJob.vue";
import EditJob from "../views/EditJob.vue";
import HomeJob from '../views/HomeJob.vue';


const routes = [
  { path: "/", component: HomeJob },
  { path: "/add", component: AddJob },
  { path: "/edit/:id", name: "EditJob", component: EditJob, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
