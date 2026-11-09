import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes.ts'

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === '/v2' || to.path.startsWith('/v2/')) {
      if (savedPosition) return savedPosition
      const anchor = to.hash ? document.getElementById(to.hash.slice(1)) : null
      return anchor ? { el: anchor, top: 24 } : { left: 0, top: 0 }
    }
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
