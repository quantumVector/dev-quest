<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsIteratorsQuestions } from '@/data/js-iterators-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsIteratorsQuestions"
    title="Тест по JavaScript: Итераторы и Генераторы"
    description="26 вопросов по темам: Основы итераторов, Генераторы, Асинхронные итераторы и генераторы"
    :show-topic-breakdown="true"
  />
</template>
