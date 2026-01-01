import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/discussion/:id',
    name: 'Discussion',
    component: () => import('../views/Discussion.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Garde de navigation
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  onAuthStateChanged(auth, (user) => {
    const isAuthenticated = !!user
    
    if (requiresAuth && !isAuthenticated) {
      next('/login')
    } else if (requiresAdmin && !(user && user.customClaims?.admin)) {
      next('/')
    } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
      next('/')
    } else {
      next()
    }
  })
})

export default router