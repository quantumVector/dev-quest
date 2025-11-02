<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { resizeObserverQuestions } from '@/data/web-api-resize-observer-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="resizeObserverQuestions"
    title="Тест: ResizeObserver API"
    description="Проверьте свои знания по работе с ResizeObserver"
    :show-topic-breakdown="true"
  />
</template>
