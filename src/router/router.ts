import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes.ts'

export const router = createRouter({
  history: createWebHistory(),
  routes
})
