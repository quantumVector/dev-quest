<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webVitalsQuestions } from '@/data/web-vitals-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="webVitalsQuestions"
    title="Тест по Web Vitals"
    description="45 вопросов по темам: Основы Web Vitals, метрики и их измерение, идентификация проблем производительности, влияние на SEO"
    :show-topic-breakdown="true"
  />
</template>
