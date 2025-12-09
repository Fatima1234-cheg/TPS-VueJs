// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AuthUser from "../components/AuthUser.vue";
import ListEvent from "../components/ListEvent.vue";

const routes = [
  { path: "/", name: "AuthUser", component: AuthUser },
  { path: "/ListEvent", name: "ListEvent", component: ListEvent }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
