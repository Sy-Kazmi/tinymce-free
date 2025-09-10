import { createRouter, createWebHistory } from 'vue-router'
import Editor1 from '../components/Editor1.vue'
import Editor2 from '../components/Editor2.vue'

const routes = [
  {
    path: '/',
    redirect: '/editor1'
  },
  {
    path: '/editor1',
    name: 'Editor1',
    component: Editor1
  },
  {
    path: '/editor2',
    name: 'Editor2',
    component: Editor2
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router