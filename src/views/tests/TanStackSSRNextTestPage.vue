<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { tanstackSsrNextQuestions } from '@/data/tanstack-ssr-next-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="tanstackSsrNextQuestions"
    title="Тест: SSR с TanStack Query в Next.js App Router"
    description="25 вопросов по prefetchQuery, dehydrate, HydrationBoundary, QueryClientProvider, staleTime, query keys и Server/Client Components"
    :show-topic-breakdown="true"
  />
</template>
