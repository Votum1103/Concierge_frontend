import { createRouter, createWebHistory } from 'vue-router'
import MainWindow from '../components/MainWindow.vue';
import eConcierge from '../components/eConcierge.vue';

const routes = [
  {
    path: '/',
    name: 'MainWindow',
    component : MainWindow
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/scan',
    name: 'eConcierge',
    component : eConcierge
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
