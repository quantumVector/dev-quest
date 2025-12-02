<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { chromeDevToolsQuestions } from '@/data/chrome-devtools-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="chromeDevToolsQuestions"
    title="Тест по Chrome DevTools"
    description="50 вопросов по темам: Основные панели, Performance Profiler, Memory Profiler, Storage, Network анализ, Accessibility, Debugging, Оптимизация"
    :show-topic-breakdown="true"
  />
</template>
