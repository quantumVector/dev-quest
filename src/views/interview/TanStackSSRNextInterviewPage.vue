<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { tanstackSsrNextInterviewQuestions } from '@/data/interview/tanstack-ssr-next-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="tanstackSsrNextInterviewQuestions"
    title="TanStack Query SSR + Next.js - Интервью"
    description="Вопросы по SSR-гидратации TanStack Query в Next.js App Router"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
