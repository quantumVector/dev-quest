import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes.ts'

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (
      to.name === 'frontend-live-coding' ||
      to.name === 'frontend-live-coding-task' ||
      to.path.startsWith('/ai-development/') ||
      (to.path === '/' && to.query.section === 'ai-development')
    ) {
      return { left: 0, top: 0 }
    }
  },
})
