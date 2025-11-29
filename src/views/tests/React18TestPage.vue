<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { react18Questions } from '@/data/react-18-questions'
</script>

<template>
  <UniversalTestPage
    :questions="react18Questions"
    title="Тест по React 18"
    description="40 вопросов по темам: Automatic Batching, Concurrent Features, Suspense, Новые хуки, Strict Mode, Server Components, Миграция, Производительность"
    :show-topic-breakdown="true"
  />
</template>
