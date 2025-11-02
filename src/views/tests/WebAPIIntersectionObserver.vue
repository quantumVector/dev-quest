<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { intersectionObserverQuestions } from '@/data/web-api-intersection-observer-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="intersectionObserverQuestions"
    title="Тест: IntersectionObserver API"
    description="Проверьте свои знания по работе с IntersectionObserver"
    :show-topic-breakdown="true"
  />
</template>
