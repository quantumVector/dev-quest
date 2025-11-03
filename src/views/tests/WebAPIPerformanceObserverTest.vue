<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { performanceObserverQuestions } from '@/data/web-api-performance-observer-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="performanceObserverQuestions"
    title="Тест: PerformanceObserver"
    description="Проверьте свои знания о мониторинге производительности с помощью PerformanceObserver API"
    :show-topic-breakdown="true"
  />
</template>
