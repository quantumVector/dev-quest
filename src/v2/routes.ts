import type { RouteRecordRaw } from 'vue-router'

export const v2Routes: RouteRecordRaw[] = [
  {
    path: '/v2',
    name: 'home-v2',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/v2/articles/:id',
    name: 'article-v2',
    component: () => import('./pages/ArticlePage.vue'),
    props: true,
  },
]
