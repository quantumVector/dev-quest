<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactVirtualDOMQuestions } from '@/data/react-virtual-dom-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="reactVirtualDOMQuestions"
    title="Тест по React: Virtual DOM"
    description="40 вопросов по темам: Основы Virtual DOM, Процесс Reconciliation, Роль ключей (keys), Fiber Architecture, Производительность, Сравнение подходов, Практические детали, React 18+ и Concurrent Features"
    :show-topic-breakdown="true"
  />
</template>
