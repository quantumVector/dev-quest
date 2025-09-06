<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsAsyncQuestions } from '@/data/js-async-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsAsyncQuestions"
    title="Тест по JavaScript: Асинхронность"
    description="24 вопроса по темам: Необходимость асинхронности, Callback vs Промисы, Коллекции промисов, Promise.race/any/allSettled"
    :show-topic-breakdown="true"
  />
</template>
