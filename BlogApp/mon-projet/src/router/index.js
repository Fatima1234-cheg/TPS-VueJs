import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CreatePostView from '../views/CreatePostView.vue';
import PostList from '@/components/PostList.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/create', component: CreatePostView } ,
    { path: '/posts/:id', component: PostList },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
